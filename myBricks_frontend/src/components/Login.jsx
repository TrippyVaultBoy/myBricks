import { useState } from "react";

function Login({ closeModal }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://mybricks.dev/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid login credentials");
            }

            const data = await response.json();
            const token = data.token;

            localStorage.setItem("jwtToken", token);

            closeModal();
        } catch (error) {
            console.error(error);
            alert("Login failed")
        }
    }
    
    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <form
            className="flex flex-col bg-white p-6 rounded-4xl max-w-md w-full"
            onSubmit={handleLogin}
        >
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-5"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-5"
            />
            <button type="submit" className="bg-[var(--color-bricksNavy)] text-white text-xl rounded-4xl font-bold mb-4 p-2 text-center">
                Login
            </button>

            
            <button
            onClick={closeModal}
            className="bg-[var(--color-bricksTeal)] text-white text-xl rounded-4xl font-bold mb-4 p-2 text-center"
            >
            Close
            </button>
        </form>
    </div>
  );
}

export default Login;