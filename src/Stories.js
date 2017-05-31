import React from "react"
import { IntlProvider } from "react-intl"
import { BrowserRouter } from "react-router-dom"

import { storiesOf, addDecorator } from "@storybook/react"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"
import { action } from "@storybook/addon-actions"

import Header from "components/Header"
import Navigation from "components/Navigation"

import "sanitize.css"
import "Fonts.css"
import "Default.css"

import messages from "messages/en.json"

function withRoutingAndIntl(story) {
  return (
    <IntlProvider locale="en" messages={messages}>
      <BrowserRouter>
        {story()}
      </BrowserRouter>
    </IntlProvider>
  )
}

// Add the `withKnobs` decorator to add knobs support to your stories.
addDecorator(withKnobs)

// Add support for central configuration of Intl + Routing
addDecorator(withRoutingAndIntl)

storiesOf("Header", module)
  .add("Site Header", () => (
    <Header/>
  ))

storiesOf("Navigation", module)
  .add("Site Navigation", () => (
    <Navigation/>
  ))
