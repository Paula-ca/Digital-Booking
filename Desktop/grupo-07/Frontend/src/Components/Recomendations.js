import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHeart, faStar, faMapMarkerAlt, faDollar, faCarSide, faFire, faUserTie
  } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import React from "react"
import axios from "axios"

const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1)

const RatingToStars = props => {
    const toReturn = []
    const { rating } = props

    for (let index = 0; index < rating; index++) {
        toReturn.push(<FontAwesomeIcon key={index} className="fa-solid recomendation-star" icon={faStar} />)    
    }
    
    return (
        <>
            {toReturn.map(component => component)}
        </>
    )
}

const ratingToText = rating => {
    if (rating === 5) {
        return 'Excelente'
    } else if (rating >= 4) {
        return 'Muy bueno'
    } else if (rating >= 3) {
        return 'Bueno'
    } else {
        return 'Ok'
    }
}

const categoryToIcon = category => {
    switch (category) {
        case 'economico':
            return <FontAwesomeIcon className="fa-solid" icon={faDollar} />
        case 'de lujo':
            return <FontAwesomeIcon className="fa-solid" icon={faUserTie}/>
        case 'deportivo':
            return <FontAwesomeIcon className="fa-solid" icon={faFire}/>
        case 'utilitario':
            return <FontAwesomeIcon className="fa-solid" icon={faCarSide}/>
        default:
            return ''
    }
}

const RecomendationCard = (props) => {
    const { car } = props
    // car.rating = Math.floor(Math.random() * (5 - 1 + 1) + 1) // TODO: agregar rating en bdd
    return (
        <div key={car.id} className="recomendation-card">
            <div className="recomendation-image">
                <i className="recomendation-heart"><FontAwesomeIcon className="fa-solid" icon={faHeart}/></i>
                <img src={car.imagenes[0].url} alt={car.titulo} />
            </div>
            <div className="recomendation-details">
                <div className="recomendation-top">
                    <div className="recomendation-title">
                        <h5>{capitalizeFirstLetter(car.categoria.titulo)} {<RatingToStars rating={car.rating}/>}</h5>
                        <h3>{car.titulo}</h3>
                    </div>
                    <div className="recomendation-rating">
                        <p className="recomendation-rating-number">{car.rating}</p>
                        <p className="recomendation-rating-opinion">{ratingToText(car.rating)}</p>
                    </div>
                </div>
                <div className="recomendation-middle">
                    <h5><FontAwesomeIcon className="fa-solid recomendation-location-icon" icon={faMapMarkerAlt}/> {car.ciudad.titulo}, {car.ciudad.pais}</h5>
                    <p className="recomendation-category">{categoryToIcon(car.categoria.titulo)} {capitalizeFirstLetter(car.categoria.titulo)}</p>
                    <p className="recomendation-description">{car.descripcion}</p>
                </div>
                <div className="recomendation-bottom">
                <Link style={{ width: "100%", display: 'flex', justifyContent: 'center', textDecoration: 'none' }} to={`product/${car.id}`}>
                    <button>Ver más</button>
                </Link>
                    
                </div>
            </div>
        </div>
    )
}

const Recomendations = (props) => {
    const [products, setProducts] = React.useState('loading')
    const { category, location, dates } = props
    
    React.useEffect(() => {
        const getProduct = async _ => {
            try {
                const productsData = await axios.get('http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/products/list')
                setProducts(productsData.data)
            } catch (_) {
                alert('Ocurrió un error al conectarse a la base de datos, por favor inténtelo de nuevo más tarde')
                setProducts(null)
            }
        }
        getProduct()
    }, [])

    React.useEffect(() => {
        const getProductsFromCategory = async _ => {
            if (category) {
                try {
                    const productsData = await axios.get(`http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/products/list/category-${category}`)
                    setProducts(productsData.data)
                } catch (error) {
                    if (error.message === 'Request failed with status code 404') {
                        setProducts('404')
                    } else {
                        alert('Ocurrió un error al conectarse a la base de datos, por favor inténtelo de nuevo más tarde')
                        setProducts(null)
                    }
                }
            } else {
                const getProduct = async _ => {
                    try {
                        const productsData = await axios.get('http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/products/list')
                        setProducts(productsData.data)
                    } catch (_) {
                        alert('Ocurrió un error al conectarse a la base de datos, por favor inténtelo de nuevo más tarde')
                        setProducts(null)
                    }
                }
                getProduct()
            }
        }
        setProducts('loading')
        getProductsFromCategory()
    }, [category])

    React.useEffect(() => {
        const getProductsFromCategory = async _ => {
            if (location || dates) {
                try {
                    const getProductsUrl = dates ? 'http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/products/date-filter' : `http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/products/list/city-${location}`
                    const paramsConfig = { params: {} }

                    if (dates && dates.length && dates.length === 2) {
                        const [from, to] = dates
                        
                        paramsConfig.params.inicio = from
                        paramsConfig.params.fin = to

                        if (location) {
                            paramsConfig.params.ciudad = location
                        }
                    }

                    if (dates) {
                        const productsData = await axios.get(getProductsUrl, paramsConfig)
                        setProducts(productsData.data)
                    } else {
                        const productsData = await axios.get(getProductsUrl)
                        setProducts(productsData.data)
                    }
                } catch (error) {
                    if (error.message === 'Request failed with status code 404') {
                        setProducts('404')
                    } else {
                        alert('Ocurrió un error al conectarse a la base de datos, por favor inténtelo de nuevo más tarde')
                        setProducts(null)
                    }
                }
            }
        }
        setProducts('loading')
        getProductsFromCategory()
    }, [location, dates])

    return !products || products === 'loading' ? (
        <></>
    ) : products === '404' ? <h2 style={{ margin: '30px', color: '#383B58' }}>No se encontraron los productos solicitados</h2> : (
        <div className="recomendations"> 
            <h2>Recomendaciones</h2>
            <div className="recomendation-content">
                {products.map(auto => {
                    return <RecomendationCard key={auto.id} car={auto} />
                })}
            </div>
        </div>
    )
}

export default Recomendations