import EditLayout from "@/components/Layout/EditLayout";
import ContentsPage from "@/components/Layout/HomeLayout";
import Layout from "@/components/Layout/Layout";
import { client } from "@/libs/axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";



const Home: NextPage = () => {

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
                         router.push("/edit")
                    )
                 
                }
              }
            )

  },[])


    return (
        <Layout>
            <EditLayout/>  
       </Layout>
    );
}

export default Home;