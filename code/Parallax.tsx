import { Override, motionValue, useTransform } from "framer"

const contentOffsetY = motionValue(0)

// Apply this override to your scroll component
export function TrackScroll(): Override {
    return { contentOffsetY: contentOffsetY }
}

// Apply this override to your parallax layer
export function ParallaxLayer(): Override {
    const y = useTransform(contentOffsetY, [0, -100], [0, 20], {
        clamp: false,
    })
    return {
        y: y,
    }
}
