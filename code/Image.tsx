import * as React from "react"
import { Frame, addPropertyControls, ControlType, FrameProps } from "framer"
import { Favorite } from "./Favorite"
import { colors } from "./canvas"

type Props = FrameProps & {
    image: string
    overlay: boolean
    color: string
    favorite: boolean
    isFavorite: boolean
    onFavoriteChange: (isFavorite: boolean) => void
}

export function Image(props: Partial<Props>) {
    const {
        color,
        image,
        overlay,
        favorite,
        isFavorite,
        onFavoriteChange,
        ...rest
    } = props

    /* ------------------------------ Presentation ------------------------------ */

    // Hello R/GA

    return (
        <Frame {...rest} background="#ffffff">
            <Frame
                width="100%"
                height="100%"
                image={image || ""}
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    WebkitFilter: overlay
                        ? "contrast(120%) brightness(90%)"
                        : "contrast(100%) brightness(100%)",
                }}
                opacity={overlay ? 0.9 : 1}
                // Default background if no image
                background={colors.Primary_100}
            />
            {overlay && (
                <Frame
                    width="100%"
                    height="100%"
                    background={color}
                    style={{
                        mixBlendMode: "multiply",
                    }}
                />
            )}
            {favorite && (
                <Favorite
                    top={0}
                    right={0}
                    value={isFavorite}
                    onValueChange={onFavoriteChange}
                />
            )}
        </Frame>
    )
}

Image.defaultProps = {
    height: 223,
    width: 335,
    image: null,
    overlay: true,
    color: colors.Neutral_200,
    favorite: false,
    isFavorite: false,
    onFavoriteChange: isFavorite => null,
}

addPropertyControls(Image, {
    image: {
        title: "Image",
        type: ControlType.Image,
    },
    overlay: {
        title: "Multiply",
        type: ControlType.Boolean,
        defaultValue: false,
    },
    color: {
        title: "Color",
        type: ControlType.Color,
        hidden: ({ overlay }) => !overlay,
    },
    favorite: {
        title: "Favorite",
        type: ControlType.Boolean,
        defaultValue: false,
    },
    isFavorite: {
        title: "Is Favorite",
        type: ControlType.Boolean,
        defaultValue: false,
        hidden: ({ favorite }) => !favorite,
    },
})
