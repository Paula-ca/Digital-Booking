package Grupo7.Autitos.service;

import Grupo7.Autitos.entity.Imagen;
import Grupo7.Autitos.repository.ImagenRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;

@Service
public class ImagenService {

    @Autowired
    ImagenRepository imagenRepository;

    public static final Logger logger = Logger.getLogger(ImagenService.class);

    public void add(Imagen i){
        imagenRepository.save(i);
    }

    public Set<Imagen> list() {
        return new HashSet<>(imagenRepository.findAll());
    }

    public Imagen update(Imagen i) {
        Imagen imagen  = this.find(i.getId());
        if(i.getTitulo() != null) {
            imagen.setTitulo(i.getTitulo());
        }
        if(i.getUrl() != null){
            imagen.setUrl(i.getUrl());
        }
        imagenRepository.save(imagen);
        return imagen;
    }

    public String delete(Long id) throws Exception {
        logger.debug("Eliminando imagen...");
        Imagen i = this.find(id);
        if(i != null){
            logger.info("Imagen eliminada con id: " + id);
            imagenRepository.deleteById(id);
            return "Imagen eliminada con id: " + id;
        } else {
            logger.error("Imagen con id " + id + " no encontrada");
            throw new Exception("Imagen con id " + id + " no encontrada");
        }
    }

    public Imagen find(Long id){
        return imagenRepository.findById(id).orElse(null);
    }
}
