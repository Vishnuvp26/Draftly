import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center px-4 mt-5"
        >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Share Your Stories with the World
            </h1>
            <p className="text-base md:text-lg max-w-xl mb-6">
                Whether it's a tech insight, a personal journey, or your latest idea — DraftLy helps you reach readers everywhere. Start your blogging journey with ease and impact.
            </p>
            <Button onClick={() => navigate('/login')} size="lg">Get Started</Button>
        </motion.div>
    );
};

export default Landing;