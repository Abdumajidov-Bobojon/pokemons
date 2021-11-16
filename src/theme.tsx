import { ReactNode } from 'react'
import { ThemeProvider, DefaultTheme } from "styled-components";

type ThemeProps = {
    children: ReactNode,
};

const Theme = ({ children }: ThemeProps) => {
    const theme: DefaultTheme = {
        colors: {
            grass: "#74CB48",
            poison: "#A43E9E",
            fire: "#F57D31",
            water: "#6493EB",
            bug: "#A7B723",
            flying: "#A891EC",
            electric: "#F9CF30",
            ghost: "#70559B",
            normal: "#AAA67F",
            psychic: "#FB5584",
            steel: "#B7B9D0",
            rock: "#B69E31",
            fairy: "#EBAFAE",
            fighting: "#6F874C",
            ground: "#B37658"

        }
    };

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme;