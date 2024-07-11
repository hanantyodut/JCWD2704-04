import userService from "@/service/user.service";
import { NextFunction, Request, Response } from "express";

class userController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.register(req);
      res.send({
        message: "success register",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.verifyEmail(req);
      res.send({
        message: "Email verification successful",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.login(req);
      res.send({
        message: "success login",
        data: data.userData,
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.forgotPassword(req);
      res.send({
        message: "Password reset link sent to your email",
        data,
      });
    } catch (error) {
      console.error('Error in forgotPassword:', error);
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.resetPassword(req);
      res.send({
        message: "Password reset successful",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new userController();
