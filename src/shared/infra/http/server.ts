import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';

import '@shared/infra/typeorm';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333);
