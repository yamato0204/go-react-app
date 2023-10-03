


import { UseMutateAuth } from "@/hooks/useMutateAuth";
import { Button, Flex, Input } from "@chakra-ui/react";
import { Form, useForm } from "react-hook-form";





const Register = () => {

    const {registerMutation} = UseMutateAuth()


    const {
        register,
        handleSubmit,
       // formState: { errors }
    } = useForm();

    const onSubmit = async (data: any) => {

        // console.log(data.username)
        // console.log(data.password)
        await registerMutation.mutate({
            email: data.email,
            password: data.password,

        })
            
        }
    
    

    return (

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
    )
}

export default Register;