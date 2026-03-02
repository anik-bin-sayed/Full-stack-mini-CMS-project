import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
// Toaster css
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import store from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      theme="colored"
    />
  </Provider>,
);
