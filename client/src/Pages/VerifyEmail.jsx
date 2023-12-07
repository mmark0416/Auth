import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import customFetch from "../utils/CustomFetch";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = useQuery();

  const verifyEmail = async () => {
    setLoading(true);
    try {
      await customFetch.post("/users/verify-email", {
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      verifyEmail();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }
  return (
    <div>
      <h2>Account Confirmd</h2>
      <Link to="/">Please login</Link>
    </div>
  );
};

export default VerifyEmail;
