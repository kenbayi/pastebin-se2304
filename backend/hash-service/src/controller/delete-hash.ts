import { Request, Response } from 'express';
import { DeleteHashCommand } from '../services/hashCommandFactory';

export const deleteHash = async (req: Request, res: Response) => {
  const command = new DeleteHashCommand();
  await command.execute(req, res);
};

