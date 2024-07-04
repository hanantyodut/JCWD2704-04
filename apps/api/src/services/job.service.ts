import { prisma } from '@/libs/prisma';
import { TJob } from '@/models/job.model';
import { Request } from 'express';

class JobServices {
  async create(req: Request) {}
  async getAll(req: Request) {
    const data: TJob[] = await prisma.job.findMany();
    return data;
  }
  async getById(req: Request) {}
  async update(req: Request) {}
  async delete(req: Request) {}
}

export default new JobServices();
