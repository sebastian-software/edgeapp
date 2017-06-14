import React from "react"
import Helmet from "react-helmet"
import { FormattedDate, FormattedMessage, FormattedRelative } from "react-intl"
import { addDays } from "date-fns"
import PropTypes from "prop-types"

import Styles from "./Localization.css"

const yesterday = addDays(Date.now(), -1)

class Localization extends React.Component {
  render() {
    const { intl } = this.props

    return (
      <article>
        <Helmet title={intl.formatMessage({ id: "title" })} />
        <p>
          <FormattedMessage id="info" values={{ pi: 3.14159265359 }} />
        </p>

        <p>
          Today: <br/>
          <FormattedDate
            value={Date.now()}
            year="numeric"
            month="long"
            day="numeric"
            weekday="long"
          />
        </p>
        <p>
          Yesterday:<br/>
          <FormattedRelative value={yesterday}/>
        </p>
      </article>
    )
  }
}

Localization.propTypes = {
  intl: PropTypes.object
}

export default Localization
