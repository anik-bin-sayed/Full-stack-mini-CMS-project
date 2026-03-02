import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useProfileQuery } from "../features/auth/authApi";
import { useEffect } from "react";
import { setUser } from "../features/auth/authSlice";
import Loader from "../components/Loader";

const ProtectedRoute = ({ role }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  const { data, isLoading } = useProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (data?.user && !isAuthenticated) {
      dispatch(setUser(data?.user));
    }
  }, [data, dispatch, isAuthenticated]);

  if (isLoading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/" replace />;

  if (userRole && userRole !== role) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
