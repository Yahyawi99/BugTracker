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
    data = projects
      .filter((project) => project.status === "active")
      .reduce((acc, project, index) => {
        const value = {
          name: `P${index + 1}`,
          Submitters: 0,
          Developers: 0,
          PMs: 0,
        };

        project.team[0].members.forEach((user) => {
          if (user.role === "developer") {
            value.Developers++;
          }

          if (user.role === "PM") {
            value.PMs++;
          }

          if (user.role === "submitter") {
            value.Submitters++;
          }
        });

        if (project.managedBy) {
          value.PMs++;
        }

        !acc.includes(value) && acc.push(value);

        return acc;
      }, []);
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
