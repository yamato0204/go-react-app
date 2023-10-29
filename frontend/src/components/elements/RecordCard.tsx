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
            <Heading bg={"gray.300"} size='md'>{record.name }</Heading>
  </CardHeader>

  <CardBody px={24}>
    <Stack divider={<StackDivider />} spacing='8'>
       
        <Box>
        <Heading size='md' textTransform='uppercase'>
         {record.memo}
        </Heading>
       
        <Text pt='2' fontSize='sm'>
        時間： {record.duration}分
                            </Text>
                             <Text pt='2' fontSize='sm'>
          {record.created_at}
        </Text>
      </Box>
    </Stack>
  </CardBody>
            </Card >
            


           
        </Box>
    );
}

export default RecordCard;