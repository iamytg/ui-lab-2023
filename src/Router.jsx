import { Link, Outlet, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home";
import FormValidations from "./pages/forms/FormValidations";

const router = () => {
  return (
    <Routes>
      <Route path="login" element={<div>login</div>} />

      <Route path="/" element={<Home />} />
      <Route path="forms/validations" element={<FormValidations />} />

      <Route
        path="protected"
        element={<ProtectedRoute component={<Outlet />} />}
      >
        <Route
          index
          element={
            <div>
              // protected index // <Link to="/">go to root</Link>
              //{" "}
            </div>
          }
        />
        <Route path="aa" element={<div>aa</div>} />
      </Route>
    </Routes>
  );
};
export default router;
