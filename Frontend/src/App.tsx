import { Toaster } from "sonner";
import Navbar from "./components/user/navbar/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Scroll from "./utils/Scroll";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/ui/Loader";

const AuthRoutes = lazy(() => import("./routes/AuthRoutes"));
const BlogRoutes = lazy(() => import("./routes/BlogRoutes"));

function App() {
    return (
        <>
            <ThemeProvider>
                <Toaster theme="system" />
                <Router>
                    <Scroll />
                    <Navbar />
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/*" element={<AuthRoutes />} />
                            <Route path="/auth/*" element={<BlogRoutes />} />
                        </Routes>
                    </Suspense>
                </Router>
            </ThemeProvider>
        </>
    );
};

export default App;