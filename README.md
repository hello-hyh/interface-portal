# interface-portal-plugin

# Install

```js
npm install interface-portal-plugin
```

# Usage

in your webpack config file

```js
const InterfacePortalPlugin = require("interface-portal-plugin");
...

plugins: [
  ... // other plugin
  new InterfacePortalPlugin({ apitPath: 'your openapi json path' })
  ],
```

when your build project with watch mode,
the `swagger_interface` dir well be create,
end use `import` interface to your .ts file.

## please don't push `swagger_interface` dir to your code repository.
