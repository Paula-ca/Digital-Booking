package Grupo7.Autitos.entity;

import Grupo7.Autitos.security.Payload.LoginResponse;

public class UsuarioResponse {

    private Long id;

    private String nombre;

    private String apellido;

    private String email;

    private String ciudad;

    private String rol;

    private String token;

    public UsuarioResponse(Long id, String nombre, String apellido, String email, String ciudad, String rol, String token) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.ciudad = ciudad;
        this.rol = rol;
        this.token = token;
    }

    public UsuarioResponse() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
