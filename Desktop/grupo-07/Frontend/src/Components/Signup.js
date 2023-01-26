import React from "react"
import { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import UserContext from "../Context/UserContext"

const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
// eslint-disable-next-line no-useless-escape
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/ // at least 8 characters, 1 lower case and 1 upper case

const Login = _ => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const { signup } = useContext(UserContext)
    const navigate = useNavigate()

    const submitForm = async (event) => {
        event.preventDefault()
        if (!name || !surname || !email || !password || !repeatPassword) {
            alert('Por favor, completá todos los campos')
        } else {
            if (!name.match(nameRegex)) {
                alert('Por favor, ingresá un nombre válido')
            } else if (!surname.match(nameRegex)) {
                alert('Por favor, ingresá un apellido válido')
            } else if (!email.match(emailRegex)) {
                alert('Por favor, ingresá un correo electrónico válido')
            } else if (!password.match(passwordRegex) || !repeatPassword.match(passwordRegex)) {
                alert('Por favor, ingresá una contraseña válida')
            } else if (password !== repeatPassword) {
                alert('Las contraseñas no coinciden')
            } else {
                const authenticationResponse = await signup(name, surname, email, password)
                if (authenticationResponse) {
                    if (authenticationResponse === 1) {
                        navigate('../')
                    } else if (authenticationResponse === 2) {
                        alert('El correo electrónico ingrsado ya está en uso')
                    }
                } else {
                    alert('Lamentablemente no ha podido registrarse. Por favor intente más tarde')
                }
            }
        }
    }

    return (
        <main className="login-signup-container">
            <form className="login-signup-form">
                <h2>Crear cuenta</h2>
                <div className="signup-names">
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input className="signup-name-input" onChange={e => setName(e.target.value)} id="name" type="text" />
                    </div>
                    <div>
                        <label htmlFor="surname">Apellido</label>
                        <input className="signup-name-input" onChange={e => setSurname(e.target.value)} id="surname" type="text" />
                    </div>
                </div>
                <label htmlFor="email">Correo electrónico</label>
                <input onChange={e => setEmail(e.target.value)} id="email" type="email" />
                <label htmlFor="password">Contraseña</label>
                <input onChange={e => setPassword(e.target.value)} id="password" type="password" />
                <label htmlFor="repeatPassword">Confirmar contraseña</label>
                <input onChange={e => setRepeatPassword(e.target.value)} id="repeatPassword" type="password" />
                <button type="submit" onClick={submitForm}>Ingresar</button>
                <p>¿Ya tenés una cuenta? <Link to='/login'>Iniciar sesión</Link></p>
            </form>
        </main>
    )
}

export default Login