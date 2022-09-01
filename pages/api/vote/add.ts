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

    const query = await prisma.vote.create({
        data: {
            categoryID: data.categoryId,
            postId: data.postId,
            name: data.name
        }
    });

    return res.status(200).send(res.statusMessage);
}