import { client } from "@/libs/axios";
import { Credential, Record } from "@/types";
import { useMutation} from "@tanstack/react-query";

import { useRouter } from "next/router";
import { UseMutationResult } from "react-query";




export const UseCreateRecords = () => {

    const router = useRouter();

    // const queryClient = useQueryClient()
    const recordMutation = useMutation(
        async (record: Record) =>
            await client.post('/record/create', record, {
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
                console.log("record 成功")
                router.push("/home")
            },
            onError: (err: any) => {
                console.log(err)
            }
        }
    )

    return recordMutation
}
