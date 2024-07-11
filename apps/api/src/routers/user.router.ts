import userController from '@/controllers/user.controller';
import { EntityRouter } from './entity.router';

class userRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.post('/v1', userController.register.bind(userController));
    this.router.post(
      '/verify-email',
      userController.verifyEmail.bind(userController),
    );
    this.router.post('/v2', userController.login.bind(userController));
    this.router.post(
      '/forgot',
      userController.forgotPassword.bind(userController),
    );
    this.router.patch(
      '/recovery',
      userController.resetPassword.bind(userController),
    );
  }
}

export default new userRouter();
