import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import DetailBook from "./pages/DetailBook";
import DetailBookA from "./pages/DetailBookA";
import Subscribe from "./pages/Subscribe";
import Profile from "./pages/Profile";
import Transaction from "./pages/Transaction";
import AddBook from "./pages/AddBook";
import Read from "./components/Read";

import { UserContext } from "./context/UserContext";

// Get API config & setAuthToken here ...
import { API, setAuthToken } from "./config/api";
import ReadBook from "./pages/ReadBook";

// Init token on axios every time the app is refreshed here ...
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext);

  // Redirect Auth here ...
  useEffect(() => {
    if (!state.isLogin) {
      navigate("/");
    } else {
      if (state.user.role === "admin") {
        navigate("/transaction");
      } else if (state.user.role === "user") {
        navigate("/home");
      }
    }
  }, [state]);

  // Create function for check user token here ...
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      return dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Call function check user with useEffect didMount here ...
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/subscribe" element={<Subscribe />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/book/:id" element={<DetailBook />} />
      <Route exact path="/detailbooka" element={<DetailBookA />} />
      <Route exact path="/transaction" element={<Transaction />} />
      <Route exact path="/addbook" element={<AddBook />} />
      <Route exact path="/read" element={<Read />} />
      <Route exact path="/read-book" element={<ReadBook />} />
    </Routes>
  );
}

export default App;
