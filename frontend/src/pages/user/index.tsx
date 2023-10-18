import Layout from "@/components/Layout/Layout"
import UserLayout from "@/components/Layout/UserLayout";
import { client } from "@/libs/axios"
import { NextPage } from "next"


import { useRouter } from "next/router";
import { useEffect } from "react";



const UserIndex: NextPage = () => {

    const router = useRouter()

    useEffect(() => {

        client.get('/cookie', {
            withCredentials: true
        }).then(
            (response) => {
              
                if (response.data == "NoCookie") {
                    return (
                        router.push("/login")
                    )
                 
                } else {
                 
                    return (
                        router.push("/user")
                    )
                 
                }
            }
        )

    }, []);


    return (
        <Layout>
            <UserLayout />
       </Layout>
    );

}

export default UserIndex;