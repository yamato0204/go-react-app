
import HomeChart from '../elements/HomeBarChart';
import { Box, Flex, Spacer, WrapItem } from '@chakra-ui/react';
import RecordButton from '../elements/RecordButton';
import TodayDuration from '../elements/TodayDuration';
import WeekDuration from '../elements/WeekDuration';
import CategoryRecordButton from '../elements/CategoryRecordButton';
import HomeBarChart from '../elements/HomeBarChart';
import HomePieChart from '../elements/HomePieChart';
import { wrap } from 'module';




const ContentsPage = () => {


    return (

        <>
    <Box>
                <Flex mt={10} justifyContent='center' flexWrap='wrap'>
                    <Box  mr={4}>
                        <RecordButton  />
                        </Box>
                    <CategoryRecordButton />
  </Flex>
  <Flex mt={10} justifyContent='center' flexWrap='wrap'>
    <Box pr={[0, 10]} mb={[10, 0]}>
      <TodayDuration />
    </Box>
    <Box pr={[0, 10]}>
      <WeekDuration />
    </Box>
  </Flex>
  
                

                <Box  display={{ md: "flex" }} justifyContent={{ base: "center", md: 'center' }}
                     width="100%" alignItems='center'  >
                    
                    <Box ml={{ base: "30", sm: "30", md: "30" }} width="100%" mr={{ md: "10" }} >
                        
                      <HomeBarChart />
                    </Box>

                    
               <Box width="80%"  >
                  <HomePieChart />
                   </Box>
            </Box>







</Box>
   
       
</>
        
    )

   
      
 
}


export default ContentsPage;