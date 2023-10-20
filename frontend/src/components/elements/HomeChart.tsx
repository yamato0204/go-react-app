
import { client } from "@/libs/axios";
import { ChartData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables)


const HomeChart = () => {
    let { data: records, status } = useQuery(['records'], async () => {
        const { data } = await client.get<ChartData[]>('chartData', { withCredentials: true });
        return data;
    });

    // records データが undefined の場合はデフォルトで空配列を使う
    records = records || [];

    const convertData = (records) => {
        const dates = [...new Set(records.map(record => record.day))]; // ユニークな日付を取得
        const uniqueNames = [...new Set(records.map(record => record.name))];

        const datasets = uniqueNames.map(name => {
            const data = dates.map(date => {
                const record = records.find(r => r.name === name && r.day === date);
                return record ? record.duration : 0;
            });

            return {
                label: name,
                data: data,
                backgroundColor: `rgba(${records.find(record => record.name === name).color_r},
                                       ${records.find(record => record.name === name).color_g},
                                       ${records.find(record => record.name === name).color_b},
                                       ${records.find(record => record.name === name).color_a })`
            };
        });

        return {
            labels: dates,
            datasets: datasets
        };
    };

    const data = convertData(records);

    const options = {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        },
        responsive: false
    };

    return (
        <Bar height={300} width={400} data={data} options={options} />
    );
};

export default HomeChart;











// import { client } from "@/libs/axios";
// import { ChartData } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import { Chart, registerables } from "chart.js";
// import { Bar } from "react-chartjs-2";

// Chart.register(...registerables)


// const HomeChart = () => {
//   const { data: records, status } = useQuery(['records'], async () => {
//     const { data } = await client.get<ChartDataResponse[]>('chartData', {
//       withCredentials: true,
//     });
//     return data;
//   });

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'error') {
//     return <div>Error loading data</div>;
//   }

//   console.log(records)
//   // バックエンドから受け取ったデータを適切な形式に変換
//   const convertedData = records.map((record) => {
//     return {
//       label: record.name,
//       data: [record.duration], // データは分から時間に変換されていると仮定
//       backgroundColor: `rgba(${record.color_r}, ${record.color_g}, ${record.color_b}, ${record.color_a})`,
//     };
//   });

//   //const labels = records.map((record) => record.day);
//   const labels = [...new Set(records.map((record) => record.day))];


//   const data = {
//     labels: labels,
//     datasets: convertedData,
//   };

//   const options = {
//     scales: {
//       x: {
//         stacked: true,
//       },
//       y: {
//         stacked: true,
//         type: 'linear',
//         ticks: {
//           beginAtZero: true, // グラフの最小値を0から始める場合はtrueに設定します。
//           callback: function (value: any) {
//             return value + ' 時間'; // ラベルに単位（' 時間'）を追加します。
//           }
//         }
//       }
//     },
//     responsive: false,
//   };

//   return <Bar height={300} width={400} data={data} options={options} />;
// };

// export default HomeChart;





























// const HomeChart = () => {


//    let { data:records, status}  = useQuery(['records'], async () => {
//         const { data } = await client.get<ChartData[]>('chartData', { withCredentials: true })
//         return data
              
//     }) 

//   console.log(records)
  

//     if (status === 'loading') {
//         return <div>loading...</div>
//     } else if (status === 'error') {
//         return <div>データの読み込みに失敗しました</div>
//     } else if (!records || records.length <= 0) {
//         return <div>登録されたRecordはありません</div>
//     }   
  
//   // 日付ごとの合計時間を計算
//   const dataByDate :any = {};
//   records.forEach(record => {
//     const date: string = record.day;
//     const day :any = record.duration
//     const duration: any = parseFloat(day) ;
//     if (dataByDate[date]) {
//       dataByDate[date] += duration;
//     } else {
//       dataByDate[date] = duration;
//     }
//   });

//   // 日付の配列と合計時間の配列を作成
//   const dates = Object.keys(dataByDate);
//   const durations = dates.map(date => dataByDate[date]);

//   const data = {
//     labels: dates, // 日付の配列
//     datasets: [
//       {
//         label: "時間",
//         data: durations, // 合計時間の配列
//         backgroundColor: 'rgba(246, 223, 220, 150)', // グラフの色
//         borderColor: 'rgba(6246, 223, 220, 150)', // 枠線の色
//         borderWidth: 1, // 枠線の太さ
//       }
//     ]
//   };

  
  
//   const options = {
//   scales: {
//     x: {
//       stacked: true,
//     },
//     y: {
//       stacked: true,
//       type: 'linear', // y軸のスケールタイプを指定します。linearは数値を表す軸です。
//       ticks: {
//         beginAtZero: true, // グラフの最小値を0から始める場合はtrueに設定します。
//         callback: function(value :any) {
//           return value + ' 時間'; // ラベルに単位（' 時間'）を追加します。
//         }
//       }
//     }
//   },
//   responsive: false
// };
//     return (
//         <Bar height={300} width={400} data={data} options={options} />
//     );
    
// }

// export default HomeChart;
















// const HomeChart = () => {

//     const jstNow = new Date(Date.now() +
//         ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
//     console.log(jstNow)

//     //分を時間変換し、y軸に代入。
//     //今日の日にち取得し、backに送る＝＞5日分の時間変換された時間データを取得

//      const type =  'bar'
//    const  data =  {
//   labels: ['9/12', '9/13', '9/14',],
//   datasets: [{
//     label: "物理",
//     data: [70, 30, 30],
//   },{
//     label: "it",
//     data: [83, 90, 95],
//   },{
//     label: "英語",
//     data: [75, 85, 93,],
//   }],
// }
//     const options: {} = {
//         scales: {
//     x: {
//       stacked: true,
//     },
//     y: {
//       stacked: true
//     }
//   },
//   responsive: false
//     }
    
//     return (
//         <Bar height={300} width={400} data={data} options={options} />
//     );
    
// }
// export default HomeChart;

//      const type =  'bar'
//    let  data =  {
//   labels: ['9/13'],
//   datasets: [{
//     label: "物理",
//     data: [1.5],
//   }]
// }
//     const options: {} = {
//         scales: {
//     x: {
//       stacked: true,
//     },
//     y: {
//       stacked: true
//     }
//   },
//   responsive: false
//     }
  

// const options = {
  //   scales: {
  //     x: {
  //       stacked: true,
  //     },
  //     y: {
  //       stacked: true,
  //     }
  //   },
  //   responsive: false
  // };