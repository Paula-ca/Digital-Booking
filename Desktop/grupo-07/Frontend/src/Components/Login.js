import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faEye, faEyeSlash
  } from "@fortawesome/free-solid-svg-icons"
import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import UserContext from "../Context/UserContext"

// eslint-disable-next-line no-useless-escape
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/ // at least 8 characters, 1 lower case and 1 upper case

const Login = _ => {
    const navigate = useNavigate()
    const { login } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordShown, setPasswordShown] = useState(false)

    const submitForm = async (event) => {
        event.preventDefault()
        if (!email || !password) {
            alert('Por favor, completá todos los campos')
        } else {
            if (!email.match(emailRegex)) {
                alert('Por favor, ingresá un correo electrónico válido')
            } else if (!password.match(passwordRegex)) {
                alert('Por favor, ingresá una contraseña válida (al menos 8 caracteres y una mayúsucla)')
            } else {
                const authenticatedUser = await login(email, password)
                if (authenticatedUser) {
                    const welcomeMessage = `Bienvenid${(authenticatedUser.pronouns && ((authenticatedUser.pronouns === 'm' && 'o') || (authenticatedUser.pronouns === 'f' && 'a'))) || 'o/a' } `
                    alert(welcomeMessage + authenticatedUser.name)
                    navigate('../')
                } else {
                    alert('Lamentablemente no ha podido iniciar sesión. Por favor intente más tarde')
                }
            }
        }
    }

    return (
        <main className="login-signup-container">
            <form className="login-signup-form">
                <h2>Iniciar sesión</h2>
                <label htmlFor="email">Correo electrónico</label>
                <input onChange={e => setEmail(e.target.value)} id="email" type="email" />
                <label htmlFor="password">Contraseña</label>
                <div className="password-field-login">
                    <input onChange={e => setPassword(e.target.value)} id="password" type={passwordShown ? 'text' : 'password'} />
                    <i onClick={_ => setPasswordShown(!passwordShown)} type="button"><FontAwesomeIcon className="fa-solid showpassword-icon" icon={passwordShown ? faEyeSlash : faEye}/></i>
                </div>
                
                <button type="submit" onClick={submitForm}>Ingresar</button>
                <p>¿Todavía no tenés una cuenta? <Link to='/signup'>Registrate</Link></p>
            </form>
        </main>
    )
}

export default Login