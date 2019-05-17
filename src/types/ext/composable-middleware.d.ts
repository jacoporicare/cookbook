declare module 'composable-middleware' {
  import { Router } from 'express';

  export = compose;

  function compose(): Router;
}
