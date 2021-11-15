import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../utils/axios";

interface PokemonData {
    name: string;
    id: string,
    image: string,
    type: string
}

const PokemonList: Function = () => {
    const [pokemons, setPokemons] = useState<PokemonData[] | null>(null)

    useEffect(() => {
        let promises = []
        for (let i = 1; i <= 100; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`
            promises.push(api.get(url).then(res => res.data))
        }

        Promise.all(promises).then(res => {
            setPokemons(res.map(e => ({
                name: e.name,
                id: e.id,
                image: e.sprites['front_default'],
                type: e.types.map((type: any) => type.type.name).join(", ")
            })));
        })
    }, [])

    console.log(pokemons)

    return (
        <Wrapper>

        </Wrapper>
    )
}

export default PokemonList;

const Wrapper = styled.div`

`;