import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faFacebook, faInstagram, faLinkedin, faTwitter
  } from "@fortawesome/free-brands-svg-icons"
import React from "react";

const FooterLeft = _ => {
    return(
        <div className="copyright">
            <img src="../../logo-footer.png" alt="logo"/><p>©2022 Digital Booking</p>
        </div>
    )
}

const SocialMedia = _ => {
    return (
        <div className="footer-right">
            <FontAwesomeIcon className="social-media-icon" icon={faFacebook} size="2x"/>
            <FontAwesomeIcon className="social-media-icon" icon={faLinkedin} size="2x"/>
            <FontAwesomeIcon className="social-media-icon" icon={faTwitter} size="2x"/>
            <FontAwesomeIcon className="social-media-icon" icon={faInstagram} size="2x"/>
        </div>
    )
}

const Footer = _ => {
    return (
        <footer>
            <SocialMedia/>
            <FooterLeft/>
        </footer>
    )
}

export default Footer
