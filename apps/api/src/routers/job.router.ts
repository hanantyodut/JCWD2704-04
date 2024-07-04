import userController from '@/controllers/user.controller';
import { EntityRouter } from './entity.router';

class JobsRouter extends EntityRouter {
  constructor() {
    super();
    this.initRouter();
  }

  private initRouter() {
    this.router.get('/', userController.getAll.bind(userController));
  }
}

export default new JobsRouter();
