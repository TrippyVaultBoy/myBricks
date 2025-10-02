import {  createContext, useContext, useState, useEffect } from "react";

import { fetchCollection, fetchSet } from "../services/SetData";
import { useNavigate } from "react-router-dom";

const MyBricksContext = createContext(null);

export function MyBricksProvider({ children }) {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return !!localStorage.getItem("jwtToken") || !!sessionStorage.getItem("jwtToken");
    });
    const [collection, setCollection] = useState([]);
    const [selectedSet, setSelectedSet] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const loadCollection = async () => {
            try {
                const collectionResponse = await fetchCollection();
                if (collectionResponse.success) {
                    console.log(collectionResponse.collectionData);
                    setCollection(collectionResponse.collectionData.collection);
                } else {
                    console.error(collectionResponse.message);
                    setCollection([]);
                }
            } catch (error) {
                console.error(error);
                setCollection([]);
            }
        };

        loadCollection();
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
            
            const collectionResponse = await fetchCollection();
            if (collectionResponse.success) {
                console.log(collectionResponse.collectionData);
                setCollection(collectionResponse.collectionData.collection);
            } else {
                console.error(collectionResponse.message);
                setCollection([]);
            }
            
            return({ success: true, message:"Login successful"});
        } catch (error) {
            console.error("Login failure: ", error);
            return { success: false, message: "Something went wrong. Try again." };
        }
    };

    const handleLogout = () => {
        setCollection([]);
        localStorage.removeItem("jwtToken");
        sessionStorage.removeItem("jwtToken");
        setIsLoggedIn(false);
        setTimeout(() => {
            navigate("/"); // redirect to home
        }, 0);
    };

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
    };

    const getCollection = async () => {
        const data = await fetchCollection();
        setCollection(data.collectionData);
    };

    const getSet = async (setNumber) => {
        const data = await fetchSet();
        setSelectedSet(data.setData);
    };
    
    return (
        <MyBricksContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                handleLogin,
                handleLogout,
                handleSignUp,
                collection,
                getCollection,
                selectedSet,
                getSet,
            }}
        >
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