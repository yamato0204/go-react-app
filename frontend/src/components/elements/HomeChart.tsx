import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables)

const HomeChart = () => {

    const jstNow = new Date(Date.now() +
        ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
    console.log(jstNow)
   
    //分を時間変換し、y軸に代入。
    //今日の日にち取得し、backに送る＝＞5日分の時間変換された時間データを取得

     const type =  'bar'
   const  data =  {
  labels: ['9/12','9/13'],
  datasets: [{
    label: "物理",
    data: [1.5],
  },{
    label: "it",
    data: [6],
  }],
}
    const options: {} = {
        scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  },
  responsive: false
    }
    
    return (
        <Bar height={300} width={400} data={data} options={options} />
    );
    
}

export default HomeChart;