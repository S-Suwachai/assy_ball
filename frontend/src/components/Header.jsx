
export default function Header() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid justify-content-start">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a href="/" className="navbar-brand px-3">NMB DX WEB</a>
            </div>
        </nav>
    );
}
