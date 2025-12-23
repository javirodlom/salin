import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string; // Additional classes
    delay?: number; // Delay in ms
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
    children,
    className = "",
    delay = 0
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Only animate once
                }
            },
            {
                threshold: 0.1, // Trigger when 10% visible
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before bottom
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out transform ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};
