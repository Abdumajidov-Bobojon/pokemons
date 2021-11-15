import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../utils/axios";

const PokemonList: Function = () => {
    const [pokemons, setPokemons] = useState()

    useEffect(() => {
        api.get("/pokemon?limit=100").then(res => console.log(res))
    }, [])

    return (
        <Wrapper>

        </Wrapper>
    )
}

export default PokemonList;

const Wrapper = styled.div`

`;