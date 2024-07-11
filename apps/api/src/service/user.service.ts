import { Request } from 'express';
import { prisma } from '../lib/prisma';
import { formatRequestBody } from '../utils/formatRequestBody';
import { compare, hash } from 'bcrypt';
import {
  generateForgotPasswordToken,
  generateToken,
  verifyForgotPasswordToken,
  verifyToken,
} from '../lib/jwt';
import { Gender, Prisma } from '@prisma/client';
import { transporter } from '@/lib/nodemailer';
import {
  VERIFY_URL,
  EMAIL_VERIFY_KEY,
  TOKEN_EXPIRY,
  FORGOT_URL,
} from '@/config';

export class UserService {
  async register(req: Request) {
    const { email, password, fullname, gender } = await formatRequestBody(
      req,
      true,
    );

    const data: Prisma.UsersCreateManyInput = {
      email,
      password,
      fullname,
      gender: gender as Gender,
      role: 'user',
      is_verified: false,
    };

    let createdUser: { [x: string]: any } = {};
    await prisma.$transaction(async (prisma) => {
      createdUser = await prisma.users.create({ data });
    });

    if (!createdUser?.id) {
      throw new Error('Fail create user');
    }

    const token = generateToken(
      { id: createdUser.id },
      { expiresIn: '1h' },
      'EMAIL_VERIFY_KEY',
    );

    const a = await transporter.sendMail({
      to: email,
      subject: 'Register to CareerAvenue',
      text: 'verify your account',
      html: `<b>Click the link to verify your account: <a href="${VERIFY_URL + '?token=' + token}">Verify Email</a></b>`,
    });

    return a;
  }

  async verifyEmail(req: Request) {
    const { token } = req.body;

    if (!token) {
      throw new Error('Token is required');
    }

    const decoded = verifyToken(token, 'EMAIL_VERIFY_KEY');
    const userId = decoded.id;

    const user = await prisma.users.update({
      where: { id: userId },
      data: { is_verified: true },
    });

    return user;
  }

  async login(req: Request) {
    const body = await formatRequestBody(req);
    const data = await prisma.users.findFirst({
      where: {
        email: body.email,
        is_verified: true,
      },
    });
    if (!data) throw new Error('Invalid email or user not verified');
    if (!(await compare(body.password, data.password)))
      throw new Error('Invalid password');
    const result = { id: data.id, type: 'user' };
    const userData = { ...data, password: undefined };
    const aauthToken = generateToken(userData, { expiresIn: TOKEN_EXPIRY });
    return {
      rauth: generateToken(result, { expiresIn: TOKEN_EXPIRY }),
      aauthToken,
      userData,
    };
  }

  async forgotPassword(req: Request) {
    try {
      const { email } = await formatRequestBody(req, false); // Tidak perlu hash password
      console.log('Received email:', email);

      if (!email) {
        throw new Error('Email is required');
      }

      const user = await prisma.users.findUnique({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }

      const token = generateForgotPasswordToken(
        { id: user.id },
        { expiresIn: '1h' },
      );

      const mailInfo = await transporter.sendMail({
        to: email,
        subject: 'Reset Your Password',
        text: 'Click the link to reset your password',
        html: `<b>Click the link to reset your password: <a href="${FORGOT_URL + '?token=' + token}">Reset Password</a></b>`,
      });

      console.log('Mail sent:', mailInfo);

      return mailInfo;
    } catch (error) {
      console.error('Error in forgotPassword:', error);
      throw error;
    }
  }
  async resetPassword(req: Request) {
    const { token, password } = req.body;

    if (!token || !password) {
      throw new Error('Token and password are required');
    }

    const decoded = verifyForgotPasswordToken(token);
    const userId = decoded.id;

    const hashedPassword = await hash(password, 10);

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return {
      userId: updatedUser.id,
      message: 'Password reset successful',
    };
  }
}

export default new UserService();
