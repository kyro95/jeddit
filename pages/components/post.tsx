import Toast from "awesome-toast-component";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ICategoryProps } from "..";
import { IVoteProps } from "../homepage/[id]";

interface IPostProps {
    id: number;
    author: string;
    title: string;
    text: string;
    category: ICategoryProps;
    votes: number;
}

const Post = ({
    id,
    author,
    title,
    text,
    category,
    votes
}: IPostProps) => {
    const [totalVotes, setTotalvotes] = useState(votes);
    const { data: session } = useSession();

    const updateVotes = async () => {
        if(!session?.user) {
            new Toast("You must log-in to use this function", {
                position: "bottom",
                timeout: 3500
            }); 

            return;
        }

        const response = await fetch("../api/post/getAllVotesByDid", {
            method: "POST",
            body: JSON.stringify({
                postId: id,
                name: session.user.name
            })
        });

        updateVote(response.ok ? "remove" : "add", response.ok);
        return;
    }

    const updateVote = async (endpoint: string, alreadyVoted: boolean) => {
        const response = await fetch(`../api/vote/${endpoint}`, {
            method: "POST",
            body: JSON.stringify({
                categoryId: category.id,
                postId: id,
                name: session?.user?.name,
            })
        });
        
        if(!response.ok) {
            new Toast(response.statusText, {
                position: "bottom",
                timeout: 3500
            }); 

            return;
        } 

        setTotalvotes(prevState => endpoint === "add" ? prevState + 1 : prevState - 1);
    }

    return (
      <>
        <div className="flex flex-col justify-center items-center">
            <div className="flex p-3 rounded artboard artboard-horizontal w-7/12 bg-base-300 space-x-3">
                <div className="items-center justify-center text-center text-3xl">
                    <button onClick={() => updateVotes()} className="ri-arrow-up-s-fill"/>
                    <p className="font-bold select-none text-xl">{totalVotes}</p>
                </div>
              <div className="flex flex-col">
                <div className="flex space-x-1 select-none">
                    <p className="text-sm opacity-30 font-semibold pb-1 pr-2 select-none">j/{category.name}</p>                  
                    <p className="font-bold text-base">{author}</p> 
                    <p className="font-medium text-base">posted</p>
                </div>

                <div className="text-lg space-y-1 pt-2 pb-2">
                    <p className="font-bold text-3xl">
                        {title}
                    </p>

                    <p className="font-medium">
                        {text}
                    </p>
                </div>
              </div>
          </div>
        </div>
      </>
    );
}

export {
    Post
};

export type {
    IPostProps
}