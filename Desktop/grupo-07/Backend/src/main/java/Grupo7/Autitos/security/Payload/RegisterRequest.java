package Grupo7.Autitos.security.Payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class RegisterRequest {

    @NotBlank
    private String nombre;

    @NotBlank
    private String apellido;

    @Email
    private String email;

    @NotBlank
    private String contrasenia;

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

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }
}