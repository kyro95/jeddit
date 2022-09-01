import Toast from "awesome-toast-component";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "../components/button";
import { Modal } from "../components/modal";

const SubjedditModal = () => {
    const [name, setName] = useState("");
    const router = useRouter();

    const createSubjeddit = async () => {
        if(name.length < 4) {
            new Toast("Subjeddit name must be at least 4 characters long", {
                position: "bottom",
                timeout: 3500
            });

            return;
        }

        const response = await fetch("../api/new/subjeddit", {
            method: "POST",
            body: JSON.stringify(name)
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

    useEffect(() => {
    }, [name]);

    return (
        <>
            <Modal modalId={"subjedditModal"} child={
                <>
                    <div className="text-3xl font-bold flex justify-center items-center space-x-2">
                        <i className="ri-add-box-line" />
                        <p>New Subjeddit</p>
                    </div>
                    
                    <input
                        type="text"
                        placeholder="Cool name here"
                        className="input input-bordered w-full max-w-xs"
                        onChange={e => { setName(e.currentTarget.value); } } 
                    />
                    
                    <div className="flex justify-end items-end">
                        <Button 
                            handleClick={createSubjeddit}
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
    SubjedditModal
}