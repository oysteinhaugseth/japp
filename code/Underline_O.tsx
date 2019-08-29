import * as React from "react"
import { addPropertyControls, ControlType, Frame } from "framer"
import { colors } from "./canvas"

const containerStyle: React.CSSProperties = {
    // backgroundColor: '#ddd',
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
}

const textStyle: React.CSSProperties = {
    color: colors.White,
    borderBottom: "1px solid currentColor",
    textAlign: "center",
    fontFamily: "Faktum",
    fontSize: "14px",
}

export function Underline(props) {
    return (
        <div style={containerStyle}>
            <span style={textStyle}>{props.myText}</span>
        </div>
    )
}

Underline.defaultProps = {
    myText: "Link",
    height: 56,
}

addPropertyControls(Underline, {
    myText: {
        type: ControlType.String,
        title: "Text",
    },
})
