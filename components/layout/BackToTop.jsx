"use client";

import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

// Implementation uses useState for visibility and useEffect for scroll detection
const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.scrollY > 300);
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        isVisible && (
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className=" fixed bottom-10 right-10 p-2 bg-linear-45 from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg"
            >
                <ArrowUp size={20} />
            </button>
        )
    );
};
export default BackToTop;
