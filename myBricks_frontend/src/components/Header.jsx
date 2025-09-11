import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Login from "./Login";

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) setIsLoggedIn(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setIsLoggedIn(false);
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    
    return (
        <div className="flex-none w-full max-w-screen-xl bg-[var(--color-bricksTeal)] flex justify-between mx-auto items-center rounded-b-3xl p-5">
            {/* Logo */}
            <div className="text-2xl font-bold text-[var(--color-bricksNavy)]">myBricks</div>

            {/* Navigation */}
            <nav>
                <ul className="flex divide-x text-[var(--color-bricksNavy)]">
                    <li className="px-3">
                        <Link className="hover:underline">Browse</Link>
                    </li>
                    
                    <li className="px-3">
                        <Link className="hover:underline">Collection</Link>
                    </li>
                    
                    {isLoggedIn ? (
                        <>
                            <li className="px-3">
                                <Link className="hover:underline">Account</Link>
                            </li>
                            <li className="px-3">
                                <button onClick={handleLogout}>Log Out</button>
                            </li>
                        </>
                    ) : (
                    <li className="px-3">
                        <button className="hover:underline" onClick={toggleModal}>Login</button>
                    </li>
                    )}
                    
                    <li className="px-3">
                        <Link className="hover:underline">Light</Link>
                    </li>
                </ul>
            </nav>

            {isModalOpen && (
                <Login
                    closeModal={() => setIsModalOpen(false)}
                    onLogin={() => setIsLoggedIn(true)}
                />
            )}
        </div>
    )
}

export default Header;