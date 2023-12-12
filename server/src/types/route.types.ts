import { type Router } from 'express';

export interface I_Route {
  path: string;
  route: Router;
}

export enum E_RoutesVersion {
  v1 = 'v1',
  v2 = 'v2',
}

export enum E_Routes {
  docs = 'docs',
  api = 'api',
  healthcheck = 'healthcheck',
  users = 'users',
  create = 'create',
}
