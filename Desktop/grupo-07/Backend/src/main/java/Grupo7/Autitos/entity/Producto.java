package Grupo7.Autitos.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String titulo;

    @Column
    private String descripcion;

    @Column
    private Boolean disponibilidad;

    @Column
    private String ubicacion;

    @Column
    private String coordenadas;

    @Column
    private int rating = 1;

    @ManyToMany
    @JoinTable(
            name = "productos_has_caracteristica",
            joinColumns = @JoinColumn(name = "id_producto"),
            inverseJoinColumns = @JoinColumn(name = "id_caracteristica")
    )
    private List<Caracteristica> caracteristicas;

    @ManyToOne
    @JoinColumn(name = "id_ciudad", nullable = false)
    private Ciudad ciudad;

    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_producto")
    private List<Imagen> imagenes;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_producto")
    @JsonIgnore
    private List<Reserva> reservas = new ArrayList<>();

    @ManyToMany()
    @JoinTable(name = "productos_has_politicas",
            joinColumns = {@JoinColumn(name = "id_producto")},
            inverseJoinColumns = {@JoinColumn(name = "id_politica")})
    private List<Politica> politicas = new ArrayList<>();


    public Producto() {
    }

    public Producto(String titulo, String descripcion, Boolean disponibilidad, String ubicacion, String coordenadas, List<Caracteristica> caracteristicas, Ciudad ciudad, Categoria categoria, List<Imagen> imagenes, List<Reserva> reservas, List<Politica> politicas, int rating) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.disponibilidad = disponibilidad;
        this.ubicacion = ubicacion;
        this.coordenadas = coordenadas;
        this.caracteristicas = caracteristicas;
        this.ciudad = ciudad;
        this.categoria = categoria;
        this.imagenes = imagenes;
        this.reservas = reservas;
        this.politicas = politicas;
        this.rating = rating;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean getDisponibilidad() {
        return disponibilidad;
    }

    public void setDisponibilidad(Boolean disponibilidad) {
        this.disponibilidad = disponibilidad;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getCoordenadas() {
        return coordenadas;
    }

    public void setCoordenadas(String coordenadas) {
        this.coordenadas = coordenadas;
    }

    public List<Caracteristica> getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(List<Caracteristica> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public Ciudad getCiudad() {
        return ciudad;
    }

    public void setCiudad(Ciudad ciudad) {
        this.ciudad = ciudad;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public List<Imagen> getImagenes() {
        return imagenes;
    }

    public void setImagenes(List<Imagen> imagenes) {
        this.imagenes = imagenes;
    }

    public List<Reserva> getReservas() {
        return reservas;
    }

    public void setReservas(List<Reserva> reservas) {
        this.reservas = reservas;
    }

    public List<Politica> getPoliticas() {
        return politicas;
    }

    public void setPoliticas(List<Politica> politicas) {
        this.politicas = politicas;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

}
