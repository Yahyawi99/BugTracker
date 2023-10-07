import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const MyBarChart = ({ projects }) => {
  let data = [];

  if (projects) {
    data = projects.slice(0, 5).reduce(
      (acc, project) => {
        for (let i = 0; i < acc.length; i++) {
          // project.team.forEach((user) => {
          //   if (user.role === "developer") {
          //     acc[i].Developers++;
          //   }

          //   if (user.role === "PM") {
          //     acc[i].PMs++;
          //   }

          //   if (user.role === "submitter") {
          //     acc[i].Submitters++;
          //   }
          // });

          acc[i].Developers = project.team.filter(
            (user) => user.role == "developer"
          ).length;

          if (project.managedBy) {
            acc[i].PMs++;
          }
        }
        console.log(acc);
        return acc;
      },
      [
        {
          name: "P1",
          Submitters: 0,
          Developers: 0,
          PMs: 0,
        },
        {
          name: "P2",
          Submitters: 0,
          Developers: 0,
          PMs: 0,
        },
        {
          name: "P3",
          Submitters: 0,
          Developers: 0,
          PMs: 0,
        },
        {
          name: "P4",
          Submitters: 0,
          Developers: 0,
          PMs: 0,
        },
        {
          name: "P5",
          Submitters: 0,
          Developers: 0,
          PMs: 0,
        },
      ]
    );
  }

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
