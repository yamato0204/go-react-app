
import { client } from '@/libs/axios'
import { RankingData, UserData } from '@/types'
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, Box, Text, StackDivider, Flex } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
const RankingCard = () => {


//       const { data:users, status}  = useQuery(['data'], async () => {
//         const { data } = await client.get<[]>('/rankingData', { withCredentials: true })
//         return data
              
//     }) 
//     console.log(users)




//     return (
//        <Card>
//   <CardHeader bg="gray.200"> 
//          <Heading size='md'>      
//    今週のランキング</Heading>
//   </CardHeader>

//   <CardBody>
//     <Stack divider={<StackDivider />} spacing='2'>
//       <Box>
//         <Heading size='lg' textTransform='uppercase'>
//          🥇
//         </Heading>
//         <Flex>
//         <Text  ml={20} fontSize='lg'>
//           test2
//         </Text>
//         <Text  mb={2} ml={12} fontSize='lg'>
//           24時間
//         </Text>
//                             </Flex>
//       </Box>
//       <Box>
//      <Heading size='lg' textTransform='uppercase'>
//             🥈                
//         </Heading>
//          <Flex>
//         <Text  ml={20} fontSize='lg'>
//           test2
//         </Text>
//         <Text  mb={2}  ml={12} fontSize='lg'>
//           24時間
//         </Text>
//                             </Flex>
//       </Box>
//       <Box>
//         <Heading size='lg' textTransform='uppercase'>
//          🥉
//                         </Heading>
//                         <Flex>
//         <Text  ml={20} fontSize='lg'>
//           test2
//         </Text>
//         <Text mb={2}  ml={12} fontSize='lg'>
//           24時間
//         </Text>
//                             </Flex>
//       </Box>
//     </Stack>
//   </CardBody>
// </Card>
    //     );
    












     const { data: users, status } = useQuery(['data'], async () => {
        const { data } = await client.get<[]>('/rankingData', { withCredentials: true });

        // データをhourとminutesで昇順にソート
        const sortedData = data.sort((a, b) => {
            const aTotalMinutes = parseInt(a.hour) * 60 + parseInt(a.minutes);
            const bTotalMinutes = parseInt(b.hour) * 60 + parseInt(b.minutes);
            return bTotalMinutes - aTotalMinutes;
        });

        return sortedData;
    });

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <CardHeader bg="gray.200">
                <Heading size='md'>
                    今週のランキング
                </Heading>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='2'>
                    {users.map((user, index) => (
                        <Box key={index}>
                            <Heading size='lg' textTransform='uppercase'>
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                            </Heading>
                            <Flex>
                                <Text ml={20} fontSize='lg'>
                                    {user.name}
                                </Text>
                                <Text mb={2} ml={12} fontSize='lg'>
                                    {user.hour}時間 {user.minutes}分
                                </Text>
                            </Flex>
                        </Box>
                    ))}
                </Stack>
            </CardBody>
        </Card>
    );
};
     

export default RankingCard;