import React from "react"
import Select from 'react-select'
import { Link, useLocation, useNavigate } from "react-router-dom"
import UserContext from "../Context/UserContext"

const Logo = _ => {
    return (
        <Link to="/" className="logo">
            <img className="logo-image" src="../../logo-header.png" alt="logo"/><span style={{ marginLeft: '8px' }}>Sentite como en tu hogar</span>
        </Link>
    )
}

const LoginHeader = _ => {
    const { pathname } = useLocation() 
    return (
        <div>
            { pathname && pathname!== '/signup' && <Link to={'/signup'}>Registrarse</Link> }
            { pathname && pathname!== '/login' && <Link to={'/login'}>Iniciar sesión</Link> }
        </div>
    )
}

const UserHeader = _ => {
    const { user, logout } = React.useContext(UserContext)
    const navigate = useNavigate()
    const welcomeMessage = `Bienvenid${user.pronouns ? user.pronouns === 'm' ? 'o' : user.pronouns === 'f' ? 'a' : 'o/a' : 'o/a'} ${user.name || 'Unknown'}`

    const logoutToLanding = _ => {
        navigate('/')
        logout()
    }

    const options = []
    if (user.rol === 'ROLE_SUPER_ADMIN' || user.rol === 'ROLE_ADMIN') {
        options.push({
            value: 'administration', label: 'Administración'
        })
    }
    options.push({
        value: 'my-reservations', label: 'Mis reservas'
    })
    return (
        <div className="user-welcome">
            <div className="circle-user-initials">{`${user.name.charAt(0).toUpperCase()}${user.surname.charAt(0).toUpperCase()}`}</div>
                <Select
                    onChange={e => navigate(`/${e.value}`)}
                    placeholder={welcomeMessage}
                    options={options}
                    value={welcomeMessage}
                    styles={{
                        indicatorsContainer: (baseStyles, state) => ({
                            ...baseStyles,
                            margin: '0',
                            padding: '0'
                        }),
                        indicatorSeparator: (baseStyles, state) => ({
                            width: '0'
                        }),
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: '#383B58',
                            backgroundColor: '#383B58'
                        }),
                        option: (baseStyles, state) => ({
                            ...baseStyles,
                            width: '90%',
                            ":hover": {
                                backgroundColor: '#545776'
                            },
                            ":active":{
                                backgroundColor: '#545776'
                            },
                            cursor: 'pointer',
                            backgroundColor: state.isFocused ? '#545776' : '#383B58'
                        }),
                        placeholder: (baseStyles, state) => ({
                            ...baseStyles,
                            color: '#F3F1ED',
                            width: 'fit-content'
                        }),
                        valueContainer: (baseStyles, state) => ({
                            ...baseStyles,
                            width: 'fit-content',
                            color: '#F3F1ED'
                        }),
                        singleValue: (baseStyles, state) => ({
                            ...baseStyles,
                            color: '#F3F1ED'
                        }),
                        menuList: (baseStyles, state) => ({
                            ...baseStyles,
                            margin: '0',
                            padding: '0',
                            backgroundColor: '#383B58'
                        })
                    }}
                />
            <button onClick={logoutToLanding}>Cerrar sesión</button>
        </div>
    )
}

const HeaderRight = (props) => {
    const { user } = props
    const width = window.innerWidth
    return width > 605 ? (
        <nav className="header-right">
            {
                user ? <UserHeader /> : <LoginHeader />
            }
        </nav>
    ) : ''
}


const Header = (props) => {
    const { user } = React.useContext(UserContext)
    return (
        <header id='header'>
            <Logo/>
            <HeaderRight user={user} />
        </header>
    )
}

export default Header
