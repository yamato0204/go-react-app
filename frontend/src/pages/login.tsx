import { UseMutateAuth } from "@/hooks/useMutateAuth";
import { Button, Flex, Input } from "@chakra-ui/react";
import { Form, useForm } from "react-hook-form";




const Login = () => {

    const {loginMutation} = UseMutateAuth()


    const {
        register,
        handleSubmit,
       // formState: { errors }
    } = useForm();

    const onSubmit = async (data: any) => {

        // console.log(data.username)
        // console.log(data.password)
        await loginMutation.mutate({
            email: data.email,
            password: data.password,

        })
            
        }
    
    

    return (

        // < className="h-screen w-screen flex justify-center items-center">
        //     <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        //         onSubmit={handleSubmit(onSubmit)}>
        //         <div className="mb-4">
        //             <label className="block text-gray-700 text-sm font-bold mb-2">
        //                 Email
        //             </label>
        //             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //                 id="email" type="text" placeholder="Email" {...register("email")} />
        //         </div>
        //         <div className="mb-6">
        //             <label className="block text-gray-700 text-sm font-bold mb-2">
        //                 Password
        //             </label>
        //             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        //                 id="password" type="password" placeholder="******************" {...register("password")} />

        //         </div>
        //         <div className="flex items-center justify-between">

        //             <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">

        //                 Login
        //             </button>


        //             <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        //                 Forgot Password?
        //             </a>
        //         </div>
        //     </form>


       
        <Flex height="80vh" alignItems="center" justifyContent="center">
                <Flex direction="column" background="gray.100" padding={12} rounded={6}>

                 <form  onSubmit={handleSubmit(onSubmit)} >
                    <Input placeholder="sample@sample.com" variant="filled" mb={3} type="email"
                        
                         {...register("email")} />

                    <Input placeholder="********" variant="filled" mb={6} type="password"
                         {...register("password")} 
                        />

                <Button mb={6} colorScheme="teal"  type="submit"
                    >login</Button>
                    </form>

                </Flex>
            </Flex>

       
    );
}

export default Login;