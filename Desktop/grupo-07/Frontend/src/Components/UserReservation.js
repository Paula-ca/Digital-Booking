import React from "react";
import axios from "axios";
import moment from "moment";
import { Navigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Switch from "react-switch";

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const reservationStatus = (fromDate, toDate) => {
  const now = moment();
  const momentFrom = moment(fromDate);
  const momentTo = moment(toDate);
  if (now.isBefore(momentFrom)) {
    return "pendiente";
  } else if (momentTo.isAfter(now)) {
    return "en progreso";
  } else {
    return "completada";
  }
};

const NotLoggedIn = (_) => {
  alert("Por favor, iniciá sersión para ver tus reservas");
  return <Navigate to="/login" />;
};

const NoReservations = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 140px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="bookingCard-container"
    >
      <div style={{ padding: "24px 0 36px 0" }} className="booking-card">
        <FontAwesomeIcon
          icon={faCircleXmark}
          style={{ fontSize: "64px", color: "#b81111" }}
        />
        <h2 style={{ marginTop: 0, color: "#383B58" }}>
          Aún no has efectuado ninguna reserva.
        </h2>
        <Link to={"/"}>
          <button
            style={{ maxHeight: "54px" }}
            className="successfulBooking-button"
          >
            Volver al inicio
          </button>
        </Link>
      </div>
    </div>
  );
};

