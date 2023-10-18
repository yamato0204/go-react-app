
import HomeChart from '../elements/HomeChart';
import { Box, Flex, Spacer, WrapItem } from '@chakra-ui/react';
import RecordButton from '../elements/RecordButton';
import TodayDuration from '../elements/TodayDuration';
import WeekDuration from '../elements/WeekDuration';
import CategoryRecordButton from '../elements/CategoryRecordButton';




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