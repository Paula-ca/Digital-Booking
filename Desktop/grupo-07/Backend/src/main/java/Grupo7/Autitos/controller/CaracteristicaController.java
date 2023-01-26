package Grupo7.Autitos.controller;

import Grupo7.Autitos.entity.Caracteristica;
import Grupo7.Autitos.service.CaracteristicaService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/features")
public class CaracteristicaController {

    @Autowired
    CaracteristicaService caracteristicaService;

    public static final Logger logger = Logger.getLogger(CaracteristicaService.class);

    @PostMapping("/add")
    public ResponseEntity<Caracteristica> add(@RequestBody Caracteristica caracteristica){
        ResponseEntity response = null;

        logger.debug("Agregando caracteristica...");
        if(caracteristica != null) {
            response = new ResponseEntity(caracteristicaService.add(caracteristica), HttpStatus.OK);
            logger.info("Caracteristica agregada con id: " + caracteristica.getId());
        } else {
            response = new ResponseEntity("Caracteristica no agregada",HttpStatus.NOT_FOUND);
            logger.error("La caracteristica es nula");
        }

        return response;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Caracteristica>> featureList() {
        ResponseEntity response = null;

        Set<Caracteristica> lista = caracteristicaService.list();

        logger.debug("Listando caracteristicas...");
        if(lista.size() > 0){
            response = new ResponseEntity(lista, HttpStatus.OK);
            logger.info("Caracteristicas listadas");
        } else {
            response = new ResponseEntity("No se encontraron caracteristicas", HttpStatus.NOT_FOUND);
            logger.error("Error al listar caracteristicas");
        }

        return response;
    }
    @PutMapping("/update")
    public ResponseEntity<Caracteristica> update(@RequestBody Caracteristica caracteristica){
        ResponseEntity response = null;

        logger.debug("Actualizando caracteristica...");
        if(caracteristica != null){
            response = new ResponseEntity(caracteristicaService.update(caracteristica), HttpStatus.OK);
            logger.info("Caracteristica actualizada con id: " + caracteristica.getId());
        } else {
            response = new ResponseEntity("No se pudo actualizar la caracteristica", HttpStatus.NOT_FOUND);
            logger.error("Error al actualizar la caracteristica");
        }

        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws Exception {

        return ResponseEntity.ok(caracteristicaService.delete(id));
    }
}
