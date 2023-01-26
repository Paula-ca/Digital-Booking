package Grupo7.Autitos.service;

import Grupo7.Autitos.entity.Politica;
import Grupo7.Autitos.repository.PoliticaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PoliticaService {

    @Autowired
    PoliticaRepository politicaRepository;

    public static final Logger logger = Logger.getLogger(PoliticaService.class);

    public Politica add(Politica p){
        return politicaRepository.save(p);
    }

    public Set<Politica> list() {
        return new HashSet<>(politicaRepository.findAll());
    }

    public Politica update(Politica p) {
        Politica politica  = this.find(p.getId());
        if(p.getTitulo() != null) {
            politica.setTitulo(p.getTitulo());
        }
        if(p.getDescripcion() != null){
            politica.setDescripcion(p.getDescripcion());
        }

        politicaRepository.save(politica);
        return politica;
    }

    public String delete(Long id) throws Exception {
        logger.debug("Eliminando politica...");
        Politica p = this.find(id);
        if(p != null){
            logger.info("Politica eliminada con id: " + id);
            politicaRepository.deleteById(id);
            return "Politica eliminada con id: " + id;
        } else {
            logger.error("Politica con id " + id + " no encontrada");
            throw new Exception("Politica con id " + id + " no encontrada");
        }
    }

    public Politica find(Long id){
        return politicaRepository.findById(id).orElse(null);
    }

    public List<Politica> findByTitulo(String titulo){
        return politicaRepository.findPoliticaByTitulo(titulo);
    }

}
