import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled, { css } from "styled-components"
import api from "../utils/axios";
import { ListWrapper } from "./PokemonList";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg"
import { ReactComponent as Pokeball } from "../assets/pokeball.svg"
import { Type } from "../components/PokemonCard";

interface PokemonDetailInterface {
    name: string,
    id: string,
    image: string,
    types: string[],
    weight: string,
    height: string,
    stats: Array<{ id: number, stat: string }>
}

const PokemonDetail = () => {
    const [pokemon, setPokemon] = useState<PokemonDetailInterface>(Object)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => {
                setPokemon({
                    name: res.data.name,
                    id: res.data.id,
                    image: res.data.sprites['front_shiny'],
                    types: res.data.types.map((type: any) => type.type.name),
                    weight: res.data.weight,
                    height: res.data.height,
                    stats: res.data.stats.map((e: any) => ({
                        name: e.stat.name,
                        stat: e.base_stat
                    }))
                })
            })
    }, [id])

    console.log(pokemon)

    return (
        <DetailWrapper>
            <Detail types={pokemon.types}>
                <Pokeball className="pokeball" />

                <Header>
                    <ArrowLeft onClick={() => navigate("/")} />
                    <Name>{pokemon.name}</Name>
                    <Id>#{pokemon.id}</Id>
                </Header>

                <PokemonImage src={pokemon.image} alt={pokemon.name + "-image"} />

                <Info>
                    <Types>
                        {
                            pokemon.types?.map(e => <Type type={e}>{e}</Type>)
                        }
                    </Types>
                </Info>
            </Detail>
        </DetailWrapper >
    )
}

export default PokemonDetail

const DetailWrapper = styled(ListWrapper)`
    
`;

const Detail = styled.div <{ types: string[] }>`

    ${({ types, theme }) => types && css`
        background-color: ${theme.colors[types[0]]};
    `}

    width: 500px;
    margin: auto;
    padding: 5px;
    border-radius: 10px;
    position: relative;

    .pokeball {
        position: absolute;
        right: 20px;
    }
`;

const PokemonImage = styled.img`
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translateX(-50%);
`;

const Info = styled.div`
    width: 100%;
    height: 300px;
    background-color: white;
    margin-top: 130px;
    border-radius: 10px;
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