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
                console.log(response.data)
                if (response.data == "NoCookie") {
                  console.log("loginへ")
                  router.push("/login")
                } else {
                  console.log("ok")
                  router.push("/home")
                }
              }
            )

  })


    return (
        <Layout>
            <ContentsPage/>  
       </Layout>
    );
}

export default Home;