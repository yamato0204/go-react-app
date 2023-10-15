
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, Box, Text, StackDivider, Flex } from '@chakra-ui/react'
const RankingCard = () => {
    return (
       <Card>
  <CardHeader bg="gray.200"> 
         <Heading size='md'>      
   今週のランキング</Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='2'>
      <Box>
        <Heading size='lg' textTransform='uppercase'>
         🥇
        </Heading>
        <Flex>
        <Text  ml={20} fontSize='lg'>
          test2
        </Text>
        <Text  mb={2} ml={12} fontSize='lg'>
          24時間
        </Text>
                            </Flex>
      </Box>
      <Box>
     <Heading size='lg' textTransform='uppercase'>
            🥈                
        </Heading>
         <Flex>
        <Text  ml={20} fontSize='lg'>
          test2
        </Text>
        <Text  mb={2}  ml={12} fontSize='lg'>
          24時間
        </Text>
                            </Flex>
      </Box>
      <Box>
        <Heading size='lg' textTransform='uppercase'>
         🥉
                        </Heading>
                        <Flex>
        <Text  ml={20} fontSize='lg'>
          test2
        </Text>
        <Text mb={2}  ml={12} fontSize='lg'>
          24時間
        </Text>
                            </Flex>
      </Box>
    </Stack>
  </CardBody>
</Card>
    );
}

export default RankingCard;