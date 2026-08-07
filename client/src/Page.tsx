import Upload from './components/Upload/Upload.tsx';
import './Page.css';
import Logo from "./assets/logo-small.svg";
import { useState } from 'react';
import Moon from "./assets/Moon_fill.svg";
import Sun from "./assets/Sun_fill.svg";

function Page() {
    const [darkMode, setDarkMode] = useState(false);

    return(
        <div className={darkMode ? "page dark" : "page"}>
            <header className="header">
                <img src={Logo} alt="Logo" className="logo" />
                <h2>ImageUpload</h2>
                <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
                    {darkMode ? (
                        <img src={Sun} alt="Sun" className="icon" />
                    ) : (
                        <img src={Moon} alt="Moon" className="icon" />
                    )}
                </button>
            </header>
            <main className="main">
                <Upload isDarkMode={darkMode} />
            </main>
        </div>
    );
}

export default Page;