import styled, { css } from "styled-components"

interface ComponentProps {
    image: string,
    name: string,
    types: string[],
    id: string
}

export default function PokemonCard({ name, image, id, types }: ComponentProps) {
    return (
        <Wrapper types={types}>
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
    )
}

const Wrapper = styled.div<{ types: string[] }>`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: .3s;
    background: radial-gradient(121.73% 181.92% at 6.77% 4.33%, #4F5275 0%, #33304B 100%);
    
    ${({ types, theme }) => {
        if (types.length > 1) {
            return css`
                border-top: 1px solid ${theme.colors[types[0]]};
                border-left: 1px solid ${theme.colors[types[0]]};

                border-right: 1px solid ${theme.colors[types[1]]};
                border-bottom: 1px solid ${theme.colors[types[1]]};  
            `
        } else {
            return css`
                border: 1px solid ${theme.colors[types[0]]};  
            `
        }
    }}

    :hover {
        transform: translateY(-15px);
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
        z-index: 100;
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

const Type = styled.div<{ type: string }>`
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
    right: 5px;
    top: 5px;
    font-size: 32px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.3)
`;