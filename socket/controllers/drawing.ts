import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createWhiteboard(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ msg: "Email is required to create a new whiteboard!" });
    const whiteboard = await prisma.drawing.create({
      data: { access: [email] },
    });
    return res.status(200).json({ id: whiteboard.id });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  } finally {
    await prisma.$disconnect();
  }
}

export const getWhiteBoards = async (_req: Request, res: Response) => {
  try {
    const whiteboards = await prisma.drawing.findMany({ select: { id: true } });
    return res.status(200).json(whiteboards);
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error!" });
  } finally {
    await prisma.$disconnect();
  }
};

export const getWhiteBoard = async (req: Request, res: Response) => {
  try {
    const whiteboard = await prisma.drawing.findUnique({
      where: { id: Number(req.params.id) },
      select: { data: true },
    });
    return res.status(200).json(whiteboard);
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error!" });
  } finally {
    await prisma.$disconnect();
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  try {
    await prisma.drawing.update({
      where: { id: Number(req.params.id) },
      data: { data: req.body.data },
    });
    return res.status(203);
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error!" });
  } finally {
    await prisma.$disconnect();
  }
};
