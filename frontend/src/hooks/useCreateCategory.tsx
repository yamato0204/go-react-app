import { client } from "@/libs/axios";
import { Credential, PostCategory, Record } from "@/types";
import { useMutation} from "@tanstack/react-query";

import { useRouter } from "next/router";
import { UseMutationResult } from "react-query";




export const UseCreateCategory = () => {

    const router = useRouter();

    // const queryClient = useQueryClient()
    const categoryMutation = useMutation(
        async (category: PostCategory) =>
            await client.post('/category/create', category, {
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
                console.log("category 成功")
                router.push("/home")
            },
            onError: (err: any) => {
                console.log(err)
            }
        }
    )

    return categoryMutation
}
