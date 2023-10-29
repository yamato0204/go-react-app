import React, { useEffect } from "react";
import { client } from "@/libs/axios";
import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { WeekDuration } from "@/types";



 const WeekDuration: React.FC = () => {
  const { data: duration, status } = useQuery<WeekDuration>(['m'], async () => {
    const { data } = await client.get<WeekDuration>('weekDuration', { withCredentials: true });
    return data;
  });

console.log(duration)


  

  if (status === 'loading') {
    return <div>Loading...</div>; 
  }

  if (status === 'error' || !duration) {
    return <div>Error loading data</div>; 
  }
     const formattedDuration = `${duration.hour} 時間 ${duration.minutes} 分`;


  // duration が存在することが保証されたので、安全に表示できます
     return <Text fontSize='2xl' as='b'>今週の積み上げ
           {formattedDuration}
     </Text>;
}

export default WeekDuration;
