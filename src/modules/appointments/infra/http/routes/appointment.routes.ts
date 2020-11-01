import { Router } from 'express';
import { parseISO } from 'date-fns';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentsRepository = new AppointmentsRepository();
const appointmentRouter = Router();

appointmentRouter.use(ensureAuth);

appointmentRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
});

appointmentRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmentService(appointmentsRepository);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });
  return res.json(appointment);
});

export default appointmentRouter;
