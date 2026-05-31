import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
}
from "react-router-dom";

import Login from "./pages/Login";

import Home from "./pages/Home";


// ================= PROTECTED ROUTE =================
const ProtectedRoute = ({
    children
}) => {

    const token =
        localStorage.getItem(
            "token"
        );

    if (!token) {

        return (
            <Navigate to="/" />
        );
    }

    return children;
};


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* LOGIN */}
                <Route

                    path="/"

                    element={
                        <Login />
                    }
                />


                {/* HOME */}
                <Route

                    path="/home"

                    element={

                        <ProtectedRoute>

                            <Home />

                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;