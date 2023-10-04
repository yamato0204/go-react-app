
import HomeChart from '../elements/HomeChart';
import { Box, Flex } from '@chakra-ui/react';
import RecordButton from '../elements/RecordButton';




const ContentsPage = () => {


    return (

<>
       
            <Box h={800} justifyContent='center' alignItems='center' bg='gray.100'>
                <Box pl={20} pt={20}>
                     <RecordButton />
                </Box>
               
                <Flex mt={40} justifyContent='center' >
                    <HomeChart />
                    </ Flex>

       </Box>
</>
        
    )

   
      
 
}


export default ContentsPage;