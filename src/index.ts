import {sequelize} from './db.js';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {PROTO_PATH} from 'env.js';
import {ProtoGrpcType} from './proto/greeter.js';

async function main() {
  console.log('start!');

  const [authenticate] = await Promise.allSettled([sequelize.authenticate()]);

  if (authenticate.status === 'rejected') {
    console.log('error!');
    console.log(authenticate.reason);
    return;
  }

  await sequelize.createSchema('private', {logging: true});
  await sequelize.sync({alter: true});

  // gRPC loading
  const packageDefinition = await protoLoader.load(`${PROTO_PATH}/greeter.proto`, {
    keepCase: true,
    longs: Number,
    defaults: true,
    oneofs: true,
  });

  const rpcPackages: ProtoGrpcType = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
  const {helloworld} = rpcPackages;

  // gRPC server
  const server = new grpc.Server();
  server.addService(helloworld.Greeter.service, {
    sayHello: (call, callback) => {
      callback(null, {message: `Hello ${call.request.name}`});
    },
  });
  
  console.log('start server!');
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    server.start();
  });
};

await main();