import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Single from "../../components/single/Single";
import { singleUser } from "../../../data/data";
import "./user.scss";

const User = () => {
  let { id } = useParams();
  //Fetch data and send to Single Component
  const { isLoading, error, data } = useQuery({
    queryKey: ["allusers", id],
    queryFn: () =>
      fetch(`https://my-json-server.typicode.com/mink-a/moke-api/users/${id}`).then((res) => res.json()),
  });

  if (isLoading) return <p>"Loading..."</p>;

  if (error) return <p>"An error has occurred</p>;

  let user = {
    ...singleUser,
    id: data.id,
    img: data.img,
    title: data.firstName,
    info: {
      ...singleUser.info,
      fullname: data.firstName + " " + data.lastName,
      email: data.email,
      phone: data.phone,
      id: data.id,
    },
  };

  return (
    <div className='user'>
      <Single {...user} />
    </div>
  );
};

export default User;
