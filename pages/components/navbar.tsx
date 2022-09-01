import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { ICategoryProps } from "..";
import { SubjedditModal } from "../homepage/subjeddit.modal";
import { PostModal } from "../homepage/post.modal";

interface INavbarProps {
    categories: ICategoryProps[];
    selectedCategory: string;
}

const Navbar = ({
    categories,
    selectedCategory
}: INavbarProps) => {  
    const [theme, setTheme] = useState("");
    const { data: session } = useSession();
    const router = useRouter();    

    useEffect(() => {
        themeChange(false);
        console.log(theme)
    }, [theme]);

    return (
        <>
            <div className="navbar bg-base-300 p-3 select-none">
                <div className="navbar-start space-x-10">
                    <a className="normal-case font-bold rounded-none">
                        <p onClick={() => { router.push("../")}} className="ml-2 font-bold text-4xl cursor-pointer">jeddit</p>
                        <div className="pl-3 typing-demo text-sm font-medium">
                            👋 You just landed into the right place!
                        </div>
                    </a>
                </div>

                <PostModal/>
                <SubjedditModal/>
                <div className="navbar-end space-x-3">
                    <label htmlFor={"postModal"} className="btn space-x-2">
                        <i className="ri-add-line text-xl"/>
                        <p>New Post</p>
                    </label>

                    <label htmlFor="subjedditModal" className="btn space-x-2">
                        <i className="ri-add-line text-xl"/>
                        <p>New Subjeddit</p>
                    </label>

                    <div className="pr-8">
                        <select className="select select-ghost w-full max-w-xs">
                            <option disabled>Select your subjeddit</option> 
                            {
                                categories.map((category, key) => 
                                    <option 
                                        key={key} 
                                        value={key} 
                                        label={`j/${category.name}`}
                                        onClick={() => router.push(`../homepage/${category.id}`)}
                                    />
                                )
                            }
                        </select>
                    </div>

                    <div className="space-x-3">
                        { 
                            session === null ? 
                                <button onClick={() => signIn()} className="btn btn-outline modal-button space-x-2">
                                    <i className="ri-login-box-line text-xl"/>
                                    <p>Login</p>
                                </button> : 
                                <div>
                                    <div className="avatar space-x-3 flex items-center">
                                        <div className="w-9 rounded-full justify-center items-center">
                                            <img src={session?.user?.image!} />
                                        </div>
                                        <p>{session?.user?.name}</p>
                                        <button onClick={() => signOut()} className="flex space-x-2 btn btn-outline btn-error w-26">
                                            <i className="ri-door-line text-xl"/>
                                            <p>Logout</p>
                                        </button>
                                    </div>
                                </div>
                        }
                    </div>

                    <label className="swap swap-rotate">
                        <input type="checkbox" />
                        <i 
                            className="gradientbutton ri-moon-fill swap-off text-3xl"
                            data-toggle-theme={theme}
                            data-act-class="ACTIVECLASS"
                            onClick={() => setTheme("business")}
                        />

                        <i 
                            className="gradientbutton ri-sun-fill swap-on text-3xl"
                            data-toggle-theme={theme}
                            data-act-class="ACTIVECLASS"
                            onClick={() => setTheme("winter")}
                        />
                    </label>
                    
                    <button data-toggle-theme="business,winter" data-act-class="ACTIVECLASS"/>
                </div>
            </div>
        </>
    );
}

export { 
    Navbar 
};