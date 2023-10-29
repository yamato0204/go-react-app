import { useForm } from 'react-hook-form'
import {
  
  Input,
  Button,
  Flex,
  Box,
} from '@chakra-ui/react'



import { UseEditForm } from '@/hooks/UseEditForm'

export default function EditForm() {

    const  EditMutation: any  = UseEditForm()

  const {
    handleSubmit,
    register,
   // formState: { errors, isSubmitting },
  } = useForm()

    const onSubmit = async (data: any) => {

        const formData = new FormData();
    formData.append('file', data.file[0]); // ファイルをFormDataに追加


        await EditMutation.mutate(formData)
    
  }

  return (
    <Flex height="80vh" alignItems="center" justifyContent="center">
                <Flex direction="column" background='#BEE3F8' padding={12} rounded={6}>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data"  >
        
                
                    <Input variant="filled"  mb={3} type="file" id='file'
                      {...register("file")} />
                  
                      
<Flex>
                  
                      
</Flex>
                <Button mb={4} backgroundColor="#C6F6D5"  type="submit"
                    >確定</Button>
                    </form>

                </Flex>
            </Flex>
  )
}

