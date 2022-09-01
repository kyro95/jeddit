import Toast from "awesome-toast-component";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Modal } from "../components/modal";

const PostModal = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
    }, [title, text]);

    const createPost = async () => {
        if(title.length < 5 || text.length < 5) {
            new Toast("Title or text must be at least 4 characters long", {
                position: "bottom",
                timeout: 3500
            }); 

            return;
        }

        const response = await fetch("../api/new/post", {
            method: "POST",
            body: JSON.stringify(
                {
                    categoryId: parseInt(router.query.id!.toString()),
                    author: session?.user?.name,
                    title: title,
                    text: text,
                }
            )
        });

        if(response.ok) {
            router.reload();
            return;
        }

        new Toast(response.statusText, {
            position: "bottom",
            timeout: 3500
        }); 
    }

    return (
        <>
            <Modal modalId={"postModal"} child={
                <>
                    <div className="text-3xl font-bold flex space-x-2">
                        <i className="ri-add-box-line" />
                        <p>New Post</p>
                    </div>
                    
                    <input
                        type="text"
                        placeholder="Cool title here"
                        className="input input-bordered w-full"
                        onChange={(e) => setTitle(e.currentTarget.value) }
                    />

                    <textarea 
                        className="textarea textarea-bordered w-full" 
                        placeholder="Express yourself here"
                        onChange={(e) => setText(e.currentTarget.value)}
                    />
                    
                    <div className="flex justify-end items-end">
                        <Button
                            handleClick={createPost}
                            name="Create"
                            className="btn-wide"
                        />
                    </div>
                </>
            }/>
        </>
    );
}

export {
    PostModal
};