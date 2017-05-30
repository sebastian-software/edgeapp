// Core Styles
import "sanitize.css"
import "./Fonts.css"
import Styles from "./Root.css"

import React from "react"
import { Switch, Route } from "react-router-dom"
import { IntlProvider } from "react-intl"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { getLocale, getLanguage, createLazyComponent } from "edgestack"

import messages from "messages/en.json"

import Header from "components/Header"
import Navigation from "components/Navigation"

const HomeView = createLazyComponent({
  load: (language) => {
    return [
      import("./views/Home/Home"),
      import("./views/Home/Home." + language + ".json")
    ]
  }
})

const AboutView = createLazyComponent({
  load: (language) => {
    return [
      import("./views/About/About"),
      import("./views/About/About." + language + ".json")
    ]
  }
})

const MissingView = createLazyComponent({
  load: (language) => {
    return [
      import("./views/Missing/Missing")
    ]
  }
})

function Root({ children, locale, language, intl }) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className={Styles.container}>
        <Header/>
        <Navigation/>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route path="/about" component={AboutView} />
          <Route component={MissingView}/>
        </Switch>
      </div>
    </IntlProvider>
  )
}

Root.propTypes = {
  children: PropTypes.node,
  locale: PropTypes.string,
  language: PropTypes.string,
  intl: PropTypes.object
}

const mapStateToProps = (state, ownProps) => ({
  locale: getLocale(state),
  language: getLanguage(state)
})

export default connect(mapStateToProps)(Root)
