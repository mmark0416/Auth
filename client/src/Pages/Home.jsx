import img from "../assets/images/auth.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex m-6 justify-center">
      <div className="space-y-6 w-2/4">
        <div className="text-4xl text-center font-bold mb-20">
          Auth Workflow
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim.
        </p>
        <p>
          Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In
          enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
          dictum felis eu pede mollis pretium.
        </p>
        <div className="flex gap-12 justify-center">
          <Link className="btn" to="/login">
            Login
          </Link>
          <Link className="btn" to="/register">
            Register
          </Link>
        </div>
      </div>
      <div>
        <img className="max-h-[400px]" src={img} alt="img" />
      </div>
    </div>
  );
};

export default Home;
