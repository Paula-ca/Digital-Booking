package Grupo7.Autitos.security.Payload;

import javax.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank
    private String email;
    @NotBlank
    private String contrasenia;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia (String contrasenia) {
        this.contrasenia = contrasenia;
    }

}
