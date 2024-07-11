/** @format */
import userController from '@/controllers/user.controller';
import { EntityRouter } from './entity.router';
import developerController from '@/controllers/developer.controller';

class userRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.post('/de1', developerController.register.bind(developerController));

  }
}
export default new userRouter();
