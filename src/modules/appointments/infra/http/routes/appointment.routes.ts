import { Router } from 'express';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(ensureAuth);

/*
appointmentRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
});
 */

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
