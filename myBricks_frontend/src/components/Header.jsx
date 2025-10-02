import { useState } from "react";
import { Link } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import { useMyBricksContext } from './ContextProvider';

function Header() {
    const { isLoggedIn, handleLogout } = useMyBricksContext();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    
    return (
        <div className="flex-none w-full max-w-screen-xl bg-[var(--color-bricksNavy)] flex justify-between mx-auto items-center rounded-b-3xl p-5">
            {/* Logo */}
            <div className="text-2xl font-bold text-[var(--color-bricksTeal)]">myBricks</div>

            {/* Navigation */}
            <nav>
                <ul className="flex items-center text-[var(--color-bricksTeal)]">
                    <li className="px-2">
                        <Link
                            className="px-3 py-2 rounded-3xl hover:bg-[var(--color-bricksTeal)] hover:text-[var(--color-bricksNavy)] transition-colors duration-200 hover:cursor-pointer"
                        >Browse</Link>
                    </li>
                    
                    <li className="px-2">
                        <Link
                            className="px-3 py-2 rounded-3xl hover:bg-[var(--color-bricksTeal)] hover:text-[var(--color-bricksNavy)] transition-colors duration-200 hover:cursor-pointer"
                        >Collection</Link>
                    </li>
                    
                    {isLoggedIn ? (
                        <>
                            <li className="px-2">
                                <Link
                                    className="px-3 py-2 rounded-3xl hover:bg-[var(--color-bricksTeal)] hover:text-[var(--color-bricksNavy)] transition-colors duration-200 hover:cursor-pointer"
                                >Account</Link>
                            </li>
                            <li className="px-2">
                                <button
                                    className="px-3 py-2 rounded-3xl hover:bg-[var(--color-bricksTeal)] hover:text-[var(--color-bricksNavy)] transition-colors duration-200"
                                    onClick={handleLogout}
                                >Log Out</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="px-2">
                                <button
                                    className="px-3 py-2 rounded-3xl hover:bg-[var(--color-bricksTeal)] hover:text-[var(--color-bricksNavy)] transition-colors duration-200 hover:cursor-pointer"
                                    onClick={() => {setIsSignUpModalOpen(!isSignUpModalOpen)}}
                                >Sign Up</button>
                            </li>
                            <li className="px-2">
                                <button
                                    className="px-3 py-2 rounded-3xl hover:bg-[var(--color-bricksTeal)] hover:text-[var(--color-bricksNavy)] transition-colors duration-200 hover:cursor-pointer"
                                    onClick={() => {setIsLoginModalOpen(!isLoginModalOpen)}}
                                >Login</button>
                            </li>
                        </>
                    )}
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