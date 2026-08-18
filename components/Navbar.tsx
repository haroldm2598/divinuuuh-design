"use client";
import { Hammer } from "lucide-react";
import Button from "./ui/button";

export default function Navbar() {
    const isSignedIn = true;
    const username = "Divinuuuh";
    const handleAuthClick = () => {
        // Handle authentication logic here
        console.log("Login button clicked");
    };

    return (
        <header className="navbar">
            <nav className="inner">
                <div className="left">
                    <div className="brand">
                        <Hammer className="logo" />
                        <span className="name">Divinuuuh</span>
                    </div>

                    <ul className="links" aria-label="Main navigation">
                        <a href="#">Product</a>
                        <a href="#">Pricing</a>
                        <a href="#">Community</a>
                        <a href="#">Enterprise</a>
                    </ul>
                </div>

                <div className="actions">
                    {isSignedIn ? (
                        <>
                            <span className="greeting">
                                {username
                                    ? `Welcome, ${username}`
                                    : "Signed in"}
                            </span>

                            <Button
                                onClick={handleAuthClick}
                                className="btn cursor-pointer"
                                size="sm"
                            >
                                Log Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={handleAuthClick}
                                className="login cursor-pointer"
                                size="sm"
                                variant="ghost"
                            >
                                Login
                            </Button>
                            <a href="#upload" className="cta">
                                Get Started
                            </a>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
