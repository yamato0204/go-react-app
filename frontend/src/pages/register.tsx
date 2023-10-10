


import { UseMutateAuth } from "@/hooks/useMutateAuth";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import Email from "next-auth/providers/email";
import { Form, useForm } from "react-hook-form";


const Register = () => {
    const { registerMutation , loginMutation } = UseMutateAuth();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data: any) => {
        try {
            await registerMutation.mutateAsync({
                email: data.email,
                password: data.password,
                name: data.name,
            }).then(() => 
                loginMutation.mutate({
                    email: data.email,
                    password: data.password
            }))
            // 登録成功時の処理
        } catch (error: any) {
            if (error.response) {
                // サーバーからのエラーレスポンスを処理
                if (error.response.status === 400) {
                    // JSONデータがエラーだった場合の処理
                    setError("email", {
                        type: "manual",
                        message: "emailかユーザー名がすでに存在しています",
                    });
                } else if (error.response.status === 409) {
                    // 値が重複している場合の処理
                    setError("email", {
                        type: "manual",
                        message: "値が重複しています。",
                    });
                }
            } else {
                // ネットワークエラーなどの場合の処理
                console.error("ネットワークエラー:", error.message);
            }
        }
    };

    return (
        <Flex height="80vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background="gray.100" padding={12} rounded={6}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        placeholder="sample@sample.com"
                        variant="filled"
                        mb={3}
                        type="email"
                        {...register("email")}
                    />
                    <Input
                        placeholder="********"
                        variant="filled"
                        mb={6}
                        type="password"
                        {...register("password")}
                    />
                    <Input
                        placeholder="ユーザー名は一意の名前にしてください"
                        variant="filled"
                        mb={6}
                        type="text"
                        {...register("name")}
                    />
                    {errors.email && <Text color="red.500">{errors.email.message}</Text>}
                    <Button mb={6} colorScheme="teal" type="submit">
                        登録
                    </Button>
                </form>
            </Flex>
        </Flex>
    );
};

export default Register;
