import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Fragment } from "react";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ViewPersonalInfo from "./pages/Profile/ViewPersonalInfo";

import Layout from "./layout/Layout";
import PrivateRoutes from "./utils/PrivateRoutes";

const publicRoutes = (
  <Route>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>
);

const privateRoutes = (
  <Route element={<PrivateRoutes />}>
    <Route path="/" element={<Layout />} >
      <Route index element={<ViewPersonalInfo />} />
    </Route>
  </Route>
)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      {publicRoutes}
      {privateRoutes}
    </Fragment>
  )
);


function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>)
}

export default App;
