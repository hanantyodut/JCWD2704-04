import { prisma } from '@/libs/prisma';
import { TUser } from '@/models/user.model';
import { Request } from 'express';

class UserServices {
  async create(req: Request) {}
  async getAll(req: Request) {
    const data: TUser[] = await prisma.users.findMany();
    return data;
  }
  async getById(req: Request) {}
  async update(req: Request) {}
  async delete(req: Request) {}
}

export default new UserServices();
