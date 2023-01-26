package Grupo7.Autitos.service;

import Grupo7.Autitos.entity.Reserva;
import Grupo7.Autitos.repository.ReservaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public static final Logger logger = Logger.getLogger(ReservaService.class);

    public Reserva add(Reserva reserva) {
        if(reserva.getFecha_ingreso() != null
                && reserva.getFecha_final() != null
                && reserva.getProducto() != null
                && reserva.getUsuario() != null) {
            return reservaRepository.save(reserva);
        } else {
            return null;
        }
    }

    public Reserva update(Reserva r){
        Reserva reserva = this.find(r.getId());
        List<Reserva> lista = reservaRepository.findByProductoId(reserva.getProducto().getId());
        List<Reserva> listaFinal = new ArrayList<>();
        LocalDate inicio;
        LocalDate fin;
        Boolean cambiable = true;

        for(int i = 0; i < lista.size(); i++){
            if(lista.get(i) != reserva){
                listaFinal.add(lista.get(i));
            }
        }

        if(r.getFecha_ingreso() != null) {
            inicio = r.getFecha_ingreso();
        } else {
            inicio = reserva.getFecha_ingreso();
        }

        if(r.getFecha_final() != null){
            fin = r.getFecha_final();
        } else {
            fin = reserva.getFecha_final();
        }

        for (Reserva reserva1 : listaFinal) {
            if ((reserva1.getFecha_ingreso().isEqual(inicio) || reserva1.getFecha_ingreso().isEqual(fin)
                    || (reserva1.getFecha_ingreso().isAfter(inicio)) && reserva1.getFecha_ingreso().isBefore(fin)) && reserva1.getBorrado() == null) {
                cambiable = false;
            } else if ((reserva1.getFecha_final().isEqual(inicio) || reserva1.getFecha_final().isEqual(fin)
                    || (reserva1.getFecha_final().isAfter(inicio)) && reserva1.getFecha_final().isBefore(fin)) && reserva1.getBorrado() == null) {
                cambiable = false;
            }
        }

        if (cambiable) {
            if(r.getHora_comienzo() != null){
                reserva.setHora_comienzo(r.getHora_comienzo());
            }
            reserva.setFecha_ingreso(inicio);
            reserva.setFecha_final(fin);
            reservaRepository.save(reserva);
        } else {
            System.out.println("Ya hay reservas entre " + inicio + " y " + fin);
        }

        return reserva;
    }

    public List<Reserva> filterByProductId(Long id, Boolean borrada) {
        if (borrada){
            return reservaRepository.findCancelBookingsForProduct(id);
        } else return reservaRepository.findBookingsForProduct(id);
    }

    public List<Reserva> filterByUserId(Long id, Boolean borrada) {
        if (borrada){
            return reservaRepository.findCancelBookingsForUser(id);
        } else return reservaRepository.findBookingsForUser(id);
    }

    public Reserva find(Long id){
        return reservaRepository.findById(id).get();
    }

    public String cancel(Long id) throws Exception {
        logger.debug("Cancelando reserva...");
        Reserva r = this.find(id);
        if(r != null){
            logger.info("Reserva cancelada con id: " + id);
            r.setBorrado(LocalDate.now());
            this.update(r);
            return "Reserva cancelada con id: " + id;
        } else {
            logger.error("Categoria con id " + id + " no encontrada");
            throw new Exception("Categoria con id " + id + " no encontrada");
        }
    }

}