package Grupo7.Autitos.service;


import Grupo7.Autitos.entity.Caracteristica;
import Grupo7.Autitos.repository.CaracteristicaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;

@Service
public class CaracteristicaService {

    @Autowired
    CaracteristicaRepository caracteristicaRepository;

    public static final Logger logger = Logger.getLogger(CaracteristicaService.class);

    public Caracteristica add(Caracteristica c){
        if(c.getTitulo() != null
                && c.getIcono()!= null) {
            return caracteristicaRepository.save(c);
        } else {
            return null;
        }
    }

    public Set<Caracteristica> list() {
            return new HashSet<>(caracteristicaRepository.findAll());

    }

    public Caracteristica update(Caracteristica c) {
        Caracteristica caracteristica  = this.find(c.getId());
        if(c.getIcono()!= null) {
            caracteristica.setIcono(c.getIcono());
        }
        if(c.getTitulo() != null){
            caracteristica.setTitulo(c.getTitulo());
        }

        caracteristicaRepository.save(caracteristica);
        return caracteristica;
    }



    public String delete(Long id) throws Exception {
        logger.debug("Eliminando caracteristica...");
        Caracteristica c = this.find(id);
        if(c != null){
            logger.info("Caracteristica eliminada con id: " + id);
            caracteristicaRepository.deleteById(id);
            return "Caracteristica eliminada con id: " + id;
        } else {
            logger.error("Caracteristica con id " + id + " no encontrada");
            throw new Exception("Caracteristica con id " + id + " no encontrada");
        }
    }

    public Caracteristica find(Long id){
        return caracteristicaRepository.findById(id).orElse(null);
    }

}
