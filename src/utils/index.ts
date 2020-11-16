import { Response } from 'express';

interface Respon {
  status: number;
  message: string;
  data?: any;
  error?: {} | string;
}

class Respond {
  success(
    res: Response,
    status: number = 200,
    message: string = 'success',
    data: any = {}
  ): Response<Respon> {
    return res.status(status).json({ status, message, data });
  }

  error(
    res: Response,
    status: number = 500,
    message: string = 'internal server error',
    error: any = {}
  ): Response<Respon> {
    return res.status(status).json({ status, message, error });
  }
}

export default new Respond();
