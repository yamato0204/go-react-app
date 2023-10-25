import { client } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const HomePieChart = () => {
  const { data: pie, status } = useQuery(['Pie'], async () => {
    const { data } = await client.get('PieChartData', { withCredentials: true });
    return data;
  });

  if (status !== 'success' || !pie) {
    return null;
  }

    console.log(pie)
  const labels = pie.map(item => item.name);
  const dataValues = pie.map(item => item.amount);
  const backgroundColors = pie.map(item => `rgba(${item.color_r}, ${item.color_g}, ${item.color_b}, ${item.color_a /50})`);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default HomePieChart;
