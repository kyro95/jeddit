import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/database";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json ({ 
            status: res.statusCode, 
            message: "Method not allowed"
        });
    }

    const data = JSON.parse(req.body);

    await prisma.vote.deleteMany({
        where: {
            name: data.name,
            postId: data.postId
        }
    });

    return res.status(200).send(res.statusMessage);
}