import * as React from "react"
import { Frame, FrameProps, addPropertyControls, ControlType } from "framer"
import { useInteractionState } from "./Hooks"
import { colors } from "./canvas"

type Props = Partial<FrameProps> & {
    value: boolean
    disabled: boolean
    validation: (value: boolean) => boolean
    onValueChange: (value: boolean, valid: boolean) => any
}

export function RadioRow(props: Partial<Props>) {
    const {
        value: initialValue,
        onValueChange,
        validation,
        style,
        disabled,
        ...rest
    } = props

    /* ---------------------------------- State --------------------------------- */

    // Initialize state with props values
    const [state, setState] = React.useState({
        value: initialValue,
        valid: validation(initialValue),
    })

    // When the hook receives new props values, overwrite the state
    React.useEffect(() => {
        setState({
            ...state,
            value: initialValue,
            valid: validation(state.value || initialValue),
        })
    }, [initialValue, validation])

    /* ----------------------------- Event Handlers ----------------------------- */

    // When the user taps on the switch, run onValueChange and flip the isOn state
    const handleTap = React.useCallback(() => {
        if (state.value) return

        setState(state => {
            const value = true

            const valid = validation(value)

            onValueChange(value, valid)

            return {
                ...state,
                value,
                valid,
            }
        })
    }, [validation])

    /* ------------------------------ Presentation ------------------------------ */

    const { value, valid } = state

    return (
        <Frame
            {...rest}
            height={20}
            width={20}
            background="none"
            onTap={!disabled && handleTap}
            style={{ paddingRight: 50 }}
        >
            <Frame
                center
                borderRadius={"100%"}
                height={20}
                width={20}
                variants={{
                    on: {
                        background: colors.Primary_500,
                        border: `2px solid ${colors.Primary_500}`,
                    },
                    off: {
                        background: colors.C_Fill,
                        border: `0px solid ${colors.Primary_500}`,
                    },
                }}
                transition={{
                    duration: 0.15,
                }}
                initial={value ? "on" : "off"}
                animate={value ? "on" : "off"}
            />
        </Frame>
    )
}

RadioRow.defaultProps = {
    value: false,
    disabled: false,
    height: 20,
    width: 20,
    validation: () => true,
    onValueChange: () => null,
}

addPropertyControls(RadioRow, {
    value: {
        type: ControlType.Boolean,
        title: "Checked",
        defaultValue: false,
    },
})
