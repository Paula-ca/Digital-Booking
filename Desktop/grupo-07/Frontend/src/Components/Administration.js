import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  faAngleLeft,
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
  faSquarePlus,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../Context/UserContext";

const googleMapsApiKey = "AIzaSyBBWi1z6QvOexGyBW_lI_HGkVno6AFkzAE";

const iconNameToIcon = (icon) => {
  switch (icon) {
    case "Aire acondicionado":
      return faSnowflake;
    case "Transmision manual":
      return faMapPin;
    case "Transmisión manual":
      return faMapPin;
    case "Transmision automatica":
      return faGears;
    case "Transmisión automática":
      return faGears;
    case "Airbag":
      return faA;
    case "Amigable con las mascotas":
      return faPaw;
    case "2 valijas":
      return faBriefcase;
    case "Motor eléctrico":
      return faChargingStation;
    case "Con butaca para bebés":
      return faBabyCarriage;
    case "GPS integrado":
      return faLocationCrosshairs;
    default:
      return faCar;
  }
};

const ProductAdministrationTop = (_) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "5px",
      }}
      className="product-detail-top"
    >
      <div>
        <h2 style={{ color: "#545776", margin: 0 }}>Administración</h2>
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

const ProductAdministrationForm = (props) => {
  const navigate = useNavigate();
  const { logout } = React.useContext(UserContext);
  const { productCategories, cities, characteristics, policies } = props;
  const product = props.product || null;
  const [sendingInformation, setSendingInformation] = React.useState(false);

  // Basic info
  const [productName, setProductName] = React.useState(
    product && product.titulo ? product.titulo : null
  );
  const [productAddress, setProductAddress] = React.useState(
    product && product.ubicacion ? product.ubicacion : null
  );
  const originalProductAddress = product && product.ubicacion ? `${product.ubicacion}` : null
  const [productCategory, setProductCategory] = React.useState(
    product && product.categoria && product.categoria.id
      ? product.categoria.id
      : null
  );
  const [productCity, setProductCity] = React.useState(
    product && product.ciudad && product.ciudad.id ? product.ciudad.id : null
  );
  const [productDescription, setProductDescription] = React.useState(
    product && product.descripcion ? product.descripcion : null
  );

  // Product attributes
  const [selectedAttribute, setSelectedAttribute] = React.useState();
  const [productAttributes, setProductAttributes] = React.useState(
    product && product.caracteristicas
      ? product.caracteristicas.map((caracteristica) =>
          caracteristica.titulo.trim()
        )
      : []
  );

  // Product policies - house rules
  const [productHouseRules, setProductHouseRules] = React.useState(
    product && product.politicas && product.politicas.length
      ? product.politicas
          .filter((politica) => politica.titulo.trim() === "Normas")
          .map((policy) => policy.id)
      : []
  );
  const [houseRules, setHouseRules] = React.useState(
    policies && policies.length
      ? policies.filter(
          (policy) =>
            policy.titulo.trim() === "Normas" &&
            productHouseRules.indexOf(policy.id) === -1
        )
      : []
  );
  const [selectedHouseRule, setSelectedHouseRule] = React.useState();

  // Product policies - health and security
  const [productHealthSecurity, setProductHealthSecurity] = React.useState(
    product && product.politicas && product.politicas.length
      ? product.politicas
          .filter((politica) => politica.titulo.trim() === "Salud y seguridad")
          .map((policy) => policy.id)
      : []
  );
  const [healthSecurities, setHealthSecurities] = React.useState(
    policies && policies.length
      ? policies.filter(
          (policy) =>
            policy.titulo.trim() === "Salud y seguridad" &&
            productHealthSecurity.indexOf(policy.id) === -1
        )
      : []
  );
  const [selectedHealthSecurity, setSelectedHealthSecurity] = React.useState();

  // Product policies - cancelation
  const [productCancelationPolicy, setProductCancelationPolicy] =
    React.useState(
      product && product.politicas && product.politicas.length
        ? product.politicas
            .filter(
              (politica) => politica.titulo.trim() === "Política de cancelación"
            )
            .map((policy) => policy.id)
        : []
    );
  const [cancelationPolicies, setCancelationPolicies] = React.useState(
    policies && policies.length
      ? policies.filter(
          (policy) =>
            policy.titulo.trim() === "Política de cancelación" &&
            productCancelationPolicy.indexOf(policy.id) === -1
        )
      : []
  );
  const [selectedCancelationPolicy, setSelectedCancelationPolicy] =
    React.useState();

  // Product images
  const [images, setImages] = React.useState(
    product && product.imagenes && product.imagenes.length
      ? product.imagenes
      : []
  );
  const [imageToAdd, setImageToAdd] = React.useState();
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const addAttribute = (_) => {
    if (selectedAttribute) {
      if (productAttributes.indexOf(selectedAttribute) === -1) {
        setProductAttributes((attributes) => [
          ...attributes,
          selectedAttribute,
        ]);
      } else {
        alert("Ya agregaste este atributo");
      }
    } else {
      alert("Por favor, elegí un producto");
    }
  };

  const removeAttribute = (attribute) => {
    setProductAttributes(
      productAttributes.filter(
        (productAttribute) => productAttribute !== attribute
      )
    );
  };

  const addHouseRule = (_) => {
    if (selectedHouseRule) {
      const policyObject = JSON.parse(selectedHouseRule);
      setProductHouseRules((productHouseRules) => [
        ...productHouseRules,
        policyObject.id,
      ]);
      setHouseRules(
        houseRules.filter((policy) => policy.id !== policyObject.id)
      );
      setSelectedHouseRule(null);
    } else {
      alert("Por favor, elegí una regla de la casa para agregar");
    }
  };
  const addHealthSecurity = (_) => {
    if (selectedHealthSecurity) {
      const policyObject = JSON.parse(selectedHealthSecurity);
      setProductHealthSecurity((productHealthSecurity) => [
        ...productHealthSecurity,
        policyObject.id,
      ]);
      setHealthSecurities(
        healthSecurities.filter((policy) => policy.id !== policyObject.id)
      );
      setSelectedHealthSecurity(null);
    } else {
      alert("Por favor, elegí una política de salud y seguridad para agregar");
    }
  };
  const addCancelationPolicy = (_) => {
    if (selectedCancelationPolicy) {
      const policyObject = JSON.parse(selectedCancelationPolicy);
      setProductCancelationPolicy((productCancelationPolicy) => [
        ...productCancelationPolicy,
        policyObject.id,
      ]);
      setCancelationPolicies(
        cancelationPolicies.filter((policy) => policy.id !== policyObject.id)
      );
      selectedCancelationPolicy(null);
    } else {
      alert("Por favor, elegí una política de cancelación para agregar");
    }
  };
  const removePolicy = ({ id }, policyType) => {
    switch (policyType) {
      case "house_rule":
        setProductHouseRules((productHouseRules) =>
          productHouseRules.filter((policyId) => policyId !== id)
        );
        setHouseRules((houseRules) => [
          ...houseRules,
          policies.find((policy) => policy.id === id),
        ]);
        break;
      case "health_safety":
        setProductHealthSecurity((productHealthSecurity) =>
          productHealthSecurity.filter((policyId) => policyId !== id)
        );
        setHealthSecurities((healthSecurities) => [
          ...healthSecurities,
          policies.find((policy) => policy.id === id),
        ]);
        break;
      case "cancelation":
        setProductCancelationPolicy((productCancelationPolicy) =>
          productCancelationPolicy.filter((policyId) => policyId !== id)
        );
        setCancelationPolicies((cancelationPolicies) => [
          ...cancelationPolicies,
          policies.find((policy) => policy.id === id),
        ]);
        break;
      default:
        // Do nothing
        break;
    }
  };

  const removeImage = (imageUrl) => {
    setImages(images.filter((image) => image.url !== imageUrl));
  };

  const addImage = (e) => {
    e.preventDefault();

    if (imageToAdd) {
      if (imageToAdd.match(urlRegex)) {
        if (images.length >= 6) {
          alert(
            "Solo se permiten hasta 6 imágenes. Por favor, borrá una antes de agregar otra"
          );
        } else {
          const sameUrlImage = images.filter(
            (image) => image.url === imageToAdd
          ).length;
          if (sameUrlImage) {
            alert("Ya agregaste una imagen con esa URL");
          } else {
            setImages((images) => [
              ...images,
              { url: imageToAdd, titulo: "foto" },
            ]);
          }
        }
      } else {
        alert("Por favor, ingresá una url válida");
      }
    } else {
      alert("Por favor, ingresá la url de la imagen a agregar");
    }
  };
  const submitForm = async (event) => {
    event.preventDefault();
    setSendingInformation(true);
    const allProductPolicies = productCancelationPolicy
      .concat(productHouseRules)
      .concat(productHealthSecurity)
      .map((policy) => {
        return { id: policy };
      });

    if (
      productAddress &&
      productName &&
      productCategory &&
      productCity &&
      productDescription &&
      productAttributes &&
      productAttributes.length &&
      images &&
      images.length &&
      allProductPolicies &&
      allProductPolicies.length
    ) {
      const characteristicsToReturn = [];
      productAttributes.forEach((attribute) => {
        const characteristicData = characteristics.find(
          (characteristic) => characteristic.titulo.trim() === attribute
        );

        if (characteristicData) {
          characteristicsToReturn.push({ id: characteristicData.id });
        }
      });

      let latitude, longitude
      let checkedLocation = false
      if (productAddress && productAddress !== originalProductAddress) {
        const cityData = cities.find((city) => {
          return city.id === parseInt(productCity)
        });
        try {
          const getCoordinates = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${`${productAddress}, ${cityData.titulo}, Argentina`}&key=${googleMapsApiKey}`
          )
  
          if (getCoordinates.data && getCoordinates.data.results && getCoordinates.data.results[0] && getCoordinates.data.results[0].geometry && getCoordinates.data.results[0].geometry.location.lat && getCoordinates.data.results[0].geometry.location.lng) {
            latitude = getCoordinates.data.results[0].geometry.location.lat
            longitude = getCoordinates.data.results[0].geometry.location.lng
            checkedLocation = true
          } else {
            alert("Ocurrió un error al localizar la dirección, por favor ingresala con más especificidad")
            setSendingInformation(false)
          }
        } catch (error) {
          console.log("error", error)
          alert("Ocurrió un error al obtener la ubicación. Por favor, volvé a intentarlo más tarde")
          setSendingInformation(false)
        }
      } else {
        checkedLocation = true
      }

      const productPayload = {
        titulo: productName,
        descripcion: productDescription,
        disponibilidad: true,
        ubicacion: productAddress,
        ciudad: { id: productCity },
        categoria: { id: productCategory },
        imagenes: images,
        caracteristicas: characteristicsToReturn,
        politicas: allProductPolicies,
      };

      if (latitude && longitude) {
        productPayload.coordenadas = `${latitude},${longitude}`
      }

      const token = localStorage.getItem("token");
      if (checkedLocation) {
        if (product) {
          const url =
            "http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/products/update";
          productPayload.id = product.id;
          console.log(
            "update productPayload",
            JSON.stringify(productPayload, null, 4)
          );
          try {
            const updateProduct = await axios.put(url, productPayload, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (updateProduct.status === 200) {
              navigate("/productUpdated");
            }
          } catch (error) {
            if (
              error.response &&
              error.response.status &&
              error.response.status === 401
            ) {
              logout();
              alert(
                "Tu sesión caducó, por favor iniciá sesión nuevamente para poder modificar un producto"
              );
              navigate("/login");
            } else {
              console.log(error);
              setSendingInformation(false);
              alert("Ocurrió un error al guardar la información");
            }
          }
        } else {
          const url =
            "http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/products/add";
          console.log(
            "create productPayload",
            JSON.stringify(productPayload, null, 4)
          );
          try {
            const createProduct = await axios.post(url, productPayload, {
              headers: { Authorization: `Bearer ${token}` },
            });
            console.log("response", createProduct);
            if (createProduct.status === 200) {
              navigate("/productCreated");
            }
          } catch (error) {
            if (
              error.response &&
              error.response.status &&
              error.response.status === 401
            ) {
              logout();
              alert(
                "Tu sesión caducó, por favor iniciá sesión nuevamente para poder crear un producto"
              );
              navigate("/login");
            } else {
              console.log(error);
              setSendingInformation(false);
              alert("Ocurrió un error al guardar la información");
            }
          }
        }
      }
    } else {
      setSendingInformation(false);
      alert("Completá todos los datos");
    }
  };

  return (
    <div>
      <h2 style={{ color: "#383B58" }}>Crear producto</h2>
      <form
        onSubmit={submitForm}
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "5px",
          width: "calc(100%-20px)",
          boxShadow:
            "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
        }}
      >
        <div className="product-administration-detail">
          <div className="productAdministration-inputWrapper">
            <div className="productAdministration-input">
              <label htmlFor="product-name" className="productData-label">
                Nombre
              </label>
              <input
                placeholder="Nombre"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                id="product-name"
                type={"text"}
                className="productData"
              />
            </div>
            <div className="productAdministration-input">
              <label htmlFor="product-category" className="productData-label">
                Categoría
              </label>
              <select
                onChange={(e) => setProductCategory(e.target.value)}
                placeholder="Categoría"
                id="product-category"
                className="productData"
              >
                {!product && (
                  <option value="" selected hidden>
                    Categoría
                  </option>
                )}
                {productCategories.map((category) => (
                  <option
                    selected={
                      product &&
                      product.categoria &&
                      product.categoria.titulo &&
                      product.categoria.titulo === category.titulo
                    }
                    key={category.id}
                    value={category.id}
                  >
                    {category.titulo}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="productAdministration-inputWrapper">
            <div className="productAdministration-input">
              <label htmlFor="product-city" className="productData-label">
                Ciudad
              </label>
              <select
                defaultValue={productCity && cities.find(city => city.id === productCity) ? cities.find(city => city.id === productCity).id : null}
                onChange={(e) => setProductCity(e.target.value)}
                id="product-city"
                className="productData"
              >
                {!product && (
                  <option value="" selected hidden>
                    Ciudad
                  </option>
                )}
                {cities.map((city) => {
                  return (
                    <option
                      selected={productCity ? productCity === city.id : false}
                      key={city.id}
                      value={city.id}
                    >
                      {city.titulo}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="productAdministration-input">
              <label htmlFor="product-address" className="productData-label">
                Dirección
              </label>
              <input
                value={productAddress}
                onChange={(e) => setProductAddress(e.target.value)}
                placeholder="Dirección"
                id="product-address"
                type={"text"}
                className="productData"
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="product-description" className="productData-label">
              Descripción
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Escribir aquí"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
                resize: "none",
                height: "5rem",
              }}
              id="product-description"
              className="productData"
            />
          </div>
        </div>
        <div className="product-administration-attributes">
          <div>
            <h3 style={{ color: "#383B58" }}>Agregar atributos</h3>
            <div style={{ display: "flex", backgroundColor: "#F3F1ED" }}>
              <div className="administration-atributes">
                <label
                  htmlFor="product-administration-add-attribute"
                  className="productData-label"
                >
                  Nombre
                </label>
                <div style={{ display: "flex" }}>
                  <select
                    onChange={(e) => setSelectedAttribute(e.target.value)}
                    id="product-administration-add-attribute"
                    className="productAtributes "
                  >
                    <option value="" selected hidden>
                      Atributo
                    </option>
                    {characteristics.map((characteristic) => (
                      <option
                        disabled={
                          productAttributes &&
                          productAttributes.length &&
                          productAttributes.indexOf(
                            characteristic.titulo.trim()
                          ) >= 0
                        }
                        key={characteristic.id}
                        style={
                          productAttributes &&
                          productAttributes.length &&
                          productAttributes.indexOf(
                            characteristic.titulo.trim()
                          ) >= 0
                            ? { color: "#dbd9d5" }
                            : {}
                        }
                      >
                        {characteristic.titulo}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon
                    onClick={addAttribute}
                    className="addAtribute-button"
                    icon={faSquarePlus}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {productAttributes &&
                    productAttributes.map((attribute) => (
                      <span>
                        <FontAwesomeIcon
                          style={{ color: "#1DBEB4" }}
                          key={attribute}
                          icon={iconNameToIcon(attribute)}
                        />{" "}
                        {attribute}
                        <FontAwesomeIcon
                          onClick={(_) => removeAttribute(attribute)}
                          style={{ cursor: "pointer", color: "red" }}
                          icon={faSquareXmark}
                        />
                      </span>
                    ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="productData-label">Ícono</label>
                {selectedAttribute && (
                  <FontAwesomeIcon
                    style={{ color: "#1DBEB4", fontSize: "2rem" }}
                    icon={iconNameToIcon(selectedAttribute.trim())}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="product-administration-politics">
          <h3 style={{ color: "#383B58" }}>Políticas del producto</h3>
          <div
            /*style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', justifyContent: 'space-around', width: '100%'}} */ className="productPolitics"
          >
            <div className="productPolitics-item">
              <h4>Normas</h4>
              <div>
                {productHouseRules && productHouseRules.length ? (
                  policies
                    .filter(
                      (policy) => productHouseRules.indexOf(policy.id) >= 0
                    )
                    .map((policy) => (
                      <p>
                        {policy.descripcion}{" "}
                        <FontAwesomeIcon
                          onClick={(_) => removePolicy(policy, "house_rule")}
                          style={{ cursor: "pointer", color: "red" }}
                          icon={faSquareXmark}
                        />
                      </p>
                    ))
                ) : (
                  <></>
                )}
                {houseRules && houseRules.length ? (
                  <>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <select
                        onChange={(e) => setSelectedHouseRule(e.target.value)}
                        className="productPolitics-select"
                      >
                        <option value="" selected hidden>
                          Normas
                        </option>
                        {houseRules
                          .filter(
                            (policy) => productHouseRules.indexOf(policy) === -1
                          )
                          .map((policy) => (
                            <option
                              value={JSON.stringify(policy)}
                              key={policy.id}
                            >
                              {policy.descripcion}
                            </option>
                          ))}
                      </select>
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        onClick={addHouseRule}
                        className="productPolitics-button"
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="productPolitics-item">
              <h4>Salud y seguridad</h4>
              <div>
                {productHealthSecurity && productHealthSecurity.length ? (
                  policies
                    .filter(
                      (policy) => productHealthSecurity.indexOf(policy.id) >= 0
                    )
                    .map((policy) => (
                      <p>
                        {policy.descripcion}{" "}
                        <FontAwesomeIcon
                          onClick={(_) => removePolicy(policy, "health_safety")}
                          style={{ cursor: "pointer", color: "red" }}
                          icon={faSquareXmark}
                        />
                      </p>
                    ))
                ) : (
                  <></>
                )}
                {healthSecurities && healthSecurities.length ? (
                  <>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <select
                        onChange={(e) =>
                          setSelectedHealthSecurity(e.target.value)
                        }
                        className="productPolitics-select"
                      >
                        <option value="" selected hidden>
                          Política de salud y seguridad
                        </option>
                        {healthSecurities
                          .filter(
                            (policy) =>
                              productHealthSecurity.indexOf(
                                policy.descripcion
                              ) === -1
                          )
                          .map((policy) => (
                            <option
                              value={JSON.stringify(policy)}
                              key={policy.id}
                            >
                              {policy.descripcion}
                            </option>
                          ))}
                      </select>
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        onClick={addHealthSecurity}
                        className="productPolitics-button"
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="productPolitics-item">
              <h4>Políticas de cancelación</h4>
              <div>
                {productCancelationPolicy && productCancelationPolicy.length ? (
                  policies
                    .filter(
                      (policy) =>
                        productCancelationPolicy.indexOf(policy.id) >= 0
                    )
                    .map((policy) => (
                      <p>
                        {policy.descripcion}{" "}
                        <FontAwesomeIcon
                          onClick={(_) => removePolicy(policy, "cancelation")}
                          style={{ cursor: "pointer", color: "red" }}
                          icon={faSquareXmark}
                        />
                      </p>
                    ))
                ) : (
                  <></>
                )}
                {cancelationPolicies && cancelationPolicies.length ? (
                  <>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <select
                        onChange={(e) =>
                          setSelectedCancelationPolicy(e.target.value)
                        }
                        className="productPolitics-select"
                      >
                        <option value="" selected hidden>
                          Política de cancelación
                        </option>
                        {cancelationPolicies
                          .filter(
                            (policy) =>
                              productCancelationPolicy.indexOf(policy) === -1
                          )
                          .map((policy) => (
                            <option
                              value={JSON.stringify(policy)}
                              key={policy.id}
                            >
                              {policy.descripcion}
                            </option>
                          ))}
                      </select>
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        onClick={addCancelationPolicy}
                        className="productPolitics-button"
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="product-administration-images">
          <h3 style={{ color: "#383B58" }}>Cargar imágenes</h3>
          <div className="administrationImages">
            {images ? (
              images.map((image) => (
                <p key={image.id}>
                  <a
                    target={"_blank"}
                    href={image.url}
                    style={{ textDecoration: "none" }}
                  >
                    {image.url}
                  </a>{" "}
                  <FontAwesomeIcon
                    onClick={(_) => removeImage(image.url)}
                    style={{ cursor: "pointer", color: "red" }}
                    icon={faSquareXmark}
                  />
                </p>
              ))
            ) : (
              <></>
            )}
            <div style={{ display: "flex", flexDirection: "row" }}>
              {/* <label htmlFor="imageToAdd">Url de la imagen</label> */}
              <input
                id="imageToAdd"
                onChange={(e) => setImageToAdd(e.target.value)}
                type={"text"}
                placeholder="Insertar https://..."
                className="administrationImages-input"
              />
              <FontAwesomeIcon
                onClick={addImage}
                icon={faSquarePlus}
                className="administrationImages-button"
              />
            </div>
          </div>
        </div>
        <button
          disabled={sendingInformation}
          style={sendingInformation ? { cursor: "not-allowed" } : {}}
          type="submit"
          className="createProduct-button"
        >
          {product ? "Guardar" : "Crear"}{" "}
        </button>
      </form>
    </div>
  );
};

const ProductAdministration = (_) => {
  const { user } = React.useContext(UserContext);
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const productId = query.get("productId");
  const [product, setProduct] = React.useState("loading");
  const [productCategories, setProductCategories] = React.useState();
  const [cities, setCities] = React.useState();
  const [characteristics, setCharacteristics] = React.useState();
  const [policies, setPolicies] = React.useState();

  React.useEffect(() => {
    if (productId) {
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
    } else {
      setProduct(null);
    }
  }, []);

  React.useEffect(() => {
    const getProductCategories = async (_) => {
      try {
        const getCategoriesUrl =
          "http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/categories/list/false";
        const categoriesData = await axios.get(getCategoriesUrl);

        if (categoriesData && categoriesData.data) {
          setProductCategories(categoriesData.data);
        }
      } catch (_) {
        setProductCategories(null);
      }
    };
    getProductCategories();
  }, []);

  React.useEffect(() => {
    const getCities = async (_) => {
      try {
        const citiesData = await axios.get(
          "http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/cities/list"
        );
        setCities(citiesData.data);
      } catch (_) {
        setCities(null);
      }
    };
    getCities();
  }, []);

  React.useEffect(() => {
    const getCharacteristics = async (_) => {
      try {
        const characteristicsData = await axios.get(
          "http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/features/list"
        );
        setCharacteristics(characteristicsData.data);
      } catch (_) {
        setCharacteristics(null);
      }
    };
    getCharacteristics();
  }, []);

  React.useEffect(() => {
    const getPolicies = async (_) => {
      try {
        const policiesData = await axios.get(
          "http://ec2-3-143-219-202.us-east-2.compute.amazonaws.com:8080/policies/list"
        );
        setPolicies(policiesData.data);
      } catch (_) {
        setPolicies(null);
      }
    };
    getPolicies();
  }, []);

  return user &&
    user.rol &&
    (user.rol === "ROLE_SUPER_ADMIN" || user.rol === "ROLE_ADMIN") ? (
    <div
      style={{
        padding: "30px",
        borderRadius: "4px",
        minHeight: "calc(100vh - 200px)",
      }}
    >
      {productCategories &&
        cities &&
        characteristics &&
        (product === null || product !== "loading") &&
        policies && (
          <>
            <ProductAdministrationTop />
            <ProductAdministrationForm
              product={product}
              productCategories={productCategories}
              cities={cities}
              characteristics={characteristics}
              policies={policies}
            />
          </>
        )}
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default ProductAdministration;
