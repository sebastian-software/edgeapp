import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import { IntlProvider } from "react-intl"
import { BrowserRouter } from "react-router-dom"

import Header from "../src/components/Header"
import Navigation from "../src/components/Navigation"

storiesOf("Button", module)
  .add("with text", () => (
    <button onClick={action("clicked")}>Hello Button</button>
  ))
  .add("with some emoji", () => (
    <button onClick={action("clicked")}>😀 😎 👍 💯</button>
  ))

const messages = {
  "app.title": "Storybook Title",
  "app.description": "Storybook Description"
}

storiesOf("Header", module)
  .add("Site Header", () => (
    <IntlProvider locale="en" messages={messages}>
      <Header/>
    </IntlProvider>
  ))

storiesOf("Navigation", module)
  .add("Site Navigation", () => (
    <IntlProvider locale="en" messages={messages}>
      <BrowserRouter>
        <Navigation/>
      </BrowserRouter>
    </IntlProvider>
  ))
