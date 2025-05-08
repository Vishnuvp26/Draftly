import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { validateRegistration } from "@/utils/validation";
import { registerUser } from "@/api/auth/Login";
import { toast } from "sonner"

const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [error, setError] = useState<Record<string, string>>({});

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        const { errors } = validateRegistration({ ...formData, [name]: value });
        setError((prev) => ({ ...prev, [name]: errors[name] || "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { valid, errors } = validateRegistration(formData);
        if (!valid) {
            setError(errors);
            return;
        }

        try {
            setLoading(true);
            const response = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            });
            toast(response.message, {
                description: "Your account has been created, please login",
                action: {
                    label: "Ok",
                    onClick: () => navigate('/login'),
                },
            })
        } catch (error: any) {
            setError({ general: error.message || "Something went wrong, please try again" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black flex flex-col md:flex-row items-center justify-center px-4 py-6">
            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                <Card className="shadow-none border-none dark:bg-black bg-gray-100 w-md">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-medium text-gray-900 dark:text-white">Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Name Field */}
                                <div className="flex flex-col">
                                    <Input
                                        className="h-12"
                                        placeholder="Enter your name"
                                        name="name"
                                        onChange={handleChange}
                                        value={formData.name}
                                    />
                                    {error.name && <p className="text-sm text-red-500 mt-1">{error.name}</p>}
                                </div>

                                {/* Email Field */}
                                <div className="flex flex-col">
                                    <Input
                                        className="h-12"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        onChange={handleChange}
                                        value={formData.email}
                                    />
                                    {error.email && <p className="text-sm text-red-500 mt-1">{error.email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Password Field */}
                                <div className="flex flex-col">
                                    <div className="relative flex items-center">
                                        <Input
                                            className="h-12 pr-10 flex-grow"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter your password"
                                            onChange={handleChange}
                                            value={formData.password}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                                        </button>
                                    </div>
                                    {error.password && <p className="text-sm text-red-500 mt-1">{error.password}</p>}
                                </div>

                                {/* Confirm Password Field */}
                                <div className="flex flex-col">
                                    <div className="relative flex items-center">
                                        <Input
                                            className="h-12 pr-10 flex-grow"
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Enter password again"
                                            onChange={handleChange}
                                            value={formData.confirmPassword}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 flex items-center"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                                        </button>
                                    </div>
                                    {error.confirmPassword && <p className="text-sm text-red-500 mt-1">{error.confirmPassword}</p>}
                                </div>
                            </div>
                            {error.general && <p className="text-sm text-red-500 text-center mt-2">{error.general}</p>}
                            <Button
                                className="w-full h-12 flex items-center justify-center gap-2"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin w-5 h-5" />
                                        Please wait...
                                    </>
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </form>
                            
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                            <span className="px-2 text-gray-500 dark:text-gray-400">OR</span>
                            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                        </div>
                        <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
                            Already have an account?
                            <Link to="/login" className="text-[#0077B6] dark:text-[#00FFE5] font-medium hover:underline"> Login</Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Signup