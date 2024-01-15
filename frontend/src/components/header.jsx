import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" data-widget="pushmenu" to="#" role="button">
                        <i className="fas fa-bars" />
                    </Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/UsageBallDaily" className="nav-link">
                        <h4>
                            <b>NMB DX</b>
                        </h4>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
