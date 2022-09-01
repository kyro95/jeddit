import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/database";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json ({ 
            status: res.statusCode, 
            message: "Method not allowed"
        });
    }

    await prisma.category.create({
        data: {
            name: JSON.parse(req.body)
        }
    });

    return res.send(200);
}
  