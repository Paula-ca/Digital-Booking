import React, { useState } from "react";
import axios from "axios";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";

import {
  faAngleLeft,
  faMapMarkerAlt,
  faStar,
  faXmarkCircle,
  faSnowflake,
  faMapPin,
  faGears,
  faA,
  faPaw,
  faBriefcase,
  faChargingStation,
  faBabyCarriage,
  faLocationCrosshairs,
  faCar,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Carousel } from "react-responsive-carousel";

import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/teal.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import moment from "moment";
import UserContext from "../Context/UserContext";

const googleMapsApiKey = "AIzaSyBBWi1z6QvOexGyBW_lI_HGkVno6AFkzAE";
const capitalizeFirstLetter = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const gregorian_en = {
  name: "gregorian_es",
  months: [
    ["Enero", "ene"],
    ["Febrero", "feb"],
    ["Marzo", "mar"],
    ["Abril", "abr"],
    ["Mayo", "may"],
    ["Junio", "jun"],
    ["Julio", "jul"],
    ["Agosto", "ago"],
    ["Septiembre", "sep"],
    ["Octubre", "oct"],
    ["Noviembre", "nov"],
    ["Diciembre", "dic"],
  ],
  weekDays: [
    ["sábado", "s"],
    ["domingo", "d"],
    ["lunes", "l"],
    ["martes", "m"],
    ["miércoles", "x"],
    ["jueves", "j"],
    ["viernes", "v"],
  ],
  digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  meridiems: [
    ["AM", "am"],
    ["PM", "pm"],
  ],
};

const iconNameToIcon = (icon) => {
  switch (icon) {
    case 'faSnowflake':
      return faSnowflake
    case 'faMapPin':
      return faMapPin
    case 'faGears':
      return faGears
    case 'faA':
      return faA
    case 'faPaw':
      return faPaw
    case 'faBriefcase':
      return faBriefcase
    case 'faChargingStation':
      return faChargingStation
    case 'faBabyCarriage':
      return faBabyCarriage
    case 'faLocationCrosshairs':
      return faLocationCrosshairs
    default:
      return faCar
  }
}

const RatingToStars = (props) => {
  const toReturn = [];
  const { rating } = props;

  for (let index = 0; index < rating; index++) {
    toReturn.push(
      <FontAwesomeIcon
        key={index}
        className="fa-solid recomendation-star"
        icon={faStar}
      />
    );
  }

  return <>{toReturn.map((component) => component)}</>;
};

const ratingToText = (rating) => {
  if (rating === 5) {
    return "Excelente";
  } else if (rating >= 4) {
    return "Muy bueno";
  } else if (rating >= 3) {
    return "Bueno";
  } else {
    return "Ok";
  }
};

const categoryToSubtitle = (category) => {
  if (category === "Económico") {
    return "Ahorrá sin compromisos con";
  } else if (category === "De lujo") {
    return "Date un gustito con";
  } else if (category === "Utilitario") {
    return "Hacé todo lo que necesites y más con";
  } else {
    return "Derrapá con";
  }
};

const ProductDetailTop = (props) => {
  const { product } = props;
  const { user } = React.useContext(UserContext)
  const navigate = useNavigate()
  
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: "5px",
      }}
      className="product-detail-top"
    >
      <div style={{ display: 'flex' }}>
        <div>
          <h3 style={{ color: "#545776", margin: 0 }}>
            {capitalizeFirstLetter(product.categoria.titulo)}
          </h3>
          <h2 style={{ margin: 0 }}>{capitalizeFirstLetter(product.titulo)}</h2>
        </div>
        {
          user && user.rol && (user.rol === 'ROLE_SUPER_ADMIN' || user.rol === 'ROLE_ADMIN') ? <FontAwesomeIcon onClick={_ => navigate(`/administration?productId=${product.id}`)} icon={faEdit} style={{ cursor: 'pointer', fontSize: '32px', alignSelf: 'center', marginLeft: '16px', marginTop:'16px', color: '#1DBEB4' }}/> : <></>
        }
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to={"/"}>
          <FontAwesomeIcon
            style={{ color: "#545776" }}
            className="fa-solid"
            icon={faAngleLeft}
            size="3x"
          />
        </Link>
      </div>
    </div>
  );
};

const ProductDetailTopLocation = (props) => {
  const { product } = props;

  return (
    <div
      style={{
        marginBottom: "10px",
        backgroundColor: "#545776",
        borderRadius: "5px",
        color: "#F3F1ED",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
        {`${product.ciudad.titulo}, ${product.ciudad.pais}`}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <p style={{ margin: 0 }}>{ratingToText(product.rating)}</p>
          <RatingToStars rating={product.rating} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            color: "#545776",
            backgroundColor: "#F3F1ED",
            padding: "5px",
            marginLeft: "10px",
            width: "32px",
            fontSize: "24px",
          }}
        >
          <div>{product.rating}</div>
        </div>
      </div>
    </div>
  );
};

