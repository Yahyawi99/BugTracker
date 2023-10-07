import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const MyPieChart = () => {
  const data = [
    { name: "High", value: 3 },
    { name: "Medium", value: 2 },
    { name: "Low", value: 1 },
    { name: "urgent", value: 2 },
  ];

  const COLORS = [
    "var(--orange)",
    "var(--black)",
    "var(--gray)",
    "var(--danger)",
  ];

  return (
    <section className="chartContainer">
      <PieChart className="pie-chart" width={270} height={260}>
        <Pie dataKey="value" data={data} cy="45%" outerRadius={75} label>
          {data.map((_, i) => {
            return <Cell key={`cell-${i}`} fill={COLORS[i]} />;
          })}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </section>
  );
};

export default MyPieChart;
