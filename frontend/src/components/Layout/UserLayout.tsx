import HomeChart from '../elements/HomeBarChart';
import { Box, Center, Container, Flex, Grid, Text, useToast } from '@chakra-ui/react';
import RecordCard from '../elements/RecordCard';
import { useQuery } from '@tanstack/react-query';
import { Record, UserData } from '@/types';
import axios from 'axios';
import { error } from 'console';
import { client } from '@/libs/axios';
import UserCard from '../elements/UserCard';
import Serch from '../elements/Serch';
import { useUser } from '@/hooks/userContext';
import RankingCard from '../elements/RankingCard';
import { useEffect } from 'react';







const UserPage: React.FC = () => {
   // const addToast = useToast()

   

  const stateUser: any = useUser()
     

    const { data: users, status, refetch } = useQuery(['records'], async () => {
        const { data } = await client.get<UserData[]>('user/get', { withCredentials: true })
        return data
              
    },

    
    );


    useEffect(() => {
    refetch(); // stateUser が変更されたときにクエリを再実行する
  }, [stateUser]);
   
    console.log(users)


    if (status === 'loading') {
        return <div>loading...</div>
    } else if (status === 'error') {
        return <div>データの読み込みに失敗しました</div>
    } else if (!users || users.length <= 0) {
        return <div>登録されたRecordはありません</div>
    }

   
    const filteredData = users.filter(user => {
        const userName = user.name || ''; // user.nameがnullの場合に備えてデフォルト値を設定
        return userName.toLowerCase().includes(stateUser?.toLowerCase() || ''); // stateUserがnullの場合に備えてデフォルト値を設定
    });



    return (
//align-items　消したら、上部に固定された

        <Container >
            
            <Serch />
            <Box width="100%" position={{ md: "sticky" }} top={{ md: 0 }} zIndex={{ md :"docked"}}  >
                
                <Box display={{ md: "flex" }} justifyContent={{ base: "center", md: 'end' }}
                     width={{ md: '100%' }} >
                    
                    <Box ml={{ md: "-60" }} width="100%" mr={{ md: "10" }} >
                        <RankingCard />
                    </Box>

                    
               <Box width="80%" pl={4} >
                    {
                        filteredData.map((user: UserData) => (
                            <UserCard  key={user.id} user={user}/>   ))
                    }
                   </Box>
            </Box>
            </Box>

            </Container>
   
    )

 
}


export default UserPage;