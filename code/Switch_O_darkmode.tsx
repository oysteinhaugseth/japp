// override for the switch component
// https://medium.com/@steveruiz/designing-a-switch-in-framer-x-part-iii-5abd476f9561
import { Override, Data } from "framer"

// data object keeping track of a single property theme that has the initial value "day"
const data = Data({
    theme: "day",
})

// function that gets called with the props of its connected Frame, and then returns an object of new props
export function DeviceFrame(props): Override {
    return {
        // returns a set of variants, day and night, and uses data.theme to determine both which variant to use when the connected component first mounts (its initial variant) and which variant the component should animate to when the component re-renders.
        variants: {
            day: {
                backgroundColor: "#ffffff",
            },
            night: {
                backgroundColor: "#222222",
            },
        },
        // uses data.theme to determine which variant to use when the connected component first mounts (initial variant)
        initial: data.theme,
        // uses data.theme to determine hich variant the component should animate to when the component re-renders.
        animate: data.theme,
    }
}

export function ThemeSwitch(props): Override {
    return {
        // overrides the connected component’s isOn with a value that is conditional on data.theme, returning true when data.theme is “night” and false when data.theme is “day”
        isOn: data.theme === "night",
        // overrides the onValueChange prop with a callback function that sets the value of data.theme to “night” if the switch was turned on or “day” if it was turned off.
        onValueChange: isOn => {
            data.theme = isOn ? "night" : "day"
        },
    }
}
