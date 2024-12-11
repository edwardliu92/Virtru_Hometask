# Health Check API

This API is used to simulate health checks on a server. See docs/swagger.json for more information.

## Maintainer

To maintain this API please follow the following principles:

- Minimal dependencies
- Minimal code
- Minimal configuration

### Development

Generate new swagger.json file by running `make gen-swagger`. This will generate a new swagger.json file in the docs folder, note the dependency that is installed locally and not in to go.mod.
