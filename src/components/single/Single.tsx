import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./single.scss";
import { useState } from "react";
import EditForm from "../editForm/EditForm";

type Props = {
  id: number;
  img?: string;
  title: string;
  info: {
    email: string;
    phone: string;
    fullname: string;
    id: string;
  };
  chart?: {
    dataKeys: { name: string; color: string }[];
    data: object[];
  };
  activities?: { time: string; text: string }[];
};

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },
];

const Single = (props: Props) => {
  const [fopen, setfOpen] = useState<boolean>(false);
  const user = props.info;

  return (
    <div className='single'>
      <div className='view'>
        <div className='info'>
          <div className='topInfo'>
            {props.img && <img src={props.img} alt='' />}
            <h1>{props.title}</h1>
            <button onClick={() => setfOpen(true)}>Update</button>
          </div>
          <div className='details'>
            {Object.entries(props.info).map((item) => (
              <div className='item' key={item[0]}>
                <span className='itemTitle'>{item[0]}</span>
                <span className='itemValue'>{item[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        {props.chart && (
          <div className='chart'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                    type='monotone'
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className='activities'>
        <h2>Latest Activities</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {fopen && (
        <EditForm
          user={user}
          slug='user'
          columns={columns}
          setOpen={setfOpen}
        />
      )}
    </div>
  );
};

export default Single;
