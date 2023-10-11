import { client } from "@/libs/axios";
import { ChartData, UserID } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables)

const UserChart: React.FC<UserID> = ({ userId }) => {


   let { data:records, status}  = useQuery(['records'], async () => {
       const { data } = await client.get<ChartData[]>('user/show', {
           withCredentials: true,
            params: {
    // ここにクエリパラメータを指定する
    ID: userId 
  }
       })
        return data
              
    }) 

  console.log(records)
  

    if (status === 'loading') {
        return <div>loading...</div>
    } else if (status === 'error') {
        return <div>データの読み込みに失敗しました</div>
    } else if (!records || records.length <= 0) {
        return <div>登録されたRecordはありません</div>
    }   
     
  
  // 日付ごとの合計時間を計算
  const dataByDate :any = {};
  records.forEach(record => {
    const date: string = record.day;
    const day :any = record.duration
    const duration: any = parseFloat(day) ;
    if (dataByDate[date]) {
      dataByDate[date] += duration;
    } else {
      dataByDate[date] = duration;
    }
  });

  // 日付の配列と合計時間の配列を作成
  const dates = Object.keys(dataByDate);
  const durations = dates.map(date => dataByDate[date]);

  const data = {
    labels: dates, // 日付の配列
    datasets: [
      {
        label: "時間",
        data: durations, // 合計時間の配列
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // グラフの色
        borderColor: 'rgba(75, 192, 192, 1)', // 枠線の色
        borderWidth: 1, // 枠線の太さ
      }
    ]
  };
  
    const options = {
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                type: 'linear', // y軸のスケールタイプを指定します。linearは数値を表す軸です。
                ticks: {
                    beginAtZero: true, // グラフの最小値を0から始める場合はtrueに設定します。
                    callback: function (value: any) {
                        return value + ' 時間'; // ラベルに単位（' 時間'）を追加します。
                    }
                }
            }
        },
        responsive: false
    };
  
    return (
       

     <Bar height={300} width={400} data={data} options={options} />
    );
    
}

export default UserChart;