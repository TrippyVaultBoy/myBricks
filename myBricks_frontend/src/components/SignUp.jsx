import { useState } from "react";

function SignUp({ closeModal }) {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://mybricks.dev/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid sign up credentials");
            }

            closeModal();
        } catch (error) {
            console.error(error);
            alert("Sign up failed");
        }
    }
    
    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <form
                className="flex flex-col bg-white p-6 rounded-4xl max-w-md w-full border border-[var(--color-bricksTeal)]"
                onSubmit={handleSignUp}
            >
                <h1 className="text-[var(--color-bricksNavy)] text-xl font-bold text-center p-5">Sign Up</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="mb-5 border border-[var(--color-bricksTeal)] rounded-3xl p-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mb-5 border border-[var(--color-bricksTeal)] rounded-3xl p-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mb-5 border border-[var(--color-bricksTeal)] rounded-3xl p-2"
                />
                <button type="submit" className="bg-[var(--color-bricksNavy)] text-white rounded-4xl mb-4 p-2 text-center transform transition-transform hover:scale-102 hover:shadow-lg hover:cursor-pointer">
                    Sign Up
                </button>

                
                <button
                onClick={closeModal}
                className="bg-[var(--color-bricksTeal)] text-white rounded-4xl mb-4 p-2 text-center hover:shadow-lg hover:cursor-pointer"
                >
                Close
                </button>
            </form>
        </div>
    );
}

export default SignUp;