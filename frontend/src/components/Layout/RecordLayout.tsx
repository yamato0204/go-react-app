import HomeChart from '../elements/HomeBarChart';
import { Box, Center, Container, Grid, useToast } from '@chakra-ui/react';
import RecordCard from '../elements/RecordCard';
import { useQuery } from '@tanstack/react-query';
import { Record } from '@/types';
import axios from 'axios';
import { error } from 'console';
import { client } from '@/libs/axios';





const RecordPage = () => {
   // const addToast = useToast()

    const { data:records, status}  = useQuery(['records'], async () => {
        const { data } = await client.get<Record[]>('record/get', { withCredentials: true })
        return data
              
    }) 
    console.log(records)



    if (status === 'loading') {
        return <div>loading...</div>
    } else if (status === 'error') {
        return <div>データの読み込みに失敗しました</div>
    } else if (!records || records.length <= 0) {
        return <div>登録されたRecordはありません</div>
    }



    return (

//ここで、for文
        <Container>
        
            {records.map((record:Record) => (
                 <RecordCard key={record.id} record={record} />
            ))}
           

         
       </Container>

        
    )

   
      
 
}


export default RecordPage;