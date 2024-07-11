/** @format */
import { Request } from 'express';
import { prisma } from '../lib/prisma';
import { formatRequestBody } from '../utils/formatRequestBody';
import { compare } from 'bcrypt';
// import { generateToken } from '../lib/jwt';
import { Gender, Prisma } from '@prisma/client';

export class AdminService {
  async register(req: Request) {


    const { email, password, fullname, gender, bank_acc_no } = req.body;

    const data: Prisma.UsersCreateInput = {
      email,
      password,
      fullname,
      gender: gender as Gender,
      role: 'developer',
      bank_acc_no,
      is_verified: false,
    };

    return await prisma.users.create({ data });
  }

  // async login(req: Request) {
  //   const body = await formatRequestBody(req);
  //   const data = await prisma.user.findFirst({
  //     where: {
  //       email: body.email,
  //       isVerify: true,
  //     },
  //   });
  //   if (data == null) throw new Error("Invalid email");
  //   if (!(await compare(body.password, data.password)))
  //     throw new Error("Invalid passwod");
  //   const result = { id: data.id, type: "user" };
  //   const userData = { ...data, password: undefined };
  //   const aauthToken = generateToken(userData, { expiresIn: "1h" });
  //   return {
  //     rauth: generateToken(result, { expiresIn: "1h" }),
  //     aauthToken,
  //     userData,
  //   };
  // }

  // async emailVerify(req: Request) {
  //   const currentDate = new Date();
  //   currentDate.setMonth(currentDate.getMonth() + 3);

  //   await prisma.$transaction(async (prisma) => {
  //     const res1 = await prisma.user.findUnique({
  //       where: { id: req.user.id, isVerify: false },
  //     });

  //     if (!res1) {
  //       throw new Error("already verified");
  //     }
  //     await prisma.user.update({
  //       where: { id: res1.id },
  //       data: { isVerify: true },
  //     });

  //     if (req.user.referalTo) {
  //       const referalUser = await prisma.user.findUnique({
  //         where: { referalCode: req.user.referalTo },
  //       });
  //       if (referalUser?.id) {
  //         await prisma.user.update({
  //           where: { id: referalUser.id },
  //           data: {
  //             points: { increment: 5000 },
  //             pointExpire: currentDate,
  //           },
  //         });
  //       }
  //     }
  //   });
  // }

  // async referralUser(req: Request) {
  //   const { referalCode } = req.params;
  //   return await prisma.user.findMany({ where: { referalTo: referalCode } });
  // }
}

export default new AdminService();
