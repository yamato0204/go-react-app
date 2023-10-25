import { client } from "@/libs/axios";
import {  Record } from "@/types";
import { useMutation} from "@tanstack/react-query";

import { useRouter } from "next/router";





export const UseEditForm = () => {

    const router = useRouter();

    //const queryClient = useQueryClient()
    const EditMutation = useMutation(
        async (editData: any) =>
            await client.post('/edit/post', editData, {
                withCredentials: true,
                headers: {
          'Content-Type': 'multipart/form-data', // Set proper Content-Type header
        },
            }).then(
                (response) => {
                    console.log(response.data)
                    console.log(response.status); // 200
                    console.log(response.headers); // 'OK'

                }
            ),
        {
            onSuccess: () => {
                console.log("record 成功")
                router.push("/home")
            },
            onError: (err: any) => {
                console.log(err)
            }
        }
    )

    return EditMutation
}
