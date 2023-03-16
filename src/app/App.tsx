import { RouterProvider, createHashRouter } from "react-router-dom";
import { AuthForm } from "src/features";

import styles from "./App.module.css";

const router = createHashRouter([
  {
    path: "/",
    element: <AuthForm />,
  },
]);

export const App = () => {
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
};
