import { type Router } from 'express';

export interface I_Route {
  path: string;
  route: Router;
}
