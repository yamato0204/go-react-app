import Layout from "@/components/Layout/Layout"
import UserLayout from "@/components/Layout/UserLayout";
import { UserProvider } from "@/hooks/userContext";
import { client } from "@/libs/axios"
import { Box } from "@chakra-ui/layout";
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
            <UserProvider>
                
                    <UserLayout />
                
            </UserProvider>
            
       </Layout>
    );

}

export default UserIndex;