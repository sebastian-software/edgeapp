// Core Styles
import "sanitize.css"
import "./Fonts.css"
import Styles from "./Root.css"

import React from "react"
import { Switch, Route } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Loadable from "react-loadable"

import { getLocale, getLanguage, createLazyComponent } from "edgestack"

import Header from "components/Header"
import Navigation from "components/Navigation"

function Loader(props) {
  if (props.isLoading) {
    // While our other component is loading...
    if (props.timedOut) {
      // In case we've timed out loading our other component.
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      // Display a loading screen after a set delay.
      return <div>Loading...</div>;
    } else {
      // Don't flash "Loading..." when we don't need to.
      return null;
    }
  } else if (props.error) {
    // If we aren't loading, maybe
    return <div>Error! Component failed to load</div>;
  } else {
    // This case shouldn't happen... but we'll return null anyways.
    return null;
  }
}

const HomeView = Loadable({
  loader: () => import("./views/Home/Home"),
  loading: Loader
})

const ReduxView = Loadable({
  loader: () => import("./views/Redux/Redux"),
  loading: Loader
})

const MarkdownView = Loadable({
  loader: () => import("./views/Markdown/Markdown"),
  loading: Loader
})

const MissingView = Loadable({
  loader: () => import("./views/Missing/Missing"),
  loading: Loader
})

const LocalizationView = Loadable.Map({
  loader: {
    Component: () => import("./views/Localization/Localization"),
    messages: () => import("./views/Localization/messages/" + "de" + ".json")
  },
  loading: Loader,
  render(loaded, props) {
    let Component = loaded.Component.default
    let messages = loaded.messages
    return <Component {...props} messages={messages}/>
  }
})


/*
const HomeView = createLazyComponent({
  load: () => {
    return [
      import("./views/Home/Home")
    ]
  }
})

const ReduxView = createLazyComponent({
  load: () => {
    return [
      import("./views/Redux/Redux")
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
*/



function Root({ children, locale, language, intl }) {
  return (
    <div className={Styles.container}>
      <Header/>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/redux" component={ReduxView} />
        <Route path="/localization" component={LocalizationView} />
        <Route path="/markdown" component={MarkdownView} />
        <Route component={MissingView}/>
      </Switch>
    </div>
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
