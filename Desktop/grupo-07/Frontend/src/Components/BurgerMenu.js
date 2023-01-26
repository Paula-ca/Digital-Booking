import React, { Fragment } from 'react'
import { slide as Burger } from 'react-burger-menu'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../Context/UserContext'
import Media from 'react-media'

const BurgerMenu = _ => {
    const { user, logout } = React.useContext(UserContext)
    const navigate = useNavigate()

    const logoutToLanding = _ => {
      navigate('/')
      logout()
    }
 
    return (
        <Media queries={{
            small: "(max-width: 599px)",
            medium: "(min-width: 600px)"
          }}>
            {matches => (
              <Fragment>
                {matches.small && <Burger right pageWrapId='header' outerContainerId={'App'}>
                    { !user ? <Link to={'/signup'}>Registrarse</Link> : <p>Bienvenido {user.name}</p>}
                    { user && user.rol && (user.rol === 'ROLE_SUPER_ADMIN' || user.rol === 'ROLE_ADMIN') ? <Link to={'/administration'}>Administración</Link> : <></>}
                    { user ? <Link to={'/my-reservations'}>Mis reservas</Link> : <></>}
                    { !user ? <Link to={'/login'}>Iniciar sesión</Link> : <p onClick={logoutToLanding}>Cerrar sesión</p>}
                </Burger>}
                {matches.medium && <></>}
              </Fragment>
            )}
          </Media>
    )
}

export default BurgerMenu