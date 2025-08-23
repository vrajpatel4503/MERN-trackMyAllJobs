import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import { useSelector } from "react-redux";

// ========== All Pages import ==========
import PublicLayout from "./components/Layout/PublicLayout.jsx";
import NoLoginHomePage from "./Pages/NoLoginHomePage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home.jsx";
import ProtectedUserRoutes from "./components/ProtectedRoutes/ProtectedUserRoutes.jsx";
import Profile from "./Pages/Profile.jsx";
import EditProfile from "./components/Profile/EditProfile.jsx";
import BookMarkJob from "./components/BookMark/BookMarkJob.jsx";
import ViewJob from "./components/Job/ViewJob.jsx";
import AddedNewJob from "./components/Home/AddedNewJob.jsx";
import EditJob from "./components/Job/EditJob.jsx";

const AppRoutes = () => {
  // React-Router-dom
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<NoLoginHomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes */}

        {/* Home */}
        <Route element={<PublicLayout />}>
          <Route
            path="/home"
            element={
              <ProtectedUserRoutes>
                <Home />
              </ProtectedUserRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedUserRoutes>
                <Profile />
              </ProtectedUserRoutes>
            }
          />
          {/* Edit Profile */}
          <Route
            path="/manage-profile"
            element={
              <ProtectedUserRoutes>
                <EditProfile />
              </ProtectedUserRoutes>
            }
          />
          {/* BookMark job */}
          <Route
            path="/bookmark-job"
            element={
              <ProtectedUserRoutes>
                <BookMarkJob />
              </ProtectedUserRoutes>
            }
          />

          {/* Route for view-job by jobId */}
          <Route
            path="/view-job/:jobId"
            element={
              <ProtectedUserRoutes>
                <ViewJob />
              </ProtectedUserRoutes>
            }
          />

          {/* Routes for add new job */}
          <Route
            path="/add-new-job"
            element={
              <ProtectedUserRoutes>
                <AddedNewJob />
              </ProtectedUserRoutes>
            }
          />

          {/* Route for edit-job by jobId */}
          <Route
            path="/edit-job/:jobId"
            element={
              <ProtectedUserRoutes>
                <EditJob />
              </ProtectedUserRoutes>
            }
          />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
