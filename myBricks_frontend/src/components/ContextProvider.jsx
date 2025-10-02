import {  createContext, useContext, useState, useEffect } from "react";

const MyBricksContext = createContext(null);

export function MyBricksProvider({children, value}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
        setIsLoggedIn(!!token);
    }, []);
    
    const handleLogin = async (email, password, rememberMe, e) => {
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
                return({ success: false, message:"Invalid email or password"});
            }

            const data = await response.json();
            const token = data.token;

            if (rememberMe) {
                localStorage.setItem("jwtToken", token);
            } else {
                sessionStorage.setItem("jwtToken", token);
            }
            setIsLoggedIn(true);
            return({ success: true, message:"Login successful"});
        } catch (error) {
            console.Error("Login failure: ", error);
            return { success: false, message: "Something went wrong. Try again." };
        }
    }

    const handleLogout = () => {
        if (localStorage.getItem("jwtToken")) {
            console.log(localStorage.getItem("jwtToken"));
            localStorage.removeItem("jwtToken");
        } else if (sessionStorage.getItem("jwtToken")) {
            console.log(sessionStorage.getItem("jwtToken"));
            sessionStorage.removeItem("jwtToken");
        }
        setIsLoggedIn(false);
    }

    const handleSignUp = async (username, email, password, e) => {
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
                return({ success: false, message:"Sign up failed"});
            }
            return({ success: true, message:"Sign up successful"});
        } catch (error) {
            return({ success: false, message:"Sign up failed"});
        }
    }
    
    return (
        <MyBricksContext.Provider value={{isLoggedIn, setIsLoggedIn, handleLogin, handleLogout, handleSignUp}}>
            {children}
        </MyBricksContext.Provider>
    )
}

export function useMyBricksContext() {
    const context = useContext(MyBricksContext);
    if (!context) {
        throw new Error("useMyBricksContext must be used within a MyBricksProvider");
    }
    return context;
}