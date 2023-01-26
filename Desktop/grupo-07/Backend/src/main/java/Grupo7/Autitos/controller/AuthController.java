package Grupo7.Autitos.controller;

import Grupo7.Autitos.entity.Rol;
import Grupo7.Autitos.entity.Usuario;
import Grupo7.Autitos.entity.UsuarioResponse;
import Grupo7.Autitos.security.Jwt.JwtProvider;
import Grupo7.Autitos.security.Payload.LoginRequest;
import Grupo7.Autitos.security.Payload.LoginResponse;
import Grupo7.Autitos.security.Payload.RegisterRequest;
import Grupo7.Autitos.service.UsuarioService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    JwtProvider jwtProvider;

    public static final Logger logger = Logger.getLogger(AuthController.class);

    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest, BindingResult bindingResult) {

        logger.debug("Registrando usuario...");

        if (bindingResult.hasErrors()) {
            logger.error("Datos invalidos");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Datos invalidos");
        }
        if (usuarioService.existsUserByEmail(registerRequest.getEmail())) {
            logger.error("Correo ya registrado");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Este correo ya se encuentra registrado");
        }

        Usuario usuario = new Usuario(registerRequest.getNombre(),
                registerRequest.getApellido(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getContrasenia()),
                "");

        // rol por defecto: USER
        Rol rol = new Rol();
        rol.setId(2L);
        usuario.setRol(rol);

        usuarioService.add(usuario);
        logger.info("Usuario registrado: " + usuario.getEmail());

        return new ResponseEntity<>(usuario, HttpStatus.CREATED);

    }

    @PostMapping("/signin")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, BindingResult bindingResult) {
        logger.debug("Logeando usuario...");

        if (bindingResult.hasErrors()) {
            logger.error("Error al logear");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                        loginRequest.getContrasenia()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        LoginResponse token = new LoginResponse(jwt);

        logger.info("Usuario logeado");

        Usuario usuarioLogin = usuarioService.userByEmail(loginRequest.getEmail());

        UsuarioResponse usuario = new UsuarioResponse();
        usuario.setId(usuarioLogin.getId());
        usuario.setNombre(usuarioLogin.getNombre());
        usuario.setApellido(usuarioLogin.getApellido());
        usuario.setEmail(usuarioLogin.getEmail());
        usuario.setCiudad(usuarioLogin.getCiudad());
        usuario.setRol(usuarioLogin.getRol().getNombre().name());
        usuario.setToken(token.getToken());

        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

}