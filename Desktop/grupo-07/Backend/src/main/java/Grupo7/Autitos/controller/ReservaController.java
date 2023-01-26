package Grupo7.Autitos.controller;

import Grupo7.Autitos.entity.Reserva;
import Grupo7.Autitos.service.ReservaService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/bookings")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    public static final Logger logger = Logger.getLogger(ReservaController.class);

    @PreAuthorize("hasAnyRole('ADMIN','USER','SUPER_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Reserva> add(@RequestBody @Valid Reserva reserva) {
        ResponseEntity response = null;

        logger.debug("Agregando reserva...");
        if(reserva != null) {
            response = new ResponseEntity(reservaService.add(reserva), HttpStatus.CREATED);
            logger.info("Reserva agregada con id: " + reserva.getId());
        } else {
            response = new ResponseEntity("Reserva no agregada",HttpStatus.BAD_REQUEST);
            logger.error("La reserva es nula");
        }

        return response;
    }

    @GetMapping("/product/{id}/{cancelada}")
    public ResponseEntity<List<?>> listBookingsByProductId(@PathVariable Long id, @PathVariable Boolean cancelada) {
        ResponseEntity response = null;

        List<Reserva> lista = reservaService.filterByProductId(id, cancelada);

        logger.debug("Buscando reservas...");
        if(lista != null){
            response = new ResponseEntity(lista,HttpStatus.OK);
            logger.info("Reservas del producto con id: "+ id);
        }else{
            response = new ResponseEntity("No se encontraron reservas para el producto con id " + id, HttpStatus.NOT_FOUND);
            logger.error("No se encontraron reservas para el producto con id  " + id);
        }

        return response;
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','SUPER_ADMIN')")
    @GetMapping("/user/{id}/{borrada}")
    public ResponseEntity<List<?>> listBookingsByUserId(@PathVariable Long id, @PathVariable Boolean borrada) {
        ResponseEntity response = null;

        List<Reserva> lista = reservaService.filterByUserId(id, borrada);

        logger.debug("Buscando reservas...");
        if(lista != null){
            response = new ResponseEntity(lista,HttpStatus.OK);
            logger.info("Reservas del usuario con id: " + id);
        }else{
            response = new ResponseEntity("No se encontraron reservas para el usuario con id " + id, HttpStatus.NOT_FOUND);
            logger.error("No se encontraron reservas para el usuario con id  " + id);
        }

        return response;
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','SUPER_ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<Reserva> update(@RequestBody Reserva reserva){
        ResponseEntity response = null;

        logger.debug("Actualizando reserva...");
        if(reserva != null){
            response = new ResponseEntity(reservaService.update(reserva), HttpStatus.OK);
            logger.info("Reserva actualizado con id: " + reserva.getId());
        } else {
            response = new ResponseEntity("Reserva null", HttpStatus.NOT_FOUND);
            logger.error("Error al actualizar la reserva");
        }

        return response;
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','SUPER_ADMIN')")
    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<String> cancel(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(reservaService.cancel(id));
    }

}