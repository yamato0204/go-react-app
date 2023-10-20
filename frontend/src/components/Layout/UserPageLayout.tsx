

import { Box, Flex, Spacer } from '@chakra-ui/react';

import { UserID } from '@/types';
import UserChart from '../elements/UserChart';




const UserPageLayout: React.FC<UserID> = ({ userId }) => {


    return (

<>
       
            <Box h={800} justifyContent='center' alignItems='center' bg='gray.100'>
                
                <Flex >
                
                    <Spacer />
                    <Box pr={40}>
                      {userId}
                        </Box>
                    </Flex>

                 <Flex mt={30} mb={40} justifyContent='center' flexWrap='wrap'>
                <UserChart userId={userId}/>
                </Flex>

       </Box>
</>
        
    )

   
      
 
}


export default UserPageLayout;