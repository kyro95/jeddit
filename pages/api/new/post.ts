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

    await prisma.post.create({
        data: {
            categoryId: data.categoryId,
            author: data.author,
            title: data.title,
            text: data.text,
        }
    });

    return res.send(200);
}