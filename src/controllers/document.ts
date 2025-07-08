import { Request, Response } from "express";

const getDocuments = (_: Request, res: Response) => {
  const documents: any = [];
  res.status(200).json({ count: 0, document: documents });
};

export { getDocuments };
