import React from "react"
import Helmet from "react-helmet"
import PropTypes from "prop-types"

import Styles from "./Home.css"

import Tweets from "../../graphql/Tweets.gql"
console.log("Loading GraphQL queries works:", Tweets.kind === "Document")

function Home({ intl }) {
  return (
    <article>
      <Helmet title={intl.formatMessage({ id: "title" })} />
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
