import * as React from "react"
import {
    Frame,
    addPropertyControls,
    ControlType,
    FrameProps,
    Stack,
} from "framer"
import { Icon } from "./Icon"
import { Text } from "./Text"
import { iconNames, iconTitles } from "./Shared"
import { useInteractionState } from "./Hooks"
import { colors } from "./canvas"

type Props = Partial<FrameProps> &
    Partial<{
        text: string
        icon: string
        contentType: string
        alignIcon: string
        type: string
        toggle: boolean
        toggled: boolean
        disabled: boolean
        onTap?: (toggled: boolean | null) => void
    }>

export function Button(props: Props) {
    const {
        type,
        text,
        contentType,
        icon,
        alignIcon,
        onTap,
        disabled,
        toggle,
        toggled: initialToggled,
        style,
        ...rest
    } = props

    /* ---------------------------------- State --------------------------------- */

    // Initialize state with props values
    const [state, setState] = React.useState({
        toggled: toggle ? initialToggled || false : null,
    })

    // When the hook receives new props, overwrite the state
    React.useEffect(() => {
        setState({
            ...state,
            toggled: toggle ? initialToggled || false : null,
        })
    }, [initialToggled])

    const [interactiveState, interactiveProps] = useInteractionState({
        disabled,
        toggled: state.toggled,
        style,
    })

    /* ----------------------------- Event Handlers ----------------------------- */

    // When the user taps on the button, run onTap and update toggled
    const handleTap = (event, info) => {
        if (toggle) {
            const toggled = !state.toggled
            onTap(toggled)
            setState({
                ...state,
                toggled,
            })
        } else {
            onTap(null)
        }
    }

    /* ------------------------------ Presentation ------------------------------ */

    const theme = {
        primary: {
            foreground: colors.White,
            background: colors.Default,
        },
        p_outline: {
            foreground: colors.Default,
            background: "none",
        },
        secondary: {
            foreground: colors.White,
            background: colors.Secondary_500,
        },
        s_outline: {
            foreground: colors.Secondary_500,
            background: "none",
        },
        white: {
            foreground: colors.Default,
            background: colors.White,
        },
        w_outline: {
            foreground: colors.White,
            background: "none",
        },
        accent: {
            foreground: colors.Default,
            background: colors.Accent_500,
        },

        warn: {
            foreground: colors.White,
            background: colors.S_Warn_500,
        },
    }

    const variants = {
        initial: {
            style: {
                filter: `brightness(1)`,
            },
        },
        hovered: {
            style: {
                filter: `brightness(1.1)`,
            },
        },
        toggled: {
            style: {
                filter: `brightness(.8)`,
            },
        },
        active: {
            style: {
                filter: `brightness(.95)`,
            },
        },
    }

    const variant_1 =
        type === "p_outline"
            ? { border: `1px solid ${colors.Default}` }
            : variants[interactiveState]

    const variant_2 =
        type === "s_outline"
            ? { border: `1px solid ${colors.Secondary_500}` }
            : variants[interactiveState]

    const variant_3 =
        type === "w_outline"
            ? { border: `1px solid ${colors.White}` }
            : variants[interactiveState]

    const iconComponent = <Icon icon={icon} color={theme[type].foreground} />

    return (
        <Frame
            {...rest}
            {...interactiveProps}
            onTap={!disabled && handleTap}
            borderRadius={2}
            background={theme[type].background}
            {...variant_1}
            {...variant_2}
            {...variant_3}
            style={{
                ...variant_1.style,
                ...variant_2.style,
                ...variant_3.style,
                ...interactiveProps.style,
                ...style,
            }}
        >
            <Stack
                width="100%"
                height="100%"
                alignment="center"
                distribution="center"
                direction="horizontal"
                gap={-4}
            >
                {contentType === "both" &&
                    alignIcon === "left" &&
                    iconComponent}
                {contentType === "icon" ? (
                    iconComponent
                ) : (
                    <Text
                        resize
                        // Constant props
                        type="label"
                        color={theme[type].foreground}
                        text={text}
                    />
                )}
                {contentType === "both" &&
                    alignIcon === "right" &&
                    iconComponent}
            </Stack>
        </Frame>
    )
}

Button.defaultProps = {
    height: 56,
    width: 200,
    borderRadius: 2,
    disabled: false,
    text: "Get Started!",
    icon: "check",
    type: "primary",
    primary: true,
    toggle: false,
    onTap: () => null,
}

addPropertyControls(Button, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "Click",
    },
    type: {
        title: "Type",
        type: ControlType.Enum,
        options: [
            "primary",
            "p_outline",
            "secondary",
            "s_outline",
            "white",
            "w_outline",
            "accent",
            "warn",
        ],
        optionTitles: [
            "Primary",
            "Primary outline",
            "Secondary",
            "Secondary outline",
            "White",
            "White outline",
            "Accent",
            "Warn",
        ],
        defaultValue: "primary",
    },
    contentType: {
        title: "Show",
        type: ControlType.SegmentedEnum,
        options: ["text", "icon", "both"],
        optionTitles: ["Text", "Icon", "Both"],
        defaultValue: "text",
    },
    alignIcon: {
        title: "Align icon",
        type: ControlType.SegmentedEnum,
        options: ["left", "right"],
        optionTitles: ["<", ">"],
        defaultValue: "left",
        hidden: ({ contentType }) => contentType === "text",
    },
    icon: {
        title: "Icon",
        type: ControlType.Enum,
        options: iconNames,
        optionTitles: iconTitles,
        defaultValue: "check",
        hidden: ({ contentType }) => contentType === "text",
    },
    toggle: {
        type: ControlType.Boolean,
        title: "Toggle",
        defaultValue: false,
    },
    toggled: {
        type: ControlType.Boolean,
        title: "Toggled",
        defaultValue: false,
        hidden: ({ toggle }) => !toggle,
    },
    disabled: {
        type: ControlType.Boolean,
        title: "Disabled",
        defaultValue: false,
    },
})
