import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import NavBar from "./components/NavBar";
import Home from "./page/Home";
import Login from "./page/Login";
import Singup from "./page/Singup";
import Tasks from "./page/Tasks";
import OneTask from "./page/taskPage/OneTask";
import AddTask from "./page/taskPage/AddTask";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/singup"
            element={!user ? <Singup /> : <Navigate to="/" />}
          />
          <Route
            path="/tasks"
            element={user ? <Tasks /> : <Navigate to="/" />}
          />
          <Route
            path="/tasks/:id"
            element={user ? <OneTask /> : <Navigate to="/" />}
          />
          <Route
            path="/tasks/new"
            element={user ? <AddTask /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
