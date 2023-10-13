Basic signaling server example using Typescript. It receives offers, and distributes sdp to provide the answer.

> **Todo**:
> [ ] Client
> [ ] pubsub Clients

## Running the project

### From docker

Signaling server is not yet available on docker hub, but you can build it yourself. Make sure you have docker installed! If you have postgres running locally, you can also input the connection details as environment variables.

```bash
# Build the image
$ docker build -t signaling-server .

# Run postgres locally (optional)
$ docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=signaling postgres

# The application will throw an error if some of the environment variables are not set. You can set them using the -e flag.
$ docker run -p 3000:3000 -d signaling-server -e KEY=value

# If you are running postgres locally
$ docker run -p 3000:3000 -d signaling-server -e DB_HOST=localhost -e DB_PASSWORD=postgres -e DB_USER=postgres -e DB_NAME=signaling
```

### From source

Project is built using **pnpm** and assumes you have it installed.

```bash
# Install dependencies
$ pnpm install

# Run the project
$ pnpm start
```

## Protobuf

Protobuf files are located in the `proto` folder. Although the project is able to run without the generated type files, the build step will fail. You can generate them using the `$ pnpm protobuf` command.

### CommonJS vs ESModules

[@grpc/proto-loader] is used to generate the types however does not support ESModules, and are therefore generated with CommonJS syntax. Meaning that relative imports will not work. At the moment they are manually changed to ESModules, but this is not a good solution.

<!-- Links -->
[@grpc/proto-loader]: https://www.npmjs.com/package/@grpc/proto-loader