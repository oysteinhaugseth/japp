import { Override } from "framer"

const myStyles: React.CSSProperties = {
    cursor: "pointer",
}

export function Cursor(): Override {
    return {
        style: { ...myStyles },
    }
}
