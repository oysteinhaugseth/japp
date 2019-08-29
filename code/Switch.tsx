// https://www.framer.com/blog/posts/creating-a-switch/

import * as React from "react"
import { Frame, ControlType, addPropertyControls } from "framer"
import { colors } from "./canvas"

// use for styling not yet in the Framer API
const myStyle: React.CSSProperties = {
    // backgroundColor: colors.Primary,
    // color: colors.White,
}

export function Switch(props) {
    // hook to define the component’s initial state
    const [state, setState] = React.useState({
        isOn: props.isOn,
    })

    // runs when component receives a different value for props.isOn (from property controls) and, if necessary, updates state.isOn to match props.isOn
    React.useEffect(() => {
        if (state.isOn !== props.isOn) {
            setState({ isOn: props.isOn })
        }
    }, [props.isOn])

    // function to run when flip is switched
    const flipSwitch = () => {
        // called when flip is switched
        props.onValueChange(!state.isOn)
        // update (invert) state when flip is switched
        setState({ isOn: !state.isOn })
    }

    return (
        // Frame for the switch’s container and Frame for the switch's knob
        <Frame
            // event to run flipSwitch when container Frame is tapped
            onTap={flipSwitch}
            // container is defined by the Frame’s visual states using a pair of variants named "on" and "off".
            variants={{
                off: {
                    background: colors.C_Fill,
                },
                on: {
                    background: colors.Primary_500,
                },
            }}
            // container Frame set to start with "on" variant if component’s initial state.isOn is true, otherwise start with the "off" variant
            initial={state.isOn ? "on" : "off"}
            // container Frame set to animate to a different state, using the same logic as in the previous step, for any future renders. (The Frame will render each time its state changes.)
            animate={state.isOn ? "on" : "off"}
            // animation’s transition is defined, a tween animation that takes .2 seconds to complete.
            transition={{ type: "tween", duration: 0.2 }}
            height={50}
            width={80}
            radius={25}
            center
            size="100%"
            style={myStyle}
        >
            <Frame
                // changes made to the container’s variant (using the initial and animate props) will also set the knob Frame’s variant.
                variants={{
                    off: {
                        x: 0,
                    },
                    on: {
                        x: 30,
                    },
                }}
                // transition defined for the knob’s animation.
                transition={{ type: "tween", duration: 0.2 }}
                size={46}
                top={2}
                left={2}
                radius="100%"
                background="#fff"
            />
        </Frame>
    )
}

// default props for the component
Switch.defaultProps = {
    // ensures component has a value for props.isOn
    isOn: false,
    // event handler, accepts a boolean argument isOn and returns null as default. Will be set with override if used.
    onValueChange: isOn => null,
    // sets size of frame container
    height: 50,
    width: 80,
}

// settings in Framer to change defaultProps
addPropertyControls(Switch, {
    isOn: {
        type: ControlType.Boolean,
        title: "On",
        defaultValue: false,
    },
})
