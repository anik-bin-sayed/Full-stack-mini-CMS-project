import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Loader from "./components/Loader";
import { setUser } from "./features/auth/authSlice";
import { useProfileQuery } from "./features/auth/authApi";

// Public Pages
const Root = lazy(() => import("./pages/Root"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));

// Authenticated and Instructor Pages (Must be userRole === instructor) imports
const ManageLesson = lazy(() => import("./pages/instructor/ManageLesson"));
const MyCourses = lazy(() => import("./pages/instructor/MyCourses"));
const AllCourses = lazy(() => import("./pages/instructor/AllCourse"));
const EditCourse = lazy(() => import("./pages/instructor/EditCourse"));
const CreateCourse = lazy(() => import("./pages/instructor/CreateCourse"));
const InstructorDashboard = lazy(
  () => import("./pages/instructor/InstructorDashboard"),
);

// Authenticated and Student Pages (Must be userRole === student) imports
const Courses = lazy(() => import("./pages/student/AllCourse"));
const Dashboard = lazy(() => import("./pages/student/Dashboard"));
const Course = lazy(() => import("./pages/student/enrollCourseDetails/Course"));
const StudentEnrolledCourses = lazy(
  () => import("./pages/enrollments/StudentEnrolledCourse"),
);

const CourseDetails = lazy(() => import("./pages/courses/CourseDetails"));

// Route Guards imports
const PublicRoute = lazy(() => import("./routes/PublicRoute"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));

// Not Found Page
const NotFound = lazy(() => import("./components/NotFound"));

// Global Loader
const GlobalLoader = lazy(() => import("./components/Loader/GlobalLoader"));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { data } = useProfileQuery(undefined, {
    skip: !isAuthenticated,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data?.user));
    }
  }, [data, dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<GlobalLoader loading={true} />}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Courses />} />
            <Route path="details/:id" element={<CourseDetails />} />
          </Route>

          <Route element={<PublicRoute redirectTo="/" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute role="instructor" />}>
            <Route path="/instructor" element={<InstructorDashboard />}>
              <Route path="courses" element={<AllCourses />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="create" element={<CreateCourse />} />
              <Route path="details/:id" element={<CourseDetails />} />
              <Route path="edit/:id" element={<EditCourse />} />
              <Route path="manage-lessons/:id" element={<ManageLesson />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute role="student" />}>
            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route path="courses" element={<AllCourses />} />
              <Route path="my-courses" element={<StudentEnrolledCourses />} />
              <Route path="my-courses/:id" element={<Course />} />
              <Route path="details/:id" element={<CourseDetails />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
