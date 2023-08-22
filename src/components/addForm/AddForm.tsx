import { GridColDef } from "@mui/x-data-grid";
import "./addForm.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddForm = (props: Props) => {
  const { handleSubmit, register } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => {
      return fetch(`http://localhost:3000/${props.slug}s`, {
        method: "post",
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

  return (
    <div className='add'>
      <div className='modal'>
        <span className='close' onClick={() => props.setOpen(false)}>
          ⛌
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
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

export default AddForm;
