import React from "react"
import Helmet from "react-helmet"
import PropTypes from "prop-types"

import Styles from "./Home.css"

function Home({ intl }) {
  return (
    <article>
      <Helmet title="Home" />
      <div className={Styles.preloader} />
      <p>
        Home Component
      </p>
    </article>
  )
}

Home.propTypes = {
  intl: PropTypes.object
}

export default Home
