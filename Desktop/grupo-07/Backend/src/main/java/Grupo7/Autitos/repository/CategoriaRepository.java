package Grupo7.Autitos.repository;

import Grupo7.Autitos.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.HashSet;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @Query("SELECT c FROM Categoria c WHERE c.borrado = NULL")
    HashSet<Categoria> findAllCategories();

}
