import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Box,
  Stack,
  Select,
} from '@chakra-ui/react'

import { UseCreateRecords } from '@/hooks/useCreateRecord'
import { client } from '@/libs/axios'
import { useQuery } from '@tanstack/react-query'
import { PostCategory } from '@/types'

export default function RecordForm() {

    const recordMutation: any  = UseCreateRecords()

  const {
    handleSubmit,
    register,
   // formState: { errors, isSubmitting },
  } = useForm()

    const onSubmit = async (data: any) => {
      await recordMutation.mutate({
            category_id: data.category_id,
            memo: data.memo,
            duration: data.duration,
        })  
    }
  
  
  
  const { data:categories, status}  = useQuery(['categories'], async () => {
        const { data } = await client.get<PostCategory[]>('category/get', { withCredentials: true })
        return data
              
    }) 
   
  console.log(categories)

  return (
    <Flex height="80vh" alignItems="center" justifyContent="center">
                <Flex direction="column" background='#BEE3F8' padding={12} rounded={6}>

        <form onSubmit={handleSubmit(onSubmit)} >
          <FormControl mb={4}>
            {status === 'loading' && <div>Loading...</div>}
            {status === 'error' && <div>Error loading categories</div>}
            {status === 'success' && (
              <Select
                placeholder="カテゴリーを選択"
                {...register('category_id')}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            )}
          </FormControl>
                
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