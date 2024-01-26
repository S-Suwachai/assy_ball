import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Sidemenu from "./components/Sidemenu.jsx";

import UsageBallDaily from "./pages/assembly/UsageBallDaily.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Sidemenu />
                <Routes>
                    <Route path="/UsageBallDaily" element={<UsageBallDaily />} />
                    <Route exact={true} path="*" element={<UsageBallDaily />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
