import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth/next";

const Page = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = await getServerSession(authOptions as any);
    if(!session){
        redirect("/login");
    }
    if(session){
        redirect("/dashboard");
    }
}

export default Page;