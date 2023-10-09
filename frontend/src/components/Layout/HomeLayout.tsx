
import HomeChart from '../elements/HomeChart';
import { Box, Flex, Spacer } from '@chakra-ui/react';
import RecordButton from '../elements/RecordButton';
import TodayDuration from '../elements/TodayDuration';




const ContentsPage = () => {


    return (

<>
       
            <Box h={800} justifyContent='center' alignItems='center' bg='gray.100'>
                
                <Flex >
                <Box pl={20} pt={20}>
                     <RecordButton />
                    </Box>
                    <Spacer />
                    <Box pr={40}>
                        <TodayDuration />
                        </Box>
                    </Flex>

               
                <Flex mt={40} justifyContent='center' >
                    <HomeChart />
                    </ Flex>

       </Box>
</>
        
    )

   
      
 
}


export default ContentsPage;