import * as React from "react"
import {
    addPropertyControls,
    ControlType,
    Stack,
    Frame,
    FrameProps,
} from "framer"

type Props = Partial<FrameProps> & {
    options: string[]
}

export function ListBullet(props: Partial<Props>) {
    const { options } = props

    return (
        <Stack
            width="100%"
            direction="vertical"
            alignment="center"
            gap={1}
            overflow="visible"
        >
            {options.map((option, index) => {
                return <Frame width="100%" backgroundColor="#fff" />
            })}
        </Stack>
    )
}

ListBullet.defaultProps = {
    options: [],
    height: 150,
    width: 335,
}

addPropertyControls(ListBullet, {
    options: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
        },
        defaultValue: ["Listitem", "Listitem", "Listitem"],
        title: "Options",
    },
})
