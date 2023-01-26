package Grupo7.Autitos.service;

import Grupo7.Autitos.controller.CategoriaController;
import Grupo7.Autitos.entity.Categoria;
import Grupo7.Autitos.repository.CategoriaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Service
public class CategoriaService {

    @Autowired
    CategoriaRepository categoriaRepository;

    public static final Logger logger = Logger.getLogger(CategoriaController.class);

    public Categoria add(Categoria c){
        if(c.getTitulo() != null
                && c.getDescripcion() != null
                && c.getUrlImagen() != null) {
            return categoriaRepository.save(c);
        } else {
            return null;
        }
    }

    public Set<Categoria> list(Boolean borrados) {
        if(borrados){
            return new HashSet<>(categoriaRepository.findAll());
        }
        else return categoriaRepository.findAllCategories();
    }

    public Categoria update(Categoria c) {
        Categoria categoria  = this.find(c.getId());
        if(c.getTitulo() != null) {
            categoria.setTitulo(c.getTitulo());
        }
        if(c.getDescripcion() != null){
            categoria.setDescripcion(c.getDescripcion());
        }
        if(c.getUrlImagen() != null){
            categoria.setUrlImagen(c.getUrlImagen());
        }
        categoriaRepository.save(categoria);
        return categoria;
    }

    public String delete(Long id) throws Exception {
        logger.debug("Eliminando categoria...");
        Categoria c = this.find(id);
        if(c != null){
            logger.info("Categoria eliminada con id: " + id);
            c.setBorrado(LocalDate.now());
            this.update(c);
            return "Categoria eliminada con id: " + id;
        } else {
            logger.error("Categoria con id " + id + " no encontrada");
            throw new Exception("Categoria con id " + id + " no encontrada");
        }
    }

    public String hardDelete(Long id) throws Exception {
        logger.debug("Eliminando categoria...");
        Categoria c = this.find(id);
        if(c != null){
            logger.info("Categoria eliminada con id: " + id);
            categoriaRepository.deleteById(id);
            return "Categoria eliminada con id: " + id;
        } else {
            logger.error("Categoria con id " + id + " no encontrada");
            throw new Exception("Categoria con id " + id + " no encontrada");
        }
    }

    public Categoria find(Long id){
        return categoriaRepository.findById(id).orElse(null);
    }


}
