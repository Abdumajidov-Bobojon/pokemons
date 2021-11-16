import styled from "styled-components"

interface ComponentProps {
    image: string,
    name: string,
    types: string[],
    id: string
}

export default function PokemonCard({ name, image, id, types }: ComponentProps) {
    return (
        <Wrapper type={types[0]}>
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


const Wrapper = styled.div<{ type: string }>`
    width: 100%;
    height: 100%;
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
    border-radius: 15px;
    overflow: hidden;
    position: relative;

    border: 1px solid ${({ type, theme }) => theme.colors[type]};
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
    background-color: ${({ type, theme }) => theme.colors[type]};
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
        gap: 20px;
        justify-content: center;

        p {
            margin: 0;
        }
    }    
`;

const Type = styled.div<{ type: string }>`
    font-size: 12px;
    box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.18);
    border-radius: 11px;
    background-color: white;
    min-width: 70px;
    padding: 2px 5px;
    text-align: center;
`

const Number = styled.div`
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 32px;
    color: rgba(0, 0, 0, 0.3)
`;