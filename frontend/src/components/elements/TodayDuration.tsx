import React from "react";
import { client } from "@/libs/axios";
import { TodayDuration } from "@/types";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const TodayDuration: React.FC = () => {
  const { data: duration, status } = useQuery<TodayDuration>(['duration'], async () => {
    const { data } = await client.get<TodayDuration>('todayDuration', { withCredentials: true });
    return data;
  });

  if (status === 'loading') {
    return <div>Loading...</div>; // データを取得中はローディングメッセージを表示
  }

  if (status === 'error' || !duration) {
    return <Text fontSize='4xl' as='b'>今日の積み上げ０分</Text>; // エラーが発生した場合やデータが存在しない場合のエラーメッセージを表示
  }

  // duration が存在することが保証されたので、安全に表示できます
   const formattedDuration = `${duration.hour} 時間 ${duration.minutes} 分`;


  // duration が存在することが保証されたので、安全に表示できます
    return (

        <>
         
   
     
    
 
        <Text fontSize='4xl' as='b'>今日の積み上げ
                </Text>
                <Box>
                    <Text fontSize='4xl' as='b' ml={8}>{formattedDuration}</Text>
                    </Box>
                
    </>
    )
}

export default TodayDuration;
