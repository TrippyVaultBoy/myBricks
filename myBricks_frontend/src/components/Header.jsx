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
        <div className="flex-none w-full max-w-screen-xl bg-bricksNavy flex justify-between mx-auto items-center rounded-b-3xl p-5">
            {/* Logo */}
            <Link
                className="text-2xl font-bold text-bricksTeal"
                to="/"
            >myBricks</Link>

            {/* Navigation */}
            <nav>
                <ul className="flex items-center text-bricksTeal">
                    <li className="px-2">
                        <Link
                            className="px-3 py-2 rounded-3xl hover:bg-bricksTeal hover:text-bricksNavy transition-colors duration-200 hover:cursor-pointer"
                            to="/browse"
                        >Browse</Link>
                    </li>
                    
                    <li className="px-2">
                        <Link
                            className="px-3 py-2 rounded-3xl hover:bg-bricksTeal hover:text-bricksNavy transition-colors duration-200 hover:cursor-pointer"
                            to="/collection"
                        >Collection</Link>
                    </li>
                    
                    {isLoggedIn ? (
                        <>
                            <li className="px-2">
                                <Link
                                    className="px-3 py-2 rounded-3xl hover:bg-bricksTeal hover:text-bricksNavy transition-colors duration-200 hover:cursor-pointer"
                                    to="/account"
                                >Account</Link>
                            </li>
                            <li className="px-2">
                                <button
                                    className="px-3 py-2 rounded-3xl hover:bg-bricksTeal hover:text-bricksNavy transition-colors duration-200"
                                    onClick={handleLogout}
                                >Log Out</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="px-2">
                                <button
                                    className="px-3 py-2 rounded-3xl hover:bg-bricksTeal hover:text-bricksNavy transition-colors duration-200 hover:cursor-pointer"
                                    onClick={() => {setIsLoginModalOpen(!isLoginModalOpen)}}
                                >Login</button>
                            </li>
                            <li className="px-2">
                                <button
                                    className="px-3 py-2 rounded-3xl text-bricksWhite bg-bricksRed hover:bg-bricksTeal hover:text-bricksNavy transition-colors duration-200 hover:cursor-pointer"
                                    onClick={() => {setIsSignUpModalOpen(!isSignUpModalOpen)}}
                                >Sign Up</button>
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