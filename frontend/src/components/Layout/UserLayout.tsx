import HomeChart from '../elements/HomeChart';
import { Box, Center, Container, Grid, useToast } from '@chakra-ui/react';
import RecordCard from '../elements/RecordCard';
import { useQuery } from '@tanstack/react-query';
import { Record } from '@/types';
import axios from 'axios';
import { error } from 'console';
import { client } from '@/libs/axios';
import UserCard from '../elements/UserCard';
import Serch from '../elements/Serch';





const UserPage = () => {
   // const addToast = useToast()

    const { data:users, status}  = useQuery(['records'], async () => {
        const { data } = await client.get<Record[]>('user/get', { withCredentials: true })
        return data
              
    }) 
    console.log(users)



    if (status === 'loading') {
        return <div>loading...</div>
    } else if (status === 'error') {
        return <div>データの読み込みに失敗しました</div>
    } else if (!users || users.length <= 0) {
        return <div>登録されたRecordはありません</div>
    }



    return (

//ここで、for文
        <Container>
        <Serch />
            {users.map((user:Record) => (
                <UserCard  key={user.id} user={user} />
            ))}
           

         
       </Container>

        
    )

   
      
 
}


export default UserPage;