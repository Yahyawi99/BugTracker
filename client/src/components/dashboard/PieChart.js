import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const MyPieChart = ({ projects }) => {
  let data = [];

  if (projects) {
    data = projects.reduce(
      (acc, prev) => {
        for (let i = 0; i < acc.length; i++) {
          if (acc[i].name === prev.priority) {
            acc[i].value++;
          }
        }

        return acc;
      },
      [
        { name: "urgent", value: 0, color: "var(--danger)" },
        { name: "high", value: 0, color: "var(--orange)" },
        { name: "medium", value: 0, color: "var(--black)" },
        { name: "low", value: 0, color: "var(--gray)" },
      ]
    );
  }

  data = data.filter((priority) => priority.value > 0);

  return (
    <section className="chartContainer">
      <PieChart className="pie-chart" width={270} height={260}>
        <Pie dataKey="value" data={data} cy="45%" outerRadius={75} label>
          {data.map((value, i) => {
            return <Cell key={`cell-${i}`} fill={value.color} />;
          })}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </section>
  );
};

export default MyPieChart;
