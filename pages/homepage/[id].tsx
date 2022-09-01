import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { ICategoryProps } from "..";
import { prisma } from "../../lib/database";
import { Navbar } from "../components/navbar";
import { IPostProps, Post } from "../components/post";

export async function getServerSideProps(context: NextPageContext) {
    if(!context.query.id) {
        return {
            notFound: true
        }
    }

    const posts = await prisma.post.findMany({ 
        where: {
            categoryId: parseInt(context.query.id.toString())
        }
    });

    const votes = await prisma.vote.findMany({
        where: {
            categoryID: parseInt(context.query.id.toString())
        }
    });

    console.log(votes);

    const categories = await prisma.category.findMany();
    const selectedCategory = categories.find (category => 
        category.id === parseInt(context.query.id!.toString()
    ));


    if(!categories.length || !selectedCategory) {
        return {
            notFound: true
        }
    }

    return { props: { 
        posts, 
        categories, 
        selectedCategory,
        votes
    }};
}

interface IVoteProps {
    postId: number;
    name: string;
}

export type Props = { 
    posts: IPostProps[];
    categories: ICategoryProps[];
    votes: IVoteProps[];
    selectedCategory: ICategoryProps;
};

const Subjeddit = ({
    posts,
    categories,
    votes,
    selectedCategory
}: Props) => {
    const router = useRouter();

    const getVotes = (postId: number) => {
        console.log(votes);

        if(!votes) {
            return 0;
        }


        return votes.filter(vote => 
            vote.postId === postId
        ).length;
    }
    return (
        <>
            <div className="space-y-3">
                <Navbar 
                    categories={categories} 
                    selectedCategory={selectedCategory.name}
                />
                
                {
                    posts.length ?
                        posts.map((post, key) =>
                        <Post
                            id={post.id}
                            key={key}
                            author={post.author}
                            text={post.text}
                            title={post.title}
                            category={selectedCategory}
                            votes={getVotes(post.id)}
                        /> ) :
                        <div className="flex flex-col justify-center items-center h-96 rounded">
                        <div className="text-3xl font-bold border-b-4 p-3 border-base-300 select-none rounded animate-bounce">
                                <p>😮 Nothing to see here!</p>
                            </div>
                        </div>
                }
            </div>
        </>
    );
}

export default Subjeddit;

export type {
    IVoteProps
};