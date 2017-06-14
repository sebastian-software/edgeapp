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
  load: () => {
    return [
      import("./views/Home/Home")
    ]
  }
})

const AboutView = createLazyComponent({
  load: () => {
    return [
      import("./views/About/About")
    ]
  }
})

const LocalizationView = createLazyComponent({
  load: (language) => {
    return [
      import("./views/Localization/Localization"),
      import("./views/Localization/messages/" + language + ".json")
    ]
  }
})

const MarkdownView = createLazyComponent({
  load: () => {
    return [
      import("./views/Markdown/Markdown")
    ]
  }
})

const MissingView = createLazyComponent({
  load: () => {
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
          <Route path="/localization" component={LocalizationView} />
          <Route path="/markdown" component={MarkdownView} />
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
