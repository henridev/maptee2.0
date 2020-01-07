import React from 'react'
import Logo from '../../assets/images/temp_logo.png'
import { Link } from 'react-router-dom'

export default function Landing(props) {
  return (
    <div className="landing_wrapper">
      <div className="description_container">
        <h1>Organizing fun events</h1>
        <p>
          When organizing an event the location and people matter. This is why
          at maptee we created a platform that allows you to organize a meetup
          without all the usual back and forth concerning the when, where
          questions. An intercative map, calendar and chat will make organizing
          your next meetup a breeze.
        </p>
        <div className="button_wrapper">
          <Link to="/signup">
            <button className="btn btn-light ng-scope">sign me up</button>
          </Link>
          <Link to="/login">
            <button id="login_btn" className="btn btn-light ng-scope">
              log in
            </button>
          </Link>
        </div>
      </div>
      <div className="logo_containter">
        <img src={Logo} />
      </div>
    </div>
  )
}
