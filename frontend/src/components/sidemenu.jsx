import { Link } from "react-router-dom";

export default function Sidemenu() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="#" className="brand-link">
                <span className="brand-text font-weight-light">NMB BEARING</span>
            </Link>
            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li class="nav-header">Assembly</li>
                        <li className="nav-item has-treeview">
                            <Link to="#" className="nav-link">
                                <i className="right fas fa-angle-left" />
                                <p>Production</p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">
                                        <i className="far nav-icon" />
                                        <p>MBRC Chart</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">
                                        <i className="far nav-icon" />
                                        <p>Production Total</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">
                                        <i className="far nav-icon" />
                                        <p>MBRC Table</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item has-treeview">
                            <Link to="#" className="nav-link">
                                <i className="right fas fa-angle-left" />
                                <p>Ball usage</p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">
                                        <i className="far nav-icon" />
                                        <p>Ball Usage total MBR</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/UsageBallDaily" className="nav-link">
                                        <i className="far nav-icon" />
                                        <p>Ball Usage daily</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">
                                        <i className="far nav-icon" />
                                        <p>Ball Onhand</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">
                                        <i className="far nav-icon" />
                                        <p>Ball Turnover</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item has-treeview">
                            <Link to="#" className="nav-link">
                                <i className="right fas fa-angle-left" />
                                <p>M/C alarm</p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">
                                        <i className="far nav-icon" />
                                        <p>Status Alarm</p>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="#" className="nav-link">
                                        <i className="far nav-icon" />
                                        <p>Status Alarm By Hour</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">
                                        <i className="far nav-icon" />
                                        <p>Machine Status</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">
                                        <i className="far nav-icon" />
                                        <p>Non-Operating time</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
