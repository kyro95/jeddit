import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/database";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json ({ 
            status: res.statusCode, 
            message: "Method not allowed"
        });
    }

    const data = JSON.parse(req.body);

    console.log(data);

    const query = await prisma.vote.findMany({
        where: {
            postId: data.postId,
            name: data.name
        }
    });

    if(!query.length) { 
        return res.status(404).send(res.statusMessage);
    }

    return res.status(200).send(
        JSON.stringify(query)
    );
}