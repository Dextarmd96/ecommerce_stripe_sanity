import React from 'react'
import { AiFillInstagram, AiOutlineTwitter,AiFillFacebook} from 'react-icons/ai';


const Footer = () => {
  return (
    <div className="footer-container">
    <p>© {new Date().getFullYear()} All rights reserved | Made with ❤️
              by Davis Mhango</p>
    <p className="icons">
      <AiFillInstagram />
      <AiOutlineTwitter />
      <AiFillFacebook />
    </p>
  </div>
  )
}

export default Footer