package Grupo7.Autitos.service;

import Grupo7.Autitos.entity.*;
import Grupo7.Autitos.repository.ProductoRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProductoService {

    @Autowired
    ProductoRepository productoRepository;

    public static final Logger logger = Logger.getLogger(ProductoService.class);

    public Producto add(Producto p){
        if(p.getTitulo() != null
                && p.getDescripcion() != null
                && p.getUbicacion() != null
                && (p.getRating() > 0 && p.getRating() <= 5)
                && p.getCiudad() != null
                && p.getCategoria() != null
                && p.getCaracteristicas() != null
                && p.getPoliticas() != null
                && p.getImagenes().size() > 0) {
            return productoRepository.save(p);
        } else {
            return null;
        }
    }

    public List<Producto> list() {
        return productoRepository.findAll();
    }


    public Set<Producto> cityFilter(Long id){
        return new HashSet<>(productoRepository.findByCiudadId(id));
    }

    public Set<Producto> categoryFilter(Long id){
        return new HashSet<>(productoRepository.findByCategoriaId(id));
    }


    public Producto update(Producto p) {
        Producto producto  = this.find(p.getId());
        if(p.getTitulo() != null) {
            producto.setTitulo(p.getTitulo());
        }
        if(p.getDescripcion() != null){
            producto.setDescripcion(p.getDescripcion());
        }
        if(p.getUbicacion() != null){
            producto.setUbicacion(p.getUbicacion());
        }
        if(p.getCoordenadas() != null){
            producto.setCoordenadas(p.getCoordenadas());
        }
        if(p.getDisponibilidad() != null){
            producto.setDisponibilidad(p.getDisponibilidad());
        }
        if(p.getCaracteristicas() != null){
            producto.setCaracteristicas(p.getCaracteristicas());
        }
        if(p.getCategoria() != null){
            producto.setCategoria(p.getCategoria());
        }
        if(p.getCiudad() != null){
            producto.setCiudad(p.getCiudad());
        }
        if(p.getPoliticas() != null){
            producto.setPoliticas(p.getPoliticas());
        }
        if(p.getImagenes() != null){
            producto.setImagenes(p.getImagenes());
        }

        productoRepository.save(producto);
        return producto;
    }

    public String delete(Long id) throws Exception {
        logger.debug("Eliminando producto...");
        Producto p = this.find(id);
        if(p != null){
            logger.info("Producto eliminado con id: " + id);
            productoRepository.deleteById(id);
            return "Producto eliminado con id: " + id;
        } else {
            logger.error("Producto con id " + id + " no encontrado");
            throw new Exception("Producto con id " + id + " no encontrado");
        }
    }

    public Producto find(Long id){
        return productoRepository.findById(id).orElse(null);
    }

    public List<Producto> dateFilter(LocalDate inicio, LocalDate fin) {
        List<Producto> lista = productoRepository.findProductosByDate(inicio, fin);
        List<Producto> listaNueva = new ArrayList<>();

        for (Producto producto : lista) {
            boolean agregable = true;

            for (Reserva r : producto.getReservas()) {
                if ((r.getFecha_ingreso().isEqual(inicio) || r.getFecha_ingreso().isEqual(fin)
                        || (r.getFecha_ingreso().isAfter(inicio)) && r.getFecha_ingreso().isBefore(fin)) && r.getBorrado() == null) {
                    agregable = false;
                } else if ((r.getFecha_final().isEqual(inicio) || r.getFecha_final().isEqual(fin)
                        || (r.getFecha_final().isAfter(inicio)) && r.getFecha_final().isBefore(fin)) && r.getBorrado() == null) {
                    agregable = false;
                }
            }

            if (agregable) {
                listaNueva.add(producto);
            }
        }

        return listaNueva;
    }

    public List<Producto> dateAndCityFilter(LocalDate inicio, LocalDate fin, Long id_ciudad) {
        List<Producto> lista = productoRepository.findProductosByDateAndCity(inicio, fin, id_ciudad);
        List<Producto> listaNueva = new ArrayList<>();

        boolean agregable = true;

        for(Producto producto : lista) {
            for (Reserva r : producto.getReservas()) {
                if ((r.getFecha_ingreso().isEqual(inicio) || r.getFecha_ingreso().isEqual(fin)
                        || (r.getFecha_ingreso().isAfter(inicio)) && r.getFecha_ingreso().isBefore(fin)) && r.getBorrado() == null) {
                    agregable = false;
                } else if ((r.getFecha_final().isEqual(inicio) || r.getFecha_final().isEqual(fin)
                        || (r.getFecha_final().isAfter(inicio)) && r.getFecha_final().isBefore(fin)) && r.getBorrado() == null) {
                    agregable = false;
                }
            }
            if (agregable) {
                listaNueva.add(producto);
            }
        }

        return listaNueva;
    }

}
