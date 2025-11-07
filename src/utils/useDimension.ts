import { useEffect, useState } from "react";

export default function useDimension() {
    const [dimension, setDimension] = useState({
        width: 0,
        height: 0
    })

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                setDimension({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height
                })
            }
        });

        resizeObserver.observe(document.body)

        return () => {
            resizeObserver.unobserve(document.body)
        }
    }, [])

    return dimension
}