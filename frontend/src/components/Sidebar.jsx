import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="sidebarMenu"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title fs-4">MenuBar</h5>
                <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <hr />
            {/* <div className="offcanvas-body">
                <Link to="/">Real time</Link>
                <Link to="/ballusage">Ball usage</Link>
            </div> */}
            <div className="offcanvas-body">
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                <Link to="/" className="nav-link">Real time</Link>
                <Link to="/ballusage" className="nav-link">Ball usage</Link>
                <Link to="/alarmlist" className="nav-link">Alarmlist machine</Link>
                </li>
            </ul>
            </div>
        </div>
    );
}
