import { GridColDef } from "@mui/x-data-grid";
import "./editForm.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type Props = {
  user: {
    email: string;
    phone: string;
    fullname: string;
    id: string;
  };
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditForm = (props: Props) => {
  const { handleSubmit, register, setValue } = useForm();
  const queryClient = useQueryClient();

  const { email, phone, fullname, id } = props.user;
  const [firstName, lastName] = fullname.split(" ");

  const mutation = useMutation({
    mutationFn: (data) => {
      return fetch(`http://localhost:3000/${props.slug}s/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}s`]);
    },
  });

  const onSubmit = (data: any) => {
    const user = { ...data };
    mutation.mutate(user);
    props.setOpen(false);
  };

  useEffect(() => {
    setValue("firstName", firstName);
    setValue("lastName", lastName);
    setValue("email", email);
    setValue("phone", phone);
  }, []);

  return (
    <div className='add'>
      <div className='modal'>
        <span className='close' onClick={() => props.setOpen(false)}>
          ⛌
        </span>
        <h1>Update {props.slug}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {props.columns
            .filter(
              (item) =>
                item.field !== "id" &&
                item.field !== "img" &&
                item.field !== "createdAt" &&
                item.field !== "verified"
            )
            .map((column) => {
              return (
                <div key={column.field} className='item'>
                  <label>{column.headerName}</label>
                  <input
                    type={column.type}
                    placeholder={column.field}
                    {...register(column.field, { required: true })}
                  />
                </div>
              );
            })}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
