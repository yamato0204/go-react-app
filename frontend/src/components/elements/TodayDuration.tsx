import React from "react";
import { client } from "@/libs/axios";
import { TodayDuration } from "@/types";
import { Box, Text } from "@chakra-ui/react";
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
    return <div>Error loading data</div>; // エラーが発生した場合やデータが存在しない場合のエラーメッセージを表示
  }

  // duration が存在することが保証されたので、安全に表示できます
  return <Text fontSize='4xl' as='b'>今日の積み上げ{duration}分</Text>;
}

export default TodayDuration;