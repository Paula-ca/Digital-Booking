import React from "react"
import axios from 'axios'

const imagenes = [
    'https://sx-content-labs.sixt.io/Media/2fleet-350x200/kia-rio-4d-weiss-2018.png',
    'https://dealerimages.dealereprocess.com/image/upload/c_limit,f_auto,fl_lossy,w_600/v1/svp/dep/20bmwm8/bmw_20m8_angularfront_white',
    'https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/cr/model-years/12857-2021-mercedes-benz-s-class',
    'https://i.pinimg.com/originals/17/d7/e7/17d7e7a9275103b8d32497ba53270b80.png'
]

const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1)

const Categorias = (props) => {
    const [categorias, setCategorias] = React.useState()
    const { categoryFilter, setCategoryFilter } = props

    React.useEffect(() => {
        const getCities = async _ => {
            try {
                const categoriasData = await axios.get('http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/categories/list/false')
                setCategorias(categoriasData.data)
            } catch (_) {
                alert('Ocurrió un error al conectarse a la base de datos, por favor inténtelo de nuevo más tarde')
            }
        }
        getCities()
    }, [])

    const updateCategoryFilter = async (categoryId) => {
        if (categoryId === categoryFilter) {
            setCategoryFilter(null)
        } else {
            setCategoryFilter(categoryId)
        }
    }

    return !categorias || !categorias.length ? (
        <></>
    ) : (
        <div className="category-field">
            <h2>Buscá por categoría</h2>
            <div className="card-wrapper">
                {
                    categorias.map((categoria, index) => {
                        return (
                            <div style={categoryFilter === categoria.id ? { background: '#545776', color: 'white' } : {}} onClick={_ => updateCategoryFilter(categoria.id)} key={categoria.id} className="card">
                                <div className="card-body">
                                    <img src={imagenes[index]} className="card-image" alt="card-name" />
                                    <h2 className="card-title">{categoria.titulo.split(' ').map(word => capitalizeFirstLetter(word)).join(' ')}</h2>
                                    <p className="card-description">{categoria.descripcion.charAt(0).toUpperCase() + categoria.descripcion.slice(1)}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Categorias 
