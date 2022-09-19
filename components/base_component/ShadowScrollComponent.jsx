import React, { useEffect, useRef, useState } from 'react'

export default function ShadowScrollComponent({ children, className, onScroll }) {
    const [shadow, setShadow] = useState("");
    const scrollRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            // console.log(scrollRef.current.scrollWidth + " | " + scrollRef.current.offsetWidth);
            if (scrollRef.current.scrollWidth != scrollRef.current.offsetWidth) {
                setShadow("right")
            }
        }
    }, [scrollRef]);

    return (
        <div
            ref={scrollRef}
            className={`shadow__${shadow} ${className}`}
            onScroll={(e) => {
                if (e.target.scrollLeft <= 0) {
                    setShadow("right")
                } else if (e.target.scrollLeft + e.target.offsetWidth >= e.target.scrollWidth - 1) {
                    setShadow("left")
                } else {
                    setShadow("left__right")
                }

                if (onScroll) {
                    onScroll(e)
                }
            }}
        >
            {children}
        </div>
    )
}
