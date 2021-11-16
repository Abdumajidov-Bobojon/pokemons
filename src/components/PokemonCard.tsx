import { FC } from "react"
import styled from "styled-components"

interface ComponentProps {
    image: string,
    name: string,
    types: string[]
}

export default function PokemonCard({ name, image, types }: ComponentProps) {
    return (
        <Wrapper>
            <ImageWrapper>
                <img src={image} alt={name + "-image"} />
            </ImageWrapper>
            <Info>
                <h1>{name}</h1>
                {
                    types.map((element, index) =>
                        <p key={index} className={element}>{element}</p>)
                }
            </Info>
        </Wrapper>
    )
}


const Wrapper = styled.div`

`;

const ImageWrapper = styled.div`

`;

const Info = styled.div`

`;