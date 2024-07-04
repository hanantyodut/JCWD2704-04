import { IService } from '../models/service.model';
import { Request, Response, NextFunction } from 'express';

export class EntityController {
  service: IService;
  constructor(service: IService) {
    this.service = service;
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getAll(req);
      res.send({ message: 'fetched all data.', data });
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (this.service.getById) {
        const data = await this.service.getById(req);
        res.send({ message: 'fetched by id', data });
      }
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.create(req);
      res.status(201).send({ message: 'created new data' });
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.update(req);
      res.send({ message: 'data has been updated' });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.delete(req);
      res.send({ message: 'deletedata has been deleted' });
    } catch (error) {
      next(error);
    }
  }
}
