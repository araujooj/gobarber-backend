import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import UsersControllers from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const userRouter = Router();
const userController = new UsersControllers();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

userRouter.post('/', userController.create);

userRouter.use(ensureAuth)

userRouter.patch(
  '/avatar', upload.single('avatar'), userAvatarController.update,
);

export default userRouter;
