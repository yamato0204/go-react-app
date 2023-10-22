

import { Box, Flex, Spacer, Text } from '@chakra-ui/react';

import { Record, UserID } from '@/types';
import UserChart from '../elements/UserChart';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/libs/axios';
import RecordCard from '../elements/RecordCard';



const UserPageLayout: React.FC<UserID> = ({ userId }) => {

//userQuery(['records'])
    const { data:users, status } = useQuery(['users'], async () => {
        const { data } = await client.get('user/show', {
            withCredentials: true,
            params: {
    // ここにクエリパラメータを指定する
    ID: userId
  }
        })
        return data
              
    });

  console.log(users)
  if (status === 'loading') {
        return <div>Loading...</div>; // データがロード中の場合、ローディングメッセージを表示
    }

    if (status === 'error') {
        return <div>Error loading data</div>; // データのロードに失敗した場合、エラーメッセージを表示
    }

    return (

<>
       
            <Box h={800} justifyContent='center' alignItems='center' >
                
               
                
                    <Spacer />

                    
                         <Flex  pt={20} pb={10} alignItems="center" justifyContent="center">
                        <Text fontSize='4xl' >
                     {users.userName}
                            </Text>
                            </Flex>
                     
                  

                 <Flex mt={30} mb={10} justifyContent='center' flexWrap='wrap'>
                    <UserChart userId={userId} />
                </Flex>
                
                      {users.userRecord.map((record:Record) => (
                 <RecordCard key={record.id} record={record} />
            ))} 
                    
               

       </Box>
</>
        
    )

   
      
 
}


export default UserPageLayout;