"use client";

import { useState, useEffect } from 'react';

interface TypeWriterProps {
    texts: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBetween?: number;
}

export default function TypeWriter({ 
    texts, 
    typingSpeed = 100, 
    deletingSpeed = 50, 
    delayBetween = 2000 
}: TypeWriterProps) {
    const [displayText, setDisplayText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[textIndex];
        
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (displayText.length < currentText.length) {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                } else {
                    // Wait before deleting
                    setTimeout(() => setIsDeleting(true), delayBetween);
                }
            } else {
                // Deleting
                if (displayText.length > 0) {
                    setDisplayText(currentText.slice(0, displayText.length - 1));
                } else {
                    // Move to next text
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, delayBetween]);

    return (
        <span className="inline-block">
            {displayText}
            <span className="animate-pulse ml-1">|</span>
        </span>
    );
}
