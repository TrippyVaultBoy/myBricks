import { useState } from "react";
import { Link } from "react-router-dom";

import Login from "./Login";

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    
    return (
        <div className="max-w-screen-xl flex justify-between mx-auto items-center p-5">
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
                    <li className="px-3">
                        <button className="hover:underline" onClick={toggleModal}>Login</button>
                    </li>
                    <li className="px-3">
                        <Link className="hover:underline">Light</Link>
                    </li>
                </ul>
            </nav>

            { isModalOpen && <Login closeModal={() => setIsModalOpen(false)}></Login> }
        </div>
    )
}

export default Header;