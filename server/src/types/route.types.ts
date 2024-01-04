import { type Router } from 'express';

export interface I_Route {
  path: string;
  route: Router;
}

export enum E_RoutesVersion {
  v1 = 'v1',
  v2 = 'v2',
}

export enum E_Params {
  userId = 'userId',
}

export enum E_Routes {
  docs = 'docs',
  api = 'api',
  healthcheck = 'healthcheck',

  //users
  users = 'users',
  create = 'create',
  //TODO update
  //TODO remoce

  //auth
  auth = 'auth',
  registration = 'registration',
  login = 'login',
  logout = 'logout',
  refresh = 'refresh',
}
