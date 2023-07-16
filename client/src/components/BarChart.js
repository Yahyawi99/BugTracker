import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const MyBarChart = () => {
  const data = [
    {
      name: "P1",
      Submitters: 5,
      Developers: 8,
      PMs: 3,
    },
    {
      name: "P2",
      Submitters: 5,
      Developers: 9,
      PMs: 5,
    },
    {
      name: "P3",
      Submitters: 3,
      Developers: 7,
      PMs: 2,
    },
    {
      name: "P4",
      Submitters: 9,
      Developers: 6,
      PMs: 4,
    },
    {
      name: "P5",
      Submitters: 5,
      Developers: 5,
      PMs: 1,
    },
    {
      name: "P6",
      Submitters: 4,
      Developers: 6,
      PMs: 2,
    },
  ];

  return (
    <BarChart
      width={300}
      height={275}
      data={data}
      margin={{
        top: 2,
        right: 40,
        left: -5,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Submitters" stackId="a" fill="#8884d8" />
      <Bar dataKey="Developers" stackId="a" fill="#82ca9d" />
      <Bar dataKey="PMs" stackId="a" fill="#ffc658" />
    </BarChart>
  );
};

export default MyBarChart;
