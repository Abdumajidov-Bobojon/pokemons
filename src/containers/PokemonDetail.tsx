import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled, { css } from "styled-components"
import api from "../utils/axios";
import { ListWrapper } from "./PokemonList";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg"
import { ReactComponent as Pokeball } from "../assets/pokeball.svg"
import { Type } from "../components/PokemonCard";

import { ReactComponent as HeightIcon } from "../assets/height.svg"
import { ReactComponent as WeightIcon } from "../assets/weight.svg"
import { ReactComponent as SlideIcon } from "../assets/slide.svg"
import Stat from "../components/Stat";

interface PokemonDetailInterface {
    name: string,
    id: string,
    image: string,
    types: string[],
    weight: string,
    height: string,
    abilities: string[],
    stats: Array<{ id: number, stat: string }>
}

const PokemonDetail = () => {
    const [pokemon, setPokemon] = useState<PokemonDetailInterface>(Object)
    const [loading, setLoading] = useState<boolean>(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true);
        api.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(({ data }) => {
                setPokemon({
                    name: data.name,
                    id: data.id,
                    image: data.sprites['front_shiny'],
                    types: data.types.map((type: any) => type.type.name),
                    weight: data.weight,
                    height: data.height,
                    abilities: data.abilities.map((e: any) => e.ability.name),
                    stats: data.stats.map((e: any) => ({
                        name: e.stat.name,
                        stat: e.base_stat
                    }))
                })
                setLoading(false)
            })
    }, [id])

    const slide = (dir: string) => {
        if (dir === "left" && !(+id! - 1 <= 0)) {
            navigate(`/${+id! - 1}`)
        } else if (dir === "right" && !(+id! + 1 >= 101)) {
            navigate(`/${+id! + 1}`)
        }
    }

    return (
        <DetailWrapper>
            {
                !loading &&

                <Detail types={pokemon.types} key={Math.random()}>
                    <Pokeball className="pokeball" />

                    <LeftSlideIcon onClick={() => slide("left")} />
                    <RightSlideIcon onClick={() => slide("right")} />

                    <Header>
                        <ArrowLeft onClick={() => navigate("/")} />
                        <Name>{pokemon.name}</Name>
                        <Id>#{pokemon.id}</Id>
                    </Header>

                    <PokemonImage src={pokemon.image} alt={pokemon.name + "-image"} />

                    <Info>
                        <Types>
                            {
                                pokemon.types?.map((e, i) => <Type key={i} type={e}>{e}</Type>)
                            }
                        </Types>

                        <Title types={pokemon.types}>About</Title>
                        <AdditionalInfo>

                            <InfoCharacter>
                                <WeightIcon />
                                <p>Weight:</p>
                                {pokemon.weight} kg
                            </InfoCharacter>

                            <InfoCharacter>
                                <HeightIcon />
                                <p>Height:</p>
                                {pokemon.height} m
                            </InfoCharacter>
                        </AdditionalInfo>

                        <Title types={pokemon.types}>Abilities</Title>
                        <Abilities>
                            {
                                pokemon.abilities?.map((e, i) => <Ability key={i}>{e}</Ability>)
                            }
                        </Abilities>

                        <Title types={pokemon.types}>Base Stats</Title>

                        <Stats>
                            {
                                pokemon.stats?.map((e: any) =>
                                    <Stat key={e.name} name={e.name} stat={e.stat} types={pokemon.types} />
                                )
                            }
                        </Stats>
                    </Info>
                </Detail>
            }
        </DetailWrapper>
    )
}

export default PokemonDetail

const DetailWrapper = styled(ListWrapper)`
    @media(max-width: 500px) {
        margin: 0;
        padding: 0;
    }
`;

const Detail = styled.div <{ types: string[] }>`
    opacity: 1;
    animation-name: fade;
    animation-duration: 0.5s;

    ${({ types, theme }) => {
        if (types && types.length > 1) {
            return css`
                background: linear-gradient(135deg, 
                    ${theme.colors[types[0]]} 0%, 
                    ${theme.colors[types[1]]} 100%
                ); 
            `
        } else if (types) {
            return css`
                background: ${theme.colors[types[0]]};  
            `
        }
    }}

    max-width: 500px;
    margin: auto;
    padding: 5px;
    border-radius: 10px;
    position: relative;

    .pokeball {
        position: absolute;
        right: 20px;
        animation-name: rotate;
        animation-timing-function: linear;
        animation-duration: 20s;
        animation-iteration-count: infinite;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg)
        }

        to {
            transform: rotate(360deg);
        }
    }

    @media(max-width: 620px) {
        margin: 0 50px;
    }

    @media(max-width: 500px) {
        width: 100%;
        margin: 0;
        border-radius: 0;
        min-height: 100vh;
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
    }
`;

const PokemonImage = styled.img`
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 70px;
    transform: translateX(-50%);
    animation-name: float;
    animation-iteration-count: infinite;
    animation-duration: 1.5s;
    animation-direction: alternate;

    @keyframes float {
        from {
            top: 70px;
        }

        to {
            top: 60px;
        }
    }
`;

const Info = styled.div`
    width: 100%;
    min-height: 300px;
    background-color: white;
    margin-top: 100px;
    border-radius: 5px;
    padding-bottom: 24px;

    @media(max-width: 500px) {
        height: 100%;
    }
`;

const Header = styled.div`
    padding: 19px;
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;

    svg {
        cursor: pointer;
    }
`;

const Name = styled.h1`
    color: #fff;
    text-transform: capitalize;
`

const Id = styled.p`
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`;

const Types = styled.div`
    padding: 70px 20px 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

const AdditionalInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const InfoCharacter = styled.div`
    padding: 0 10px;
    display: flex;
    gap: 5px;
    align-items: center;
    color: #212121;
    font-size: 14px;

    svg {
        height: 16px;
    }
    
    p {
        font-size: 10px;
        color: #666666;
    }
`;

const Title = styled.h1<{ types: string[] }>`
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    margin: 16px 0;

    color: ${({ types, theme }) => types && theme.colors[types[0]]}
`;

const Stats = styled.div`
    
`;

const LeftSlideIcon = styled(SlideIcon)`
    position: absolute;
    top: 50%;
    left: -50px;
    width: 40px;
    height: 40px;
    cursor: pointer;

    @media(max-width: 500px) {
        width: 20px;
        height: 20px;
        left: 10px;
        stroke: grey;
    }
`

const RightSlideIcon = styled(LeftSlideIcon)`
    transform: rotate(180deg);
    left: auto;
    right: -50px;

    @media(max-width: 500px) {
        width: 20px;
        height: 20px;
        right: 10px;
        stroke: grey;
    }
`

const Abilities = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
`;

const Ability = styled.div`
    font-size: 14px;
`;
