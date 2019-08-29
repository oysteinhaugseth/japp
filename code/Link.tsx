import * as React from "react"
import { Frame, addPropertyControls, ControlType, FrameProps } from "framer"
import { useInteractionState } from "./Hooks"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { iconNames, iconTitles } from "./Shared"
import { colors } from "./canvas"

// Define a type for our props
type Props = Partial<FrameProps> & {
    text: string
    type: string
    icon: string
    disabled: boolean
    resize: boolean | "width" | "height"
    onResize: (width: number, height: number) => void
    onTap: (event: any, info: any) => void
}

export function Link(props: Partial<Props>) {
    const { text, icon, type, resize, onResize, style, onTap, ...rest } = props
    const { width, disabled } = props

    /* ---------------------------------- State --------------------------------- */

    const [interactionState, interactionProps] = useInteractionState({
        disabled,
        style: props.style,
    })

    /* ----------------------------- Event Handlers ----------------------------- */

    // When the user taps on the button, run onTap
    const handleTap = (event: any, info: any) => {
        // Call onTap with the toggled state
        onTap(event, info)
    }

    /* ------------------------------ Presentation ------------------------------ */

    const theme = {
        default: {
            foreground: colors.Default,
        },
        primary: {
            foreground: colors.Primary_500,
        },
        secondary: {
            foreground: colors.Secondary_500,
        },
        neutral: {
            foreground: colors.Neutral_300,
        },
        ghost: {
            foreground: colors.Neutral_100,
        },
        warn: {
            foreground: colors.S_Warn_500,
        },
    }

    return !icon || icon === "none" ? (
        <Text
            {...rest}
            {...interactionProps}
            type="link"
            color={theme[type].foreground}
            resize={resize}
            onResize={onResize}
            text={text}
            onTap={!disabled && handleTap}
        />
    ) : (
        <Frame
            background="none"
            {...rest}
            {...interactionProps}
            onTap={!disabled && handleTap}
        >
            <Icon center icon={icon} color={colors.Accent_500} />
        </Frame>
    )
}

Link.defaultProps = {
    height: 60,
    width: 200,
    type: "secondary",
    text: "Link",
    icon: "none",
    background: "none",
    disabled: false,
    resize: false,
    onTap: () => null,
    onResize: (width, height) => null,
}

addPropertyControls(Link, {
    text: {
        title: "Text",
        type: ControlType.String,
        defaultValue: "Text",
    },
    type: {
        title: "Type",
        type: ControlType.Enum,
        options: [
            "default",
            "primary",
            "secondary",
            "warn",
            "neutral",
            "ghost",
        ],
        optionTitles: [
            "Default",
            "Primary",
            "Secondary",
            "Warn",
            "Neutral",
            "Ghost",
        ],
        defaultValue: "default",
    },
    icon: {
        title: "Icon",
        type: ControlType.Enum,
        options: ["none", ...iconNames],
        optionTitles: ["None", ...iconTitles],
        defaultValue: "none",
    },
    disabled: {
        title: "Disabled",
        type: ControlType.Boolean,
        defaultValue: false,
    },
})
