package Grupo7.Autitos.entity;

import javax.persistence.*;

@Entity
@Table(name = "caracteristicas")
public class Caracteristica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String titulo;

    @Column
    private String icono;

    public Caracteristica() {
    }

    public Caracteristica(String titulo, String icono) {
        this.titulo = titulo;
        this.icono = icono;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getIcono() {
        return icono;
    }

    public void setIcono(String icono) {
        this.icono = icono;
    }
}
