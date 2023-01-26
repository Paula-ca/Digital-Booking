package Grupo7.Autitos.controller;

import Grupo7.Autitos.entity.Categoria;
import Grupo7.Autitos.service.CategoriaService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/categories")
public class CategoriaController {

    @Autowired
    CategoriaService categoriaService;

    public static final Logger logger = Logger.getLogger(CategoriaController.class);

    @PostMapping("/add")
    public ResponseEntity<Categoria> add(@RequestBody Categoria categoria){
        ResponseEntity response = null;

        logger.debug("Agregando categoria...");
        if(categoria != null) {
            response = new ResponseEntity(categoriaService.add(categoria), HttpStatus.OK);
            logger.info("Categoria agregada con id: " + categoria.getId());
        } else {
            response = new ResponseEntity("Categoria no agregada",HttpStatus.NOT_FOUND);
            logger.error("La categoria es nula");
        }

        return response;
    }

    @GetMapping("/list/{borrados}")
    public ResponseEntity<List<Categoria>> categoryList(@PathVariable Boolean borrados) {
        ResponseEntity response = null;

        Set<Categoria> lista = categoriaService.list(borrados);

        logger.debug("Listando categorias...");
        if(lista.size() > 0){
            response = new ResponseEntity(lista, HttpStatus.OK);
            logger.info("Categorias listadas");
        } else {
            response = new ResponseEntity("No se encontraron categorias", HttpStatus.NOT_FOUND);
            logger.error("Error al listar categorias");
        }

        return response;
    }

    @PutMapping("/update")
    public ResponseEntity<Categoria> update(@RequestBody Categoria categoria){
        ResponseEntity response = null;

        logger.debug("Actualizando categoria...");
        if(categoria != null){
            response = new ResponseEntity(categoriaService.update(categoria), HttpStatus.OK);
            logger.info("Categoria actualizada con id: " + categoria.getId());
        } else {
            response = new ResponseEntity("No se pudo actualizar categoria", HttpStatus.NOT_FOUND);
            logger.error("Error al actualizar categoria");
        }

        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(categoriaService.delete(id));
    }

    @DeleteMapping("/strongDelete/{id}")
    public ResponseEntity<String> strongDelete(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(categoriaService.hardDelete(id));
    }

}
