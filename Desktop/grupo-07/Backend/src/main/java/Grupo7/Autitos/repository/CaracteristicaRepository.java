package Grupo7.Autitos.repository;

import Grupo7.Autitos.entity.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaracteristicaRepository extends JpaRepository<Caracteristica,Long> {
}
