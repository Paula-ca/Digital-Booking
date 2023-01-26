package Grupo7.Autitos.controller;

import Grupo7.Autitos.entity.Ciudad;
import Grupo7.Autitos.entity.Producto;
import Grupo7.Autitos.service.CiudadService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/cities")
public class CiudadController {

    @Autowired
    CiudadService ciudadService;

    public static final Logger logger = Logger.getLogger(CiudadController.class);

    @PostMapping("/add")
    public ResponseEntity<Ciudad> add(@RequestBody Ciudad ciudad){
        ResponseEntity response = null;

        logger.debug("Agregando ciudad...");
        if(ciudad != null) {
            response = new ResponseEntity(ciudadService.add(ciudad), HttpStatus.OK);
            logger.info("Ciudad agregada con id: " + ciudad.getId());
        } else {
            response = new ResponseEntity("Ciudad no agregada",HttpStatus.NOT_FOUND);
            logger.error("La ciudad es nula");
        }

        return response;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Ciudad>> cityList() {
        ResponseEntity response = null;

        Set<Ciudad> lista = ciudadService.list();

        logger.debug("Listando ciudades...");
        if(lista.size() > 0){
            response = new ResponseEntity(lista, HttpStatus.OK);
            logger.info("Ciudades listadas");
        } else {
            response = new ResponseEntity("No se encontraron ciudades", HttpStatus.NOT_FOUND);
            logger.error("Error al listar ciudades");
        }

        return response;
    }
    @PutMapping("/update")
    public ResponseEntity<Producto> update(@RequestBody Ciudad ciudad){
        ResponseEntity response = null;

        logger.debug("Actualizando ciudad...");
        if(ciudad != null){
            response = new ResponseEntity(ciudadService.update(ciudad), HttpStatus.OK);
            logger.info("Ciudad actualizada con id: " + ciudad.getId());
        } else {
            response = new ResponseEntity("No se pudo actualizar la ciudad", HttpStatus.NOT_FOUND);
            logger.error("Error al actualizar la ciudad");
        }

        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws Exception {

        return ResponseEntity.ok(ciudadService.delete(id));
    }

    @GetMapping("/list-{pais}")
    public ResponseEntity<Ciudad> getById (@PathVariable String pais){
        ResponseEntity response = null;

        List<Ciudad> lista = ciudadService.findByPais(pais);

        logger.debug("Buscando ciudades...");
        if(lista.size() > 0){
            response = new ResponseEntity(lista,HttpStatus.OK);
            logger.info("Ciudades encontradas en " + pais);
        }else{
            response = new ResponseEntity("No se encontraron ciudades en " + pais, HttpStatus.NOT_FOUND);
            logger.error("No se encontraron el ciudades en " + pais);
        }
        return response;
    }

}
