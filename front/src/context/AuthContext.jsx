import React, { createContext, useState, useEffect, useContext } from "react";
import {jwtDecode} from "jwt-decode"; // Install this package: npm install jwt-decode

// Create the Auth Context
const AuthContext = createContext({
    authUser: null,
    setAuthUser: () => {},
    isLoading: true,
});

// Custom hook to use the Auth Context
export const useAuthContext = () => {
    return useContext(AuthContext);
};

// Auth Context Provider
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validateToken = () => {
            const token = localStorage.getItem("token"); // Retrieve token from localStorage (or cookies)
            if (!token) {
                setIsLoading(false); // No token, no need to proceed
                return;
            }

            try {
                const decodedToken = jwtDecode(token); // Decode the JWT
                if (!decodedToken.user_id) {
                    throw new Error("Invalid token: user_id missing");
                }
                console.log(decodedToken)

                // If valid, set the authUser
                setAuthUser({
                    id: decodedToken.user_id,
                    username: decodedToken.username, // Include other claims if available
                    email: decodedToken.email,
                });
            } catch (error) {
                console.error("Token validation error:", error);
                setAuthUser(null); // Clear authUser on error
                localStorage.removeItem("token"); // Optionally clear invalid token
            } finally {
                setIsLoading(false); // Loading is done
            }
        };

        validateToken();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authUser,
                isLoading,
                setAuthUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
