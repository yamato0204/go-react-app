import ContentsPage from "@/components/Layout/HomeLayout";
import Layout from "@/components/Layout/Layout";
import RecordPage from "@/components/Layout/RecordLayout";
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
                  router.push("/record")
                }
              }
            )

  },[])


    return (
        <Layout>
            <RecordPage/>  
       </Layout>
    );
}

export default Home;