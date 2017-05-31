import React from "react"
import { IntlProvider } from "react-intl"
import { BrowserRouter } from "react-router-dom"

import { storiesOf, addDecorator } from "@storybook/react"

// import { action } from "@storybook/addon-actions"

import Header from "../src/components/Header"
import Navigation from "../src/components/Navigation"

import "sanitize.css"
import "../src/Fonts.css"
import "../src/Default.css"

import messages from "../src/messages/en.json"

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
