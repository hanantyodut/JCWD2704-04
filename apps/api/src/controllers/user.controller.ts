import { IService } from '@/models/service.model';
import { EntityController } from './entity.controller';
import userService from '@/services/user.service';

class UserControllers extends EntityController {
  constructor(service: IService) {
    super(service);
  }
}

export default new UserControllers(userService);
