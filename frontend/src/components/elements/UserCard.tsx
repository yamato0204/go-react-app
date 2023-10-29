import { Record, UserData } from "@/types";
import { Box, Card, CardBody, CardHeader, Heading, Image, Stack, StackDivider, Text } from "@chakra-ui/react";
import Link from "next/link";


interface RecordCardProps {
  user:  UserData;
}
const UserCard: React.FC<RecordCardProps> = ({ user }) => {
    return (
        <Box ml={10} width={{ md:"100%"}} >
           <Card  mt={4}  width={{ md:"100%"}} bg={"gray.100"}>
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
                                
                                {/* <Link href={`/user/${user.id}`}>{user.name}</Link> */}
                                <a href={`/user/${user.id}`}>{user.name} </a>
                                

        </Heading>
       
      
                            
      </Box>
    </Stack>
  </CardBody>
            </Card >
            


           
        </Box>
    );
}

export default UserCard;