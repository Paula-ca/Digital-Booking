package Grupo7.Autitos.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="roles")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TipoRol nombre;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_rol")
    private Set<Usuario> users = new HashSet<>();

    public Rol(TipoRol nombre, Set<Usuario> users) {
        this.nombre = nombre;
        this.users = users;
    }

    public Rol() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Rol(TipoRol nombre) {
        this.nombre = nombre;
    }

    public TipoRol getNombre() {
        return nombre;
    }

    public void setNombre(TipoRol nombre) {
        this.nombre = nombre;
    }

    public Set<Usuario> getUsers() {
        return users;
    }

    public void setUsers(Set<Usuario> users) {
        this.users = users;
    }

}
