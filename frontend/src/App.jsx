import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import RealTimeTotal from "./assembly/RealTimeTotal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import BallUsage from "./assembly/BallUsage";
import AlarmlistMachine from "./assembly/AlarmlistMachine";


function App() {
    return (
        <BrowserRouter>
            <Header />
            <Sidebar />
            <Routes>
                <Route path="/" element={<RealTimeTotal />} />
                <Route path="/BallUsage" element={<BallUsage />} />
                <Route path="/Alarmlist" element={<AlarmlistMachine />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
