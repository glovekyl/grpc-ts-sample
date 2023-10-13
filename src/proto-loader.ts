/**
 * @fileoverview Generates a proto loader for the application. This is used to
 * load the proto files
 */
import {PROTO_PATH} from './env.js';
import * as fs from 'fs';
import * as path from 'path';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';

/**
 * Lists all the proto files in the proto directory
 * @returns All the proto files in the proto directory
 */
function listProtoFiles(): string[] {
  const files = fs.readdirSync(PROTO_PATH);
  return files.filter((file) => file.endsWith('.proto'));
}

/**
 * Generates a package defition for the proto files that is then loaded by the
 * grpc.loadPackageDefinition() method.
 */
async function loadPackageDefinition(): Promise<void> {
  const packageDefinition: protoLoader.PackageDefinition = {};
  const options: protoLoader.Options = {
    keepCase: true,
    longs: Number,
    defaults: true,
    oneofs: true,
  }

  listProtoFiles().forEach((file) => {
    const filePath = path.join(PROTO_PATH, file);
    const packageObject = protoLoader.loadSync(filePath, options);
    Object.assign(packageDefinition, packageObject);
  });

  const x = await Promise.all(listProtoFiles().map(file => protoLoader.load(file, options)));
  grpc.loadPackageDefinition(x[0]).signal;
  return;
}