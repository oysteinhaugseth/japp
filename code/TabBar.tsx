import * as React from "react"
import { colors } from "./canvas"

import { Frame, Stack, addPropertyControls, ControlType } from "framer"

function TabButton({ title = "Title", onTap, active }) {
    const color = active === title ? colors.Primary_500 : "white"

    return (
        // <Frame background={colors.Alpha_0}>
        <Frame
            height={4}
            width={60}
            onTap={onTap}
            whileHover={{ scale: 1.1 }}
            borderRadius={0}
            background={color}
        >
            {title}
        </Frame>
        // </Frame>
    )
}

export function TabBar({ children }) {
    const [active, setActive] = React.useState(
        children.length ? children[0].props.name : null
    )

    function makeProps(title) {
        return {
            title: title,
            active: active,
            onTap: () => {
                setActive(title)
            },
        }
    }

    let activeView = (
        <Frame center background="" color="#fff">
            Add some children
        </Frame>
    )

    React.Children.forEach(children, child => {
        if (child.props.name === active) {
            activeView = React.cloneElement(child, {
                width: "100%",
                height: "100%",
                animate: { scale: 1 },
                initial: { scale: 1.1 },
            })
        }
    })

    const buttons = React.Children.map(children, child => {
        return <TabButton {...makeProps(child.props.name)} />
    })

    return (
        <Frame size={"100%"}>
            {activeView}
            <Stack
                bottom={0}
                width="100%"
                height={100}
                background="rgba(255, 0, 0, 0)"
                direction="horizontal"
                distribution="center"
            >
                {buttons}
            </Stack>
        </Frame>
    )
}

addPropertyControls(TabBar, {
    children: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.ComponentInstance,
        },
        maxCount: 5,
    },
})
