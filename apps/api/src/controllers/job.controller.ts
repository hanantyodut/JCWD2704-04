import jobService from '@/services/job.service';
import { EntityController } from './entity.controller';
import { IService } from '@/models/service.model';

class JobControllers extends EntityController {
  constructor(service: IService) {
    super(service);
  }
}

export default new JobControllers(jobService);
