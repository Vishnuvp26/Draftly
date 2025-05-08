import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/user/LoginPage";
import SignupPage from "@/pages/user/SignupPage";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthRoutes = () => {
    const user = useSelector((state: RootState) => state.user);
    const token = user?.accessToken;

    if (token) {
        return <Navigate to={'/auth/home'} replace />;
    }

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
        </Routes>
    );
};

export default AuthRoutes;