# Blueport Frontend

Business Banking 2.0


## Directory Structure

- `build`: Used for bundles during development and as an output folder for production.
- `node_modules`: Installation folder for local NodeJS packages.
- `public`: Static files which can be used untouched. Is used by both, production builds and during development.
- `src`: Contains application source code
  - `assets`: Global assets. Do not use for component or view specific assets.
  - `client`: Entry point for client side application. Mostly not relevant during application development.
  - `components`: Shared components between different views. Each component should have a folder named as the class itself e.g. `SelectBox` (camel-case). Component related assets, tests and sub components should be placed directly inside the folder. The components here should not know of any application specific things.
  - `containers`: Containers are components which are connected to the application state. Either by loading specific data via fetch(), connecting to Redux or using the GraphQL data binding.
  - `messages`: Global application messages which are not specific to a view of the application like header, footer, etc.
  - `modules`: Redux modules following the Ducks pattern. Each module contains reducers, selectors and action creators in a single file. Should export all of them under their original names.
  - `server`: Entry point for server side application. Mostly not relevant during application development.
  - `views`: Each route is connected to a view. Each view should be lazy loaded using our async component wrapper. A view is just a normal state-less component combining arbitrary other components and containers. 

## Technology Stack

### Edge Stack

Infrastructure for React application development with support for Redux, Apollo GraphQL, Hot Module Reloading and much more.

- **React**: View Rendering without touching the DOM.
- **Webpack**: Tooling for development and bundling. Intelligent asset processing and output optimization. Configured for route-based lazy loading.
- **Redux**: Client-Side data management with a single application-wide data store.
- **Express**: We are using ExpressJS as our main HTTP server.
- **React-Intl**: Internationalization with messages and data formatting (dates, numbers, ...).
- **CSS Modules**: Sandboxing of different components and views + most of the power of Sass/Less by using PostCSS plugins.

More: [Homepage](https://github.com/sebastian-software/edgestack)


### Readable Code

Linting and code quality checks.

- **ESLint**: Linting for JavaScript with support for all upcoming ES-features, JSX and Flowtype.
- **Stylelint**: Linting for CSS files. Mostly focused on naming conventions and formatting.
- **Prettier**: Auto formatting engine for JavaScript code.
- **Gulp**: Task runner for linting and auto formatting tasks.

More: [Homepage](https://github.com/sebastian-software/readable-code)


### Jest

Testing Framework. We use snapshot for all static components and unit tests for all Redux features like reducers and action creators.

More: [Homepage](https://facebook.github.io/jest/) | [Getting Started](https://facebook.github.io/jest/docs/getting-started.html)


## Patterns

### File Names

Please name all assets (images, fonts, json) in lowercase aka kebap-case => `foo-bar-baz.svg`

JS and CSS filenames should be camelcase. First character should only be uppercase when the file is exporting/defining a component/class.


### Prefer Stateless Components.

TODO

### Use CSS Modules.

Do not use inline styles or CSS in JavaScript solutions. Sandboxing works very well with CSS modules. You are able to use a lot of basic Sass-inspired PostCSS Plugins which are pre-configured by our stack like Sass Mixins, variables and basic `@if` conditionals.

### No nesting of CSS classes

With CSS modules in place there is no need for nesting classNames. The only reason where nesting might be useful is for nesting of tag-based selectors (which should not be used that much anymore).

```css
.bottomFooter {
  ...

  .bottomFooterLeft {
    ...
  }
}
```

can be just written:

```css
.bottomFooter {
  ...
}

.bottomFooterLeft {
  ...
}
```

### Use Redux Duck Pattern.

We follow the Duck pattern for Redux to reduce code verbosity. This means putting reducers, selectors and action creators into a single `{Topic}Module.js` file. The file is always named with the `Module` postfix and should be directly placed into the `src/modules/` directory.

See also: [Project](https://github.com/erikras/ducks-modular-redux) | [Article](https://medium.com/@scbarrus/the-ducks-file-structure-for-redux-d63c41b7035c)

### Use fetch() API for data loading.

TODO

### Use SVG for icons. No fonts.

TODO

### Don't access the DOM for interactivity.

TODO

### Write Jest Snapshot tests for components.

TODO

### Keep components free of application knowledge.

TODO

### Reusable Components should be theme-free

The theme should be passed as a property. Effectively this means we create a `Abstract{Component}` and variations of the component later on e.g. `Big{Component}`, `Vertical{Component}`, etc. The property `theme` is always a `import` of a CSS (modules) file.

Ideally such a wrapper component is super simple e.g.

```js
import theme from "VerticalDock.css"
import AbstractDock from "AbstractDock"

function VerticalDock(props) {
  return <AbstractDock theme={theme} {...props}></AbstractDock>
}
```
