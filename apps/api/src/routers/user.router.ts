import userController from '@/controllers/user.controller';
import { EntityRouter } from './entity.router';

class UsersRouter extends EntityRouter {
  constructor() {
    super();
    this.initRouter();
  }

  private initRouter() {
    this.router.get('/', userController.getAll.bind(userController));
  }
}

export default new UsersRouter();
