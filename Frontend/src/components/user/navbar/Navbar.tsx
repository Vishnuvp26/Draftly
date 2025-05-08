import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { ThemeContext } from "@/context/ThemeContext";
import { Moon, Sun, Menu, ChevronDown, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { removeUser } from "@/redux/authSlice";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const themeContext = useContext(ThemeContext);
    if (!themeContext) return null;
    const { theme, toggleTheme } = themeContext;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);
    const token = user.accessToken;
    const name = user.name;

    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed z-50 top-0.5 left-0 md:top-6 right-0">
            <div className="mx-auto max-w-5xl backdrop-blur-lg bg-white/10 dark:bg-black/10 border border-neutral-200 dark:border-neutral-700 rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="cursor-pointer text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 dark:from-cyan-300 dark:to-purple-300"
                    onClick={() => navigate("/")}
                >
                    DraftLy
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4">
                    {token ? (
                        <>
                            <Button onClick={() => navigate('/auth/my-blogs')} variant="ghost" className="text-base">My Blogs</Button>
                            <DropdownMenu onOpenChange={setOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="text-base flex items-center gap-1">
                                        {name}
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
                                                }`}
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-32">
                                    <DropdownMenuItem
                                        onClick={() => {
                                            dispatch(removeUser());
                                            navigate("/");
                                        }}
                                        className="cursor-pointer flex items-center justify-between"
                                    >
                                        <span>Logout</span>
                                        <LogOut className="w-4 h-4 text-muted-foreground" />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => navigate('/login')} variant="ghost" className="text-base">Login</Button>
                            <Button onClick={() => navigate('/sign-up')} variant="ghost" className="text-base">Signup</Button>
                        </>
                    )}
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        {theme === "light" ? (
                            <Moon className="w-5 h-5" />
                        ) : (
                            <Sun className="w-5 h-5 text-orange-300" />
                        )}
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full bg-white dark:bg-black">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold ml-5 mt-5">DraftLy</h2>
                            </div>
                            <div className="flex flex-col gap-4 items-center">
                                {token ? (
                                    <>
                                        <Button onClick={() => navigate('/auth/my-blogs')} variant="ghost" className="text-base">My Blogs</Button>
                                        <DropdownMenu onOpenChange={setOpen}>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="text-base flex items-center gap-1">
                                                    {name}
                                                    <ChevronDown
                                                        className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
                                                            }`}
                                                    />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-32">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        dispatch(removeUser());
                                                        navigate("/");
                                                    }}
                                                    className="cursor-pointer flex items-center justify-between"
                                                >
                                                    <span>Logout</span>
                                                    <LogOut className="w-4 h-4 text-muted-foreground" />
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </>
                                ) :
                                    <>
                                        <Button onClick={() => navigate('/login')} variant="ghost" className="justify-start text-base">Login</Button>
                                        <Button onClick={() => navigate('/sign-up')} variant="ghost" className="justify-start text-base">Signup</Button>
                                    </>
                                }
                                
                                <Button variant="ghost" className="justify-start text-base" onClick={toggleTheme}>
                                    {theme === "light" ? (
                                        <>
                                            <Moon className="w-5 h-5 mr-2" /> Dark Mode
                                        </>
                                    ) : (
                                        <>
                                            <Sun className="w-5 h-5 mr-2 text-orange-300" /> Light Mode
                                        </>
                                    )}
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;