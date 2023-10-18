
import HomeChart from '../elements/HomeChart';
import { Box, Flex, Spacer, WrapItem } from '@chakra-ui/react';
import RecordButton from '../elements/RecordButton';
import TodayDuration from '../elements/TodayDuration';
import WeekDuration from '../elements/WeekDuration';




const ContentsPage = () => {


    return (

        <>
    <Box>
  <Flex mt={10} justifyContent='center' flexWrap='wrap'>
    <RecordButton />
  </Flex>
  <Flex mt={20} justifyContent='center' flexWrap='wrap'>
    <Box pr={[0, 10]} mb={[10, 0]}>
      <TodayDuration />
    </Box>
    <Box pr={[0, 10]}>
      <WeekDuration />
    </Box>
  </Flex>
  <Flex mt={30} mb={40} justifyContent='center' flexWrap='wrap'>
    <HomeChart />
  </Flex>
</Box>
   
       
</>
        
    )

   
      
 
}


export default ContentsPage;