import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="mt-52 flex items-center flex-col gap-10">
      <p className="font-bold text-4xl">Something went wrong </p>
      <Link className="btn" to="/">
        Home page
      </Link>
    </div>
  );
};

export default Error;
