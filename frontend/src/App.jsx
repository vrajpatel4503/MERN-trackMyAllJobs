import AppRoutes from "./AppRoutes";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/authSlice.js";

function AuthChecker() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCookie = (name) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? match[2] : null;
    };

    const token = getCookie("token");
    if (!token) {
      dispatch(authActions.logout());
    }
  }, [dispatch]);

}

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthChecker />
          <AppRoutes />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