const ReservationError = () => {
    return (
      <div
        style={{
          height: "calc(100vh - 140px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="bookingCard-container"
      >
        <div style={{ padding: "24px 0 36px 0" }} className="booking-card">
          <FontAwesomeIcon
            icon={faCircleXmark}
            style={{ fontSize: "64px", color: "#b81111" }}
          />
          <h2 style={{ marginTop: 0, color: "#383B58" }}>
            Ocurrió un error al obtener tus reservas.
          </h2>
          <Link to={"/"}>
            <button
              style={{ maxHeight: "54px" }}
              className="successfulBooking-button"
            >
              Volver al inicio
            </button>
          </Link>
        </div>
      </div>
    );
  };

const ReservationCards = ({ reservationsData, reservationsAreCanceled, navigate, logout }) => {
  const cancelReservation = (reservationId) => {
    if (reservationId) {
      const token = localStorage.getItem('token')
      const confirmation = window.confirm("¿Estás seguro/a de querer cancelar la reserva? Esta acción no puede deshacerse")
      if (confirmation && token) {
        const cancelReservation = async _ => {
          const cancelBookingBaseUrl = 'http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/bookings/cancel'
          try {
            const cancelApiResponse = await axios.delete(`${cancelBookingBaseUrl}/${reservationId}`, { headers: { 'Authorization': `Bearer ${token}` } })
            if (cancelApiResponse && cancelApiResponse.data) {
              alert("Su reserva fue cancelada con éxito")
            }
          } catch (error) {
            if (error.response && error.response.status && error.response.status === 401) {
              logout()
              alert("Tu sesión caducó, por favor iniciá sesión nuevamente para poder realizar una cancelación")
              navigate('/login')
            } else {
              alert("Ocurrió un error al cancelar su reserva")
              console.log(error);
            }
          } finally {
            window.location.reload()
          }
        }
        cancelReservation()
      }
    }
    
  }
  
  return (
    <div className="reservationWrapper" style={{minHeight: "calc(100vh - 250px)"}}>
      {
        reservationsData.map((reservation) => {
          const status = reservationsAreCanceled ? 'cancelada' : reservationStatus(
            reservation.fecha_ingreso,
            reservation.fecha_final
          )
        return (
          <div key={reservation.id} className="reservationCard">
            <div className="reservation-info">
              <p>Estado: {status}</p>
              <p>
                Desde:{" "}
                {reservation.fecha_ingreso.split("-").reverse().join("/")}
              </p>
              <p>
                Hasta:{" "}
                {reservation.fecha_final.split("-").reverse().join("/")}
              </p>
              <p>Ciudad: {reservation.producto.ciudad.titulo}</p>
              
            </div>
            <div className="reservation-car">
              <img
                style={{ width: "100%"}}
                src={reservation.producto.imagenes[0].url}
                alt={reservation.producto.imagenes[0].titulo}
              />
              <p>Vehículo: {reservation.producto.titulo}</p>
              { !reservationsAreCanceled && status && status === 'pendiente' ? <button style={{ width: '80%', height: '32px', backgroundColor: '#b81111', color: '#F3F1ED', borderRadius: '5px', border: '0', cursor: 'pointer' }} onClick={_ => cancelReservation(reservation.id)}>Cancelar reserva</button> : <></>}
            </div>
          </div>
        );
      })}
    </div>
  )
}
  

const Reservations = ({ userReservations, userCanceledReservations, navigate, logout }) => {
  const [showCanceledReservations, setShowCanceledReservations] = React.useState(!userReservations || !userReservations.length ? true : false)

  return (
    <div>
      {
        (
          !userReservations || !userReservations.length) && (!userCanceledReservations || !userCanceledReservations.length) ?
          <NoReservations />
          : (
              <>
                {
                  userReservations && userReservations.length && userCanceledReservations && userCanceledReservations.length ? (
                    <div style={{ padding: '20px' }}>
                      <h2 style={{ margin: '10px 0px', color: '#383B58' }}>Mostrar reservas canceladas</h2>
                      <Switch checked={showCanceledReservations} onChange={_ => setShowCanceledReservations(!showCanceledReservations)}/>
                    </div>
                  ) : <></>
                }
                <ReservationCards reservationsData={(userReservations && userReservations.length && userCanceledReservations && userCanceledReservations.length) ? showCanceledReservations ? userCanceledReservations : userReservations : (userReservations && userReservations.length) ? userReservations : userCanceledReservations} reservationsAreCanceled={showCanceledReservations} navigate={navigate} logout={logout} />
              </>
            )
      }
    </div>
  );
};

const UserReservation = (_) => {
  const navigate = useNavigate()
  const { logout } = React.useContext(UserContext)
  const [userReservations, setUserReservations] = React.useState();
  const [userCanceledReservations, setUserCanceledReservations] = React.useState();
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (user && user.id && token) {
      const getReservationsFromUser = async (_) => {
        const url =
          "http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/bookings/user";

        try {
          // First getting active reservations
          const getUserReservationsResponse = await axios.get(
            `${url}/${user.id}/false`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (getUserReservationsResponse && getUserReservationsResponse.data) {
            setUserReservations(
              getUserReservationsResponse.data.sort(
                (a, b) =>
                  moment(a.fecha_ingreso).format("YYYYMMDD") -
                  moment(b.fecha_ingreso).format("YYYYMMDD")
              )
            );
          }

          // Then get the canceled reservations
          const getUserCanceledReservationsResponse = await axios.get(
            `${url}/${user.id}/true`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (getUserCanceledReservationsResponse && getUserCanceledReservationsResponse.data) {
            setUserCanceledReservations(
              getUserCanceledReservationsResponse.data.sort(
                (a, b) =>
                  moment(a.fecha_ingreso).format("YYYYMMDD") -
                  moment(b.fecha_ingreso).format("YYYYMMDD")
              )
            );
          }
        } catch (error) {
          if (error.response && error.response.status && error.response.status === 401) {
            logout()
            alert("Tu sesión caducó, por favor iniciá sesión nuevamente para ver tus reservas")
            navigate('/login')
          } else {
            console.log("Error", error);
            setUserReservations("Error")
          }
        }
      };
  
      getReservationsFromUser();
    }
  }, []);

  return !user ? (
    <NotLoggedIn />
  ) : !userReservations || !userCanceledReservations ? (
    <div>Estamos cargando tus reservas</div>
  ) : userReservations === "Error" ? <ReservationError/> : (
    <Reservations userReservations={userReservations} userCanceledReservations={userCanceledReservations} navigate={navigate} logout={logout} />
  );
};

export default UserReservation;
