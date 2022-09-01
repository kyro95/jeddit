import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { prisma } from "../lib/database";

export const getServerSideProps = async (context: NextRouter) => {
  const category = await prisma.category.findFirst();

  if(!category) {
    return {
      notFound: true
    }
  }

  return { props: { category } }
}

export interface ICategoryProps {
  id: string,
  name: string;
}

export type Props = { 
  category: ICategoryProps;
};

const Homepage: React.FC<Props> = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`../homepage/${props.category.id}`)
  }, []);

  return (
    <> 
    </>
  )
}

export default Homepage;