import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Sidemenu from "./components/sidemenu";
import Footer from "./components/footer";

import UsageBallDaily from "./pages/assembly/UsageBallDaily";

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
                {<Footer />}
            </div>
        </BrowserRouter>
    );
}
