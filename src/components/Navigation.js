import React from "react"
import { injectIntl } from "react-intl"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"

import Styles from "./Navigation.css"

function Navigation({ intl }) {
  return (
    <ul className={Styles.list}>
      <li><NavLink exact to="/" activeClassName={Styles.activeLink}>Home</NavLink></li>
      <li><NavLink to="/redux" activeClassName={Styles.activeLink}>Redux</NavLink></li>
      <li><NavLink to="/localization" activeClassName={Styles.activeLink}>Localization</NavLink></li>
      <li><NavLink to="/markdown" activeClassName={Styles.activeLink}>Markdown</NavLink></li>
      <li><NavLink to="/missing" activeClassName={Styles.activeLink}>Missing</NavLink></li>
    </ul>
  )
}

Navigation.propTypes = {
  intl: PropTypes.object
}

export default injectIntl(Navigation)