const PhotoCarousel = (props) => {
  const { product } = props;
  // const product = autos[0]
  return (
    <>
      <div>
        <Carousel
          className={props.mainCarousel && "main-carousel"}
          statusFormatter={(currentItem, total) => `${currentItem} de ${total}`}
          autoPlay={true}
          style={{ marginTop: "20px", borderRadius: "100px" }}
          dynamicHeight={true}
          emulateTouch={true}
          infiniteLoop={true}
        >
          {product.imagenes.map((photo, index) => {
            return (
              <div key={photo.id}>
                <img src={photo.url} />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

const PhotoGallery = (props) => {
  const [openImage, setOpenImage] = useState(false);
  const { product } = props;
  
  return (
    <>
      <div className="photo-gallery" style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
          }}
        >
          <img
            style={{
              boxShadow:
                "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
              width: "90%",
              borderRadius: "8px",
            }}
            src={product.imagenes[0].url}
          />
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {product.imagenes.slice(0, 5).map(
            (photo, index) =>
              index >= 1 && (
                <img
                  style={{
                    boxShadow:
                      "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                    width: "45%",
                    height: "45%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  key={photo.id}
                  src={photo.url}
                />
              )
          )}
        </div>
      </div>
      {!openImage && product.imagenes && product.imagenes.length > 4 && (
        <div
          onClick={(_) => setOpenImage(!openImage)}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            position: "absolute",
            right: "36px",
          }}
        >
          Ver más
        </div>
      )}
      {openImage && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            opacity: !openImage ? 0 : 1,
            zIndex: 6
          }}
        >
          <div style={{ width: "80%", height: "80%" }}>
            {/* <PhotoCarousel className='carousel-display-all-photos' product={product} /> */}
            <Carousel
              className="carousel-display-all-photos"
              statusFormatter={(currentItem, total) =>
                `${currentItem} de ${total}`
              }
              style={{ marginTop: "20px", borderRadius: "100px" }}
              dynamicHeight={true}
              emulateTouch={true}
              infiniteLoop={true}
            >
              {product.imagenes.map((photo) => {
                return (
                  <div key={photo.id}>
                    <img src={photo.url} />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      )}
      {openImage && (
        <FontAwesomeIcon
          onClick={(_) => setOpenImage(!openImage)}
          style={{
            color: "#383B58",
            backgroundColor: "#F3F1ED",
            borderRadius: "50%",
            cursor: "pointer",
            position: "fixed",
            top: "5%",
            right: "5%",
            zIndex: 10
          }}
          size="2x"
          icon={faXmarkCircle}
        />
      )}
    </>
  );
};

const ProductDetailDescription = (props) => {
  const { product } = props;
  // const product = autos[0]

  return (
    <div>
      <h2 style={{ color: "#383B58" }}>
        {categoryToSubtitle(product.categoria.titulo)} {product.titulo}
      </h2>
      <p>{product.descripcion}</p>
    </div>
  );
};

export const ProductCharacteristics = (props) => {
  const { product } = props;
  // const product = autos[0]

  return (
    <div>
      <h3 style={{ margin: 0, color: "#383B58" }}>
        ¿Qué ofrece este vehículo?
      </h3>
      <hr style={{ height: "1px", backgroundColor: "#1DBEB4", border: "0" }} />
      <div className="product-detail-offer">
        {product.caracteristicas.map((characteristic) => {
          return <div key={characteristic.id}><FontAwesomeIcon style={{ color:'#1DBEB4' }} icon={iconNameToIcon(characteristic.icono)}/> {characteristic.titulo}</div>;
        })}
      </div>
    </div>
  );
};

const BookingCalendar = ({ date, setDate, disabledDates }) => {
  let fromDate, toDate;
  const minDate = new Date()

  const handleChange = (inputDate) => {
    setDate(inputDate);
  };

  if (date && date.length) {
    [fromDate, toDate] = date;
  }

  return (
    <div
      className="product-detail-calendar-reservation"
      style={{ width: "100%", display: "flex" }}
    >
      <Calendar
        mapDays={({date}) => {
          for (let index = 0; index < disabledDates.length; index++) {
            const { from, to } = disabledDates[index]
            if (date >= from && date <= to) {
              return {
                disabled: true,
                style: { color: "#ccc" }
              }
            }
          }
        }}
        format="DD/MM/YYYY"
        range={true}
        locale={gregorian_en}
        numberOfMonths={2}
        onChange={handleChange}
        selectsRange={true}
        disableYearPicker
        className="teal"
        containerStyle={{ width: "100% " }}
        style={{ width: "100%", zIndex: 1 }}
        minDate={minDate}
        readOnly
      />
    </div>
  );
};

export const CalendarAvailability = (props) => {
  const { product } = props;
  const [date, setDate] = useState(new Date());
  const [disabledDates, setDisabledDates] = React.useState('loading')

  React.useEffect(() => {
    const getDisabledDates = async _ => {
      const getDisabledDatesUrl = `http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/bookings/product/${product.id}/false`
      try {
        const disabledDatesResponse = await axios.get(getDisabledDatesUrl)
        if (disabledDatesResponse && disabledDatesResponse.data) {
          await setDisabledDates(disabledDatesResponse.data.map(dates => { return { from: moment(dates.fecha_ingreso).utcOffset(0).set({ hour: 0, minute: 0, second: 0}).toDate(), to: moment(dates.fecha_final).utcOffset(0).set({ hour: 23, minute: 59, second: 59}).toDate() }}))
        }
      } catch (_) {
        // Do nothing
      }
    }
    getDisabledDates()
  }, [])

  return (disabledDates && disabledDates !== 'loading') ? (
    <div>
      <h3 style={{ color: "#383B58" }}>Fechas disponibles</h3>
      <div
        className="select-date-product-detail"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div
          className="calendar-wrapper-product-detail"
          style={{ width: "55%", justifyContent: "center", display: "flex" }}
        >
          {<BookingCalendar disabledDates={disabledDates} date={date} setDate={setDate} />}
        </div>
        <div
          className="select-date-submit-wrapper"
          style={{
            boxShadow:
              "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
            border: "1px solid #000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "50%",
            backgroundColor: "white",
            borderRadius: "5px",
            padding: "36px",
          }}
        >
          <p>Agregá tus fechas de viaje para obtener precios exactos</p>
          <Link
            style={{
            cursor: "pointer",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "#1DBEB4",
            width: "50%",
            padding: "12px",
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
            }}
              to={`/reservation/${product.id}`}
          >
            Iniciar reserva
          </Link>
        </div>
      </div>
    </div>
  ) : <></>
};

const ProductLocationMap = (props) => {
  const { center } = props;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback((_) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        boxShadow:
          "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
        borderRadius: "5px",
        width: "100%",
        height: "400px",
      }}
      center={center}
      zoom={15}
      defaultZoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} draggable={false} />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export const ProductLocation = (props) => {
  const { product } = props;
  const [lat, lng] = product.coordenadas.split(',')

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <h4>¿Dónde se encuentra?</h4>
      <hr style={{ height: "1px", backgroundColor: "#1DBEB4", border: "0" }} />
      <p>
        {product.ubicacion}, {product.ciudad.titulo}
      </p>
      <ProductLocationMap center={{ lat: parseFloat(lat), lng: parseFloat(lng) }} />
    </div>
  );
};

export const ProductPolicies = (props) => {
  const { product } = props;
  // const product = autos[0]
  const normas = []
  const saludSeguridad = []
  const cancelacion = []

  if (product.politicas && product.politicas.length) {
    product.politicas.forEach(politica => {
      if (politica.titulo === 'Normas') {
        normas.push(politica)
      } else if (politica.titulo === 'Salud y seguridad') {
        saludSeguridad.push(politica)
      } else if (politica.titulo === 'Política de cancelación') {
        cancelacion.push(politica)
      }
    })
  }

  return product.politicas && product.politicas.length ? (
    <div style={{ marginTop: "10px" }}>
      <h3 style={{ margin: 0, color: "#383B58" }}>Qué tenés que saber</h3>
      <hr style={{ height: "1px", backgroundColor: "#1DBEB4", border: "0" }} />
      <div className="product-detail-policies">
        <div>
          {
            (normas && normas.length && <>
              <h4>Normas reglamentarias</h4>
              {
                normas.map(politica => <p>{politica.descripcion}</p>)
              }
            </>) || <></>
          }
        </div>
        <div>
          {
            (saludSeguridad && saludSeguridad.length && <>
              <h4>Salud y seguridad</h4>
              {
                saludSeguridad.map(politica => <p>{politica.descripcion}</p>)
              }
            </>) || <></>
          }
        </div>
        <div>
          {
            (cancelacion && cancelacion.length && <>
              <h4>Política de cancelación</h4>
              {
                cancelacion.map(politica => <p>{politica.descripcion}</p>)
              }
            </>) || <></>
          }
        </div>
      </div>
    </div>
  ) : <></>;
};

const ProductDetail = (_) => {
  const { productId } = useParams();
  const [product, setProduct] = React.useState("loading");

  React.useEffect(() => {
    const getProduct = async (_) => {
      try {
        const productData = await axios.get(
          `http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/products/${productId}`
        );
        setProduct(productData.data);
      } catch (_) {
        alert(
          "Ocurrió un error al conectarse a la base de datos, por favor inténtelo de nuevo más tarde"
        );
        setProduct(null);
      }
    };
    getProduct();
  }, []);

  return (
    <div className="product-detail">
      {!product ? (
        <Navigate to={"/"} />
      ) : product === "loading" ? (
        <></>
      ) : (
        <>
          <ProductDetailTop product={product} />
          <ProductDetailTopLocation product={product} />
          <PhotoCarousel mainCarousel={true} product={product} />
          <PhotoGallery product={product} />
          <ProductDetailDescription product={product} />
          <ProductCharacteristics product={product} />
          <CalendarAvailability product={product} />
          <ProductLocation product={product} />
          <ProductPolicies product={product} />
        </>
      )}
    </div>
  );
};

export default ProductDetail;
