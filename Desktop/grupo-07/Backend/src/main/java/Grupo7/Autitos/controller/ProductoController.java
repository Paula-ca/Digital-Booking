package Grupo7.Autitos.controller;

import Grupo7.Autitos.entity.Imagen;
import Grupo7.Autitos.entity.Producto;
import Grupo7.Autitos.entity.Reserva;
import Grupo7.Autitos.service.ImagenService;
import Grupo7.Autitos.service.ProductoService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductoController {

    @Autowired
    ProductoService productoService;

    @Autowired
    ImagenService imagenService;

    public static final Logger logger = Logger.getLogger(ProductoController.class);

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Producto> add(@RequestBody Producto producto){
        ResponseEntity response = null;

        logger.debug("Agregando producto...");
        if(producto != null) {
            for (Imagen i : producto.getImagenes()) {
                imagenService.add(i);
            }
            response = new ResponseEntity(productoService.add(producto), HttpStatus.OK);
            logger.info("Producto agregado con id: " + producto.getId());
        } else {
            response = new ResponseEntity("Producto no agregado",HttpStatus.NOT_FOUND);
            logger.error("El producto es nulo");
        }

        return response;
    }

    @GetMapping("/random-list")
    public ResponseEntity<List<Producto>> randomList() {
        ResponseEntity response = null;

        Set<Producto> lista = new HashSet<>(productoService.list());

        logger.debug("Listando productos...");
        if(lista.size() > 0){
            response = new ResponseEntity(lista, HttpStatus.OK);
            logger.info("Productos listados");
        } else {
            response = new ResponseEntity("No se encontraron productos", HttpStatus.NOT_FOUND);
            logger.error("Error al listar productos");
        }

        return response;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Producto>> productList() {
        ResponseEntity response = null;

        List<Producto> lista = productoService.list();

        logger.debug("Listando productos...");
        if(lista.size() > 0){
            response = new ResponseEntity(lista, HttpStatus.OK);
            logger.info("Productos listados");
        } else {
            response = new ResponseEntity("No se encontraron productos", HttpStatus.NOT_FOUND);
            logger.error("Error al listar productos");
        }

        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> getById (@PathVariable Long id){
        ResponseEntity response = null;

        logger.debug("Buscando producto...");
        if(productoService.find(id) != null){
            response = new ResponseEntity(productoService.find(id),HttpStatus.OK);
            logger.info("Producto encontrado con id "+id );
        }else{
            response = new ResponseEntity("No se encontró el producto con id "+id, HttpStatus.NOT_FOUND);
            logger.error("No se encontró el producto con id "+id);
        }
        return response;
    }

    @GetMapping("/list/city-{city_id}")
    public ResponseEntity<List<Producto>> cityFilter(@PathVariable Long city_id) {
        ResponseEntity response = null;

        Set<Producto> lista = productoService.cityFilter(city_id);

        logger.debug("Listando productos...");
        if(lista.size() > 0){
            response = new ResponseEntity(lista, HttpStatus.OK);
            logger.info("Productos filtrados por ciudad");
        } else {
            response = new ResponseEntity("No se encontraron productos de la ciudad con id " + city_id, HttpStatus.NOT_FOUND);
            logger.error("Error al filtrar productos");
        }

        return response;
    }

    @GetMapping("/list/category-{category_id}")
    public ResponseEntity<List<Producto>> categoryFilter(@PathVariable Long category_id) {
        ResponseEntity response = null;

        Set<Producto> lista = productoService.categoryFilter(category_id);

        logger.debug("Listando productos...");
        if(lista.size() > 0){
            response = new ResponseEntity(lista, HttpStatus.OK);
            logger.info("Productos filtrados por categoria");
        } else {
            response = new ResponseEntity("No se encontraron productos de la categoria con id " + category_id, HttpStatus.NOT_FOUND);
            logger.error("Error al filtrar productos");
        }

        return response;
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<Producto> update(@RequestBody Producto producto){
        ResponseEntity response = null;

        logger.debug("Actualizando producto...");
        if(producto != null){
            response = new ResponseEntity(productoService.update(producto), HttpStatus.OK);
            logger.info("Producto actualizado con id: " + producto.getId());
        } else {
            response = new ResponseEntity("No se pudo actualizar el producto", HttpStatus.NOT_FOUND);
            logger.error("Error al actualizar el producto");
        }

        return response;
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws Exception {

        for (Imagen i : productoService.find(id).getImagenes()) {
            imagenService.delete(i.getId());
        }

        return ResponseEntity.ok(productoService.delete(id));
    }

    @GetMapping("/date-filter")
    public ResponseEntity<List<Reserva>> dateFilter(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate inicio,
                                                                      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fin,
                                                                      @RequestParam(required = false) Long ciudad) {
        ResponseEntity response = null;

        logger.debug("Listando reservas segun fecha y/o ciudad");

        try {
            if (ciudad != null) {
                logger.info("Lista de reservas por fecha y ciudad");
                response = new ResponseEntity<>(productoService.dateAndCityFilter(inicio, fin, ciudad), HttpStatus.OK);
            }
            if (ciudad == null) {
                logger.info("Lista de reservas por fecha");
                response = new ResponseEntity<>(productoService.dateFilter(inicio, fin), HttpStatus.OK);
            }
        } catch (Exception e){
            response = new ResponseEntity("Error al aplicar filtro por fecha y/o ciudad", HttpStatus.NOT_FOUND);
            logger.error("Error al aplicar filtro por fecha y/o ciudad", e);
        }

        return response;
    }

}
