import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import MainPage from "./Pages/MainPage";
import History from "./Pages/History";
import Profile from "./Pages/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route >
            <Route path="/" element={<Home />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/MainPage" element={<MainPage/>}></Route>
            <Route path="/History" element={<History/>}></Route>
            <Route path="/Profile" element={<Profile/>}></Route>
          </Route>  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
