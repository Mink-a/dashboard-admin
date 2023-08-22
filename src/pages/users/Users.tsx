import { useQuery } from "@tanstack/react-query";

import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import AddForm from "../../components/addForm/AddForm";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt='' />;
    },
  },
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

const getUsers = () =>
  fetch("https://my-json-server.typicode.com/mink-a/moke-api/users").then((res) => res.json());

function Users() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: getUsers,
  });
  const [open, setOpen] = useState<boolean>(false);

  if (isLoading) return <p>"Loading..."</p>;

  if (error) return <p>"An error has occurred</p>;

  return (
    <div className='users'>
      <div className='info'>
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {/* <DataTable slug='users' columns={columns} rows={userRows} /> */}
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable
          slug='users'
          columns={columns}
          rows={[...data].sort((a, b) => b.id - a.id)}
        />
      )}
      {open && <AddForm slug='user' columns={columns} setOpen={setOpen} />}
    </div>
  );
}

export default Users;
