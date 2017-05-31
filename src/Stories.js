import React from "react"
import { IntlProvider } from "react-intl"
import { BrowserRouter } from "react-router-dom"

import { storiesOf, addDecorator } from "@storybook/react"

// import { action } from "@storybook/addon-actions"

import Header from "components/Header"
import Navigation from "components/Navigation"

import "sanitize.css"
import "Fonts.css"
import "Default.css"

import messages from "messages/en.json"

addDecorator((story) => (
  <IntlProvider locale="en" messages={messages}>
    <BrowserRouter>
      {story()}
    </BrowserRouter>
  </IntlProvider>
))

storiesOf("Header", module)
  .add("Site Header", () => (
    <Header/>
  ))

storiesOf("Navigation", module)
  .add("Site Navigation", () => (
    <Navigation/>
  ))
