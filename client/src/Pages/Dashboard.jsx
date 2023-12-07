import { redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/CustomFetch";
import { removeUser } from "../utils/usaLocalStorage";

export const loader = async () => {
  try {
    const { data } = await customFetch.post("/users/user");
    return data.user;
  } catch (error) {
    removeUser("id");
    return error;
  }
};

const Dashboard = () => {
  const user = useLoaderData();

  return (
    <div className="m-6 flex flex-col gap-6">
      <div>
        <span className="font-bold">id:</span> {user?._id}
      </div>
      <div>
        <span className="font-bold">email:</span> {user?.email}
      </div>
      <div>
        <span className="font-bold">role:</span> {user?.role}
      </div>
    </div>
  );
};

export default Dashboard;
