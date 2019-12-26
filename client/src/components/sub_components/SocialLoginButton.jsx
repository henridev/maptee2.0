import React from 'react'
import GoogleIcon from '../../assets/images/google.png'
import FacebookIcon from '../../assets/images/facebook.png'
import api from '../../apis/auth_api'

export default function SocialLoginButton(props) {
  const { name } = props
  const handleClick = e => {
    if (name === 'google') {
      api.google_login()
    } else {
      api.facebook_login()
    }
  }
  return (
    <button onClick={handleClick}>
      <img
        src={name === 'google' ? GoogleIcon : FacebookIcon}
        alt="google-icon"
        className="btn-icon"
      />
      <span className="btn-txt">Login</span>
      login with {name}
      <a
        className="btn-one login-btn"
        style={{ backgroundColor: '#3B5899', margin: 5 }}
        title="login with google"
        href={
          process.env.NODE_ENV === 'production'
            ? '/api/user/login-google'
            : `http://${window.location.hostname}:5000/api/user/login-google`
        }
      >
        click me
      </a>
    </button>
  )
}

//  ;<a
//    className="btn-one login-btn"
//    style={{ backgroundColor: '#3B5899', margin: 5 }}
//    title="login with facebook"
//    href={
//      process.env.NODE_ENV === 'production'
//        ? '/authentication/login-facebook'
//        : `http://${window.location.hostname}:5000/authentication/login-facebook`
//    }
//  >
//    <img src={FacebookIcon} alt="facebook-icon" className="btn-icon" />
//    <span className="btn-txt">Login</span>
//  </a>
