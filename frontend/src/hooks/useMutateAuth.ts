import { client } from "@/libs/axios";
import { Credential } from "@/types";
import { useMutation} from "@tanstack/react-query";

import { useRouter } from "next/router";




export const UseMutateAuth = () => {

    const router = useRouter();

   // const queryClient = useQueryClient()
    const loginMutation = useMutation(
        async (user: Credential) => 
            await client.post('/login', user, {
                withCredentials: true
            }).then(
                (response) => {
                    console.log(response.data)
                    console.log(response.status); // 200
                    console.log(response.headers); // 'OK'

                }
            ),
        {
            onSuccess: () => {
                console.log("login 成功")
                router.push("/home")
            },
            onError: (err: any) => {
                console.log(err)
            }
        }
    )
    const registerMutation = useMutation(
   
        async (user: Credential) => 
            
            await client.post(`/register`, user).then(
               (response) => {
                    console.log(response.data)
                }
            ),
        {
            onSuccess: () => {
             //   queryClient.getQueryData
                console.log("ok")
                
            },
            onError: (err: any) => {
                console.log(err)
            }

        }

    
    )
   

    return { registerMutation, loginMutation }
}

