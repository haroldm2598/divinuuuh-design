"use client";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Hammer } from "lucide-react";
import Button from "./ui/button";

export default function Navbar() {
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
                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            <Button
                                className="login cursor-pointer"
                                type="button"
                                variant="ghost"
                                size="sm"
                            >
                                Sign in
                            </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button
                                className="cta cursor-pointer"
                                type="button"
                                size="sm"
                            >
                                Get started
                            </Button>
                        </SignUpButton>
                    </Show>
                    <Show when="signed-in">
                        <UserButton />
                    </Show>
                </div>
            </nav>
        </header>
    );
}
