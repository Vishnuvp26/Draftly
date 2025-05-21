import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { loginUser } from "@/api/auth/Login";
import { setUser } from "@/redux/authSlice";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast("Oops", {
                description: "Email and password required",
                action: {
                    label: "Ok",
                    onClick: () => console.log('ok'),
                },
            })
            return
        }
        setLoading(true);
        setError("");
        try {
            const response = await loginUser(email, password);
            dispatch(setUser({
                _id: response.user?._id || "",
                name: response.user?.name || "",
                email: response.user?.email || "",
                profilePic: response.user?.profilePic || "",
                accessToken: response.accessToken || null,
            }));
            navigate('/auth/home')
        } catch (err: any) {
            setError(err.error || "Login failed");
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
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="h-12"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="h-12 pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    ) : (
                                        <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    )}
                                </Button>
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
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
                                    "Login"
                                )}
                            </Button>
                        </form>
                            
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                            <span className="px-2 text-gray-500 dark:text-gray-400">OR</span>
                            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                        </div>
                        <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
                            Don’t have an account?
                            <Link to="/sign-up" className="text-[#0077B6] dark:text-[#00FFE5] font-medium hover:underline"> Sign up</Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Login;