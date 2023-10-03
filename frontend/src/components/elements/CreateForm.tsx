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

import { UseCreateRecords } from '@/hooks/useCreateRecord'

export default function RecordForm() {

    const recordMutation: any  = UseCreateRecords()

  const {
    handleSubmit,
    register,
   // formState: { errors, isSubmitting },
  } = useForm()

    const onSubmit = async (data: any) => {


        await recordMutation.mutate({
            memo: data.memo,
            duration: data.duration,
            

        })
    
  }

  return (
    <Flex height="80vh" alignItems="center" justifyContent="center">
                <Flex direction="column" background='#BEE3F8' padding={12} rounded={6}>

              <form onSubmit={handleSubmit(onSubmit)} >
                
                    <Input placeholder="メモ" variant="filled"  mb={3} type="text"
                        
                          {...register("memo")} />
                      
<Flex>
                    <Input placeholder="分で記入してください" variant="filled" mr={3}　mb={8} type="number"
                         {...register("duration")} 
                      />
                      <Box mt={3}>
                          分
                          </Box>
</Flex>
                <Button mb={4} backgroundColor="#C6F6D5"  type="submit"
                    >積み上げ</Button>
                    </form>

                </Flex>
            </Flex>
  )
}