import { Record, UserData } from "@/types";
import { Box, Card, CardBody, CardHeader, Heading, Image, Stack, StackDivider, Text } from "@chakra-ui/react";


interface RecordCardProps {
  user:  UserData;
}
const UserCard: React.FC<RecordCardProps> = ({ user }) => {
    return (
        <Box ml={20} >
           <Card  mt={4} w="80%" bg={"gray.100"}>
  <CardHeader>
                    <Heading size='md'>
                        <Image
  borderRadius='full'
  boxSize='50px'
  src='https://bit.ly/dan-abramov'
  alt='Dan Abramov'
/>
    </Heading>
  </CardHeader>

  <CardBody px={24}>
    <Stack divider={<StackDivider />} spacing='8'>
       
        <Box>
        <Heading size='md' textTransform='uppercase'>
         {user.name}
        </Heading>
       
      
                            
      </Box>
    </Stack>
  </CardBody>
            </Card >
            


           
        </Box>
    );
}

export default UserCard;