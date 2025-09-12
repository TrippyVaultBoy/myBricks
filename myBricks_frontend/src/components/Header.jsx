import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";

function Header() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) setIsLoggedIn(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setIsLoggedIn(false);
    }

    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    }

    const toggleSignUpModal = () => {
        setIsSignUpModalOpen(!isSignUpModalOpen);
    }
    
    return (
        <div className="flex-none w-full max-w-screen-xl bg-[var(--color-bricksTeal)] flex justify-between mx-auto items-center rounded-b-3xl p-5">
            {/* Logo */}
            <div className="text-2xl font-bold text-[var(--color-bricksNavy)]">myBricks</div>

            {/* Navigation */}
            <nav>
                <ul className="flex items-center text-[var(--color-bricksNavy)]">
                    <li className="px-2">
                        <Link className="px-3 py-2 rounded-3xl hover:bg-[var(--color-bricksNavy)] hover:text-[var(--color-bricksWhite)] transition-colors duration-200 hover:cursor-pointer">Browse</Link>
                    </li>
                    
                    <li className="px-2">
                        <Link className="px-3 py-2 rounded-3xl hover:bg-[var(--color-bricksNavy)] hover:text-[var(--color-bricksWhite)] transition-colors duration-200 hover:cursor-pointer">Collection</Link>
                    </li>
                    
                    {isLoggedIn ? (
                        <>
                            <li className="px-2">
                                <Link className="px-3 py-2 rounded-3xl hover:bg-[var(--color-bricksNavy)] hover:text-[var(--color-bricksWhite)] transition-colors duration-200 hover:cursor-pointer">Account</Link>
                            </li>
                            <li className="px-2">
                                <button className="px-3 py-2 rounded-3xl hover:bg-[var(--color-bricksNavy)] hover:text-[var(--color-bricksWhite)] transition-colors duration-200" onClick={handleLogout}>Log Out</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="px-2">
                                <button className="px-3 py-2 rounded-3xl hover:bg-[var(--color-bricksNavy)] hover:text-[var(--color-bricksWhite)] transition-colors duration-200 hover:cursor-pointer" onClick={toggleSignUpModal}>Sign Up</button>
                            </li>
                            <li className="px-2">
                                <button className="px-3 py-2 rounded-3xl hover:bg-[var(--color-bricksNavy)] hover:text-[var(--color-bricksWhite)] transition-colors duration-200 hover:cursor-pointer" onClick={toggleLoginModal}>Login</button>
                            </li>
                        </>
                    )}
                    
                    <li className="px-2">
                        <Link className="px-3 py-2 rounded-3xl hover:bg-[var(--color-bricksNavy)] hover:text-[var(--color-bricksWhite)] transition-colors duration-200 hover:cursor-pointer">Light</Link>
                    </li>
                </ul>
            </nav>

            {isLoginModalOpen && (
                <Login
                    closeModal={() => setIsLoginModalOpen(false)}
                    onLogin={() => setIsLoggedIn(true)}
                />
            )}

            {isSignUpModalOpen && (
                <SignUp
                    closeModal={() => setIsSignUpModalOpen(false)}
                />
            )}
        </div>
    )
}

export default Header;