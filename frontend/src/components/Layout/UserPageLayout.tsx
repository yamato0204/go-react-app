
import HomeChart from '../elements/HomeChart';
import { Box, Flex, Spacer } from '@chakra-ui/react';
import RecordButton from '../elements/RecordButton';
import TodayDuration from '../elements/TodayDuration';
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

                <UserChart userId={userId}/>
                <Flex mt={40} justifyContent='center' >
                   
                    </ Flex>

       </Box>
</>
        
    )

   
      
 
}


export default UserPageLayout;