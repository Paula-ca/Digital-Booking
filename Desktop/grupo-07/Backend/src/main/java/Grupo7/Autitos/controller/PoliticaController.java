package Grupo7.Autitos.controller;

import Grupo7.Autitos.entity.Politica;
import Grupo7.Autitos.service.PoliticaService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/policies")
public class PoliticaController {

    @Autowired
    PoliticaService politicaService;

    public static final Logger logger = Logger.getLogger(PoliticaController.class);

    @PostMapping("/add")
    public ResponseEntity<Politica> add(@RequestBody Politica politica){
        ResponseEntity response = null;

        logger.debug("Agregando politica...");
        if(politica != null) {
            response = new ResponseEntity(politicaService.add(politica), HttpStatus.OK);
            logger.info("Politica agregada con id: " + politica.getId());
        } else {
            response = new ResponseEntity("Politica no agregada", HttpStatus.NOT_FOUND);
            logger.error("La politica es nula");
        }

        return response;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Politica>> categoryList() {
        ResponseEntity response = null;

        Set<Politica> lista = politicaService.list();

        logger.debug("Listando politicas...");
        if(lista.size() > 0){
            response = new ResponseEntity(lista, HttpStatus.OK);
            logger.info("Politicas listadas");
        } else {
            response = new ResponseEntity("No se encontraron politicas", HttpStatus.NOT_FOUND);
            logger.error("Error al listar politicas");
        }

        return response;
    }

    @PutMapping("/update")
    public ResponseEntity<Politica> update(@RequestBody Politica politica){
        ResponseEntity response = null;

        logger.debug("Actualizando politica...");
        if(politica != null){
            response = new ResponseEntity(politicaService.update(politica), HttpStatus.OK);
            logger.info("Politica actualizada con id: " + politica.getId());
        } else {
            response = new ResponseEntity("No se pudo actualizar politica", HttpStatus.NOT_FOUND);
            logger.error("Error al actualizar politica");
        }

        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(politicaService.delete(id));
    }

    @GetMapping("/list-{titulo}")
    public ResponseEntity<Politica> getById (@PathVariable String titulo){
        ResponseEntity response = null;

        List<Politica> lista = politicaService.findByTitulo(titulo);

        logger.debug("Buscando politicas...");
        if(lista.size() > 0){
            response = new ResponseEntity(lista,HttpStatus.OK);
            logger.info("Politicas encontradas con titulo " + titulo);
        }else{
            response = new ResponseEntity("No se encontraron politicas con titulo " + titulo, HttpStatus.NOT_FOUND);
            logger.error("No se encontraron el politicas con titulo " + titulo);
        }
        return response;
    }

}
