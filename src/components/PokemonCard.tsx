import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

interface ComponentProps {
    image: string,
    name: string,
    types: string[],
    id: string
}

export default function PokemonCard({ name, image, id, types }: ComponentProps) {
    return (
        <Border types={types} index={id}>
            <Link to={`/${id}`}>
                <Wrapper>
                    <ImageWrapper>
                        <img src={image} alt={name + "-image"} />
                    </ImageWrapper>
                    <Number>#{id}</Number>
                    <Info type={types[0]}>
                        <p className="name">{name}</p>

                        <div className="types">
                            {
                                types.map((element, index) =>
                                    <Type key={index} type={element}>
                                        {element}
                                    </Type>
                                )
                            }
                        </div>
                    </Info>
                </Wrapper>
            </Link>
        </Border>
    )
}

const Wrapper = styled.div`
    background: radial-gradient(121.73% 181.92% at 6.77% 4.33%, #4F5275 0%, #33304B 100%);
    border-radius: 15px;
    overflow: hidden;
`;

const Border = styled.div<{ types: string[], index: string }>`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: .3s;
    padding: 2px;

    ${({ types, theme }) => {
        if (types.length > 1) {
            return css`
                background: linear-gradient(135deg, 
                    ${theme.colors[types[0]]} 0%, 
                    ${theme.colors[types[1]]} 100%
                ); 
            `
        } else {
            return css`
                background: ${theme.colors[types[0]]};  
            `
        }
    }}

    :hover {
        transform: translateY(-15px);
        background: linear-gradient(135deg, 
                    ${({ types, theme }) => theme.colors[types[1]]} 0%, 
                    ${({ types, theme }) => theme.colors[types[0]]} 100%
        );
    }
`;

const ImageWrapper = styled.div`
    width: 60%;
    height: 150px;
    margin: auto;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
    }   
`;

const Info = styled.div<{ type: string }>`
    background: radial-gradient(133.41% 135.91% at 85.45% 113.45%, #383652 0%, #2A2A3D 100%);
    padding: 10px 0;

    .name {
        text-transform: capitalize;
        font-size: 18px;
        color: white;
        margin: 0;
        text-align: center;
        margin-bottom: 10px;
    }   

    .types {
        display: flex;
        gap: 10px;
        justify-content: center;

            p {
                margin: 0;
            }
    }
`;

export const Type = styled.div<{ type: string }>`
    font-size: 12px;
    border-radius: 4px;
    min-width: 70px;
    padding: 2px 5px;
    text-align: center;
    background-color: ${({ type, theme }) => theme.colors[type]};
    color: white;
`

const Number = styled.div`
    position: absolute;
    right: 15px;
    top: 5px;
    font-size: 32px;
    font-weight: 600;
    color: #575b81
`;