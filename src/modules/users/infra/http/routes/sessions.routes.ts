import { Router } from 'express';
import AuthService from '@modules/users/services/AuthService';
import { container } from 'tsyringe'
import SessionsController from '../controllers/SessionsController';

const sessionRouter = Router();
const sessionController = new SessionsController()

sessionRouter.post('/', sessionController.create);

export default sessionRouter;
