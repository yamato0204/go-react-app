import { Record } from "@/types";
import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";


interface RecordCardProps {
  record: Record;
}
const RecordCard: React.FC<RecordCardProps> = ({ record }) => {
    return (
        <Box ml={20} >
           <Card  mt={4} w="80%" bg={"gray.100"}>
  <CardHeader>
    <Heading size='md'></Heading>
  </CardHeader>

  <CardBody px={24}>
    <Stack divider={<StackDivider />} spacing='8'>
       
        <Box>
        <Heading size='md' textTransform='uppercase'>
         {record.memo}
        </Heading>
       
        <Text pt='2' fontSize='sm'>
         {record.duration}分
                            </Text>
                             <Text pt='2' fontSize='sm'>
          4/11
        </Text>
      </Box>
    </Stack>
  </CardBody>
            </Card >
            


           
        </Box>
    );
}

export default RecordCard;