package Grupo7.Autitos.service;

import Grupo7.Autitos.entity.Ciudad;
import Grupo7.Autitos.repository.CiudadRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class CiudadService {

    @Autowired
    CiudadRepository ciudadRepository;

    public static final Logger logger = Logger.getLogger(CiudadService.class);

    public Ciudad add(Ciudad c){
        if(c.getTitulo() != null
                && c.getPais() != null
                ) {
            return ciudadRepository.save(c);
        } else {
            return null;
        }
    }

    public Set<Ciudad> list() {
        return new HashSet<>(ciudadRepository.findAll());

    }

    public Ciudad update(Ciudad c) {
        Ciudad ciudad  = this.find(c.getId());
        if(c.getPais()!= null) {
            ciudad.setPais(c.getPais());
        }
        if(c.getTitulo() != null){
            ciudad.setTitulo(c.getTitulo());
        }

        ciudadRepository.save(ciudad);
        return ciudad;
    }



    public String delete(Long id) throws Exception {
        logger.debug("Eliminando ciudad...");
        Ciudad c = this.find(id);
        if(c != null){
            logger.info("Ciudad eliminada con id: " + id);
            ciudadRepository.deleteById(id);
            return "Ciudad eliminada con id: " + id;
        } else {
            logger.error("Ciudad con id " + id + " no encontrada");
            throw new Exception("Ciudad con id " + id + " no encontrada");
        }
    }

    public Ciudad find(Long id){
        return ciudadRepository.findById(id).orElse(null);
    }

    public List<Ciudad> findByPais(String pais){
        return ciudadRepository.findCiudadByPais(pais);
    }

}
