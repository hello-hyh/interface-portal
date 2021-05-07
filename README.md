# interface-portal-plugin

# Install

```js
// before installed, the .gitignore file will be created if exist .gitignore then insert some string
npm install interface-portal-plugin
```

# Usage

in your webpack config file

```js
const InterfacePortalPlugin = require("interface-portal-plugin");
...

plugins: [
  ... // other plugin
  new InterfacePortal({ apitPath: 'your openapi json path' })
  ],
```

when your build project whit watch mode,
the `swagger_interface` dir well be create,
end use `import` interface to your .ts file.

## plaess don't push `swagger_interface` dir to your code repository.
