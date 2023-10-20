
import { client } from "@/libs/axios";
import { ChartData } from "@/types";
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

export default UserChart;






