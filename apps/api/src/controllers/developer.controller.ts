/** @format */

import developerService from "@/service/developer.service";
import { NextFunction, Request, Response } from "express";

export class userController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await developerService.register(req);
      res.send({
        message: "success register",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  // async login(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const data = await userService.login(req);

  //     res.send({
  //         message: "success login",
  //         data: data.userData,
  //       });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async referralUser(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const data = await userService.referralUser(req);
  //     res.send({
  //       message: "fetch referal",
  //       data,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }


}

export default new userController();
