package Grupo7.Autitos.repository;

import Grupo7.Autitos.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByCiudadId(Long ciudad);

    List<Producto> findByCategoriaId(Long categoria);

    @Query(value = "SELECT * FROM productos AS p LEFT JOIN reservas AS r on p.id = r.id_producto WHERE" +
            "((r.fecha_inicial not between ?1 and ?2) OR (r.fecha_inicial IS NULL)) " +
            "AND ((r.fecha_final not between ?1 and ?2) OR (r.fecha_final IS NULL)) " +
            "GROUP BY p.id",
            nativeQuery = true)
    List<Producto> findProductosByDate(LocalDate fecha_inicial, LocalDate fecha_final);

    @Query(value = "SELECT * FROM productos AS p LEFT JOIN reservas AS r on p.id = r.id_producto WHERE" +
            "((r.fecha_inicial NOT BETWEEN ?1 AND ?2) OR (r.fecha_inicial IS NULL)) " +
            "AND ((r.fecha_final not BETWEEN ?1 AND ?2) OR (r.fecha_final IS NULL)) " +
            "AND (p.id_ciudad = ?3) GROUP BY p.id",
            nativeQuery = true)
    List<Producto> findProductosByDateAndCity(LocalDate fecha_inicial, LocalDate fecha_final, Long id_ciudad);

}
