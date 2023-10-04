import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables)

const HomeChart = () => {


     const type =  'bar'
   const  data =  {
  labels: ['9/12', '9/13', '9/14',],
  datasets: [{
    label: "物理",
    data: [70, 30, 30],
  },{
    label: "it",
    data: [83, 90, 95],
  },{
    label: "英語",
    data: [75, 85, 93,],
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