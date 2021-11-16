import { useEffect, useState } from "react";
import styled from "styled-components";
import PokemonCard from "../components/PokemonCard";
import api from "../utils/axios";
import Select from "react-select"

interface PokemonData {
    name: string;
    id: string,
    image: string,
    types: string[]
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
                image: e.sprites['front_shiny'],
                types: e.types.map((type: any) => type.type.name)
            })));
        })
    }, [])

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <Wrapper>
            <Filters>
                <Select
                    options={pokemons?.map(e => ({ value: e.id, label: e.name }))}
                    onChange={(val) => console.log(val)}
                    placeholder="Find by name"
                    className="select"
                    isClearable
                />

                <Select
                    options={options}
                    onChange={(val) => console.log(val)}
                    placeholder="Filter by type"
                    isMulti
                    className="select"
                />
            </Filters>

            <PokemonsWrapper>
                {
                    pokemons?.map((element, index) =>
                        <PokemonCard
                            key={index}
                            image={element.image}
                            name={element.name}
                            types={element.types}
                            id={element.id}
                        />
                    )
                }
            </PokemonsWrapper>
        </Wrapper>
    )
}

export default PokemonList;

const Wrapper = styled.div`
    padding: 20px 100px;
    box-sizing: border-box;
    background: radial-gradient(121.73% 181.92% at 6.77% 4.33%, #4F5275 0%, #33304B 100%);

    @media(max-width: 1000px) {
        padding: 20px 60px;
    }

    @media(max-width: 850px) {
        padding: 20px 30px;
    }

    @media(max-width: 500px) {
        padding: 20px;
    }
`;

const PokemonsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    place-items: center;
    gap: 40px 30px;
`;

const Filters = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;

    .select {
        z-index: 200;
        font-size: 14px;
    }
`;