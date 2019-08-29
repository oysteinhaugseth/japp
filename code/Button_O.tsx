import { Override } from "framer"
import { colors } from "./canvas"

const commonStyles: React.CSSProperties = {
    cursor: "pointer",
}

const variants = {
    primary: {
        initial: {
            background: colors.Default,
        },
        hover: {
            background: colors.Neutral_800,
        },
        tapped: {
            background: colors.Neutral_700,
        },
    },
    secondary: {
        initial: {
            background: colors.Alpha_0,
        },
        hover: {
            background: colors.Primary_100,
        },
        tapped: {
            background: colors.Primary_300,
        },
    },
    white: {
        initial: {
            background: colors.White,
        },
        hover: {
            background: colors.Neutral_100,
        },
        tapped: {
            background: colors.Neutral_200,
        },
    },
    ghost: {
        initial: {
            background: colors.Alpha_0,
        },
        hover: {
            background: colors.Alpha_20,
        },
        tapped: {
            background: colors.Alpha_40,
        },
    },
    warn: {},
    disabled: {},
}

export function Primary(): Override {
    return {
        style: {
            ...commonStyles,
        },
        variants: variants.primary,
        initial: "initial",
        whileHover: "hover",
        whileTap: "tapped",
    }
}

export function Secondary(): Override {
    return {
        // style: {
        //     borderStyle: "solid",
        //     borderWidth: "2px",
        //     borderRadius: "3px",
        //     borderColor: colors.Primary_500,
        // },
        variants: variants.secondary,
        initial: "initial",
        whileHover: "hover",
        whileTap: "tapped",
    }
}

export function White(): Override {
    return {
        style: {
            ...commonStyles,
        },
        variants: variants.white,
        initial: "initial",
        whileHover: "hover",
        whileTap: "tapped",
    }
}

export function Ghost(): Override {
    return {
        variants: variants.ghost,
        initial: "initial",
        whileHover: "hover",
        whileTap: "tapped",
    }
}

export function Warn(): Override {
    return {}
}

export function Disabled(): Override {
    return {}
}
