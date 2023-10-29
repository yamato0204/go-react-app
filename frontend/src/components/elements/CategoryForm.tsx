import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Box,
} from '@chakra-ui/react'


import { UseCreateCategory } from '@/hooks/useCreateCategory'

export default function CategoryForm() {

    const recordMutation: any  = UseCreateCategory()

  const {
    handleSubmit,
    register,
   // formState: { errors, isSubmitting },
  } = useForm()

    const onSubmit = async (data: any) => {


        await recordMutation.mutate({
           
            name: data.name,

        })
    
  }

  return (
    <Flex height="80vh" alignItems="center" justifyContent="center">
                <Flex direction="column" background='#BEE3F8' padding={12} rounded={6}>

              <form onSubmit={handleSubmit(onSubmit)} >
                
                    <Input placeholder="登録するカテゴリを入力" variant="filled"  mb={3} type="text"
                        
                          {...register("name")} />
                      
<Flex>
                    
                     
</Flex>
                <Button mb={4} backgroundColor="#C6F6D5"  type="submit"
                    >登録</Button>
                    </form>

                </Flex>
            </Flex>
  )
}
  