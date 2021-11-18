import { useEffect, useState } from "react";
import styled from "styled-components";
import PokemonCard from "../components/PokemonCard";
import api from "../utils/axios";
import Select, { MultiValue, SingleValue } from "react-select"
import { pokemonTypes } from "../utils/pokemonTypes";
import { ReactComponent as Pokeball } from "../assets/pokeball.svg"

interface PokemonData {
    name: string;
    id: string,
    image: string,
    types: string[]
}

interface FilterTpyes {
    label: string,
    value: string
}

const PokemonList: Function = () => {
    const [pokemons, setPokemons] = useState<PokemonData[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [filteredTypes, setFilteredTypes] = useState<FilterTpyes[] | null>(
        localStorage.getItem("filtered-types")
            ? JSON.parse(localStorage.getItem("filtered-types") || "")
            : null
    )

    const [filteredId, setFilteredId] = useState<FilterTpyes | null>(
        localStorage.getItem("filtered-id")
            ? JSON.parse(localStorage.getItem("filtered-id") || "")
            : null
    )

    useEffect(() => {
        setLoading(true);
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
            setLoading(false)
        })
    }, [])

    const filterByName = (val: SingleValue<{ value: string; label: string; }>) => {
        if (val === null) {
            setFilteredId(null)
            localStorage.removeItem("filtered-id")
        } else {
            setFilteredId(val)
            localStorage.setItem("filtered-id", JSON.stringify(val))
        }
    }

    const filterByType = (val: MultiValue<{ value: string; label: string; }>) => {
        if (val.length === 0) {
            setFilteredTypes(null)
            localStorage.removeItem("filtered-types")
        } else {
            localStorage.setItem("filtered-types", JSON.stringify(val))
            setFilteredTypes([...val])
        }
    }

    const pokemonListGenerator = () => {
        let filteredData = pokemons && [...pokemons];

        if (filteredTypes) {
            filteredData = pokemons && [...pokemons?.filter(e => {
                const filtered = filteredTypes?.map(filterElement => e.types.includes(filterElement.value))
                return filtered?.includes(true) ? true : false
            })]
        }

        if (filteredId) {
            filteredData = filteredData && filteredData?.filter(e => e.id === filteredId.value)
        }

        return filteredData;
    }

    return (
        <ListWrapper>
            <Filters>
                <Select
                    options={pokemonListGenerator()?.map(e => ({ value: e.id, label: e.name }))}
                    onChange={(val) => filterByName(val)}
                    placeholder="Find by name"
                    className="select"
                    isClearable
                    value={filteredId}
                />

                <Select
                    options={pokemonTypes.map(e => ({ value: e, label: e }))}
                    onChange={(val) => filterByType(val)}
                    placeholder="Filter by type"
                    isMulti
                    className="select"
                    value={filteredTypes}
                />
            </Filters>

            {loading && <StyledPokeball />}

            <PokemonsWrapper>
                {
                    pokemonListGenerator()?.map((element, index) =>
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
        </ListWrapper>
    )
}

export default PokemonList;

export const ListWrapper = styled.div`
    min-height: 100vh;
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
    grid-template-columns: repeat(auto-fill, minmax(200px, 0.5fr));
    place-items: center;
    gap: 40px 30px;
`;

const Filters = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;

    .select {
        font-size: 14px;
    }
`;

const StyledPokeball = styled(Pokeball)`
    position: absolute;
    top: calc(50% - 104px);
    left: calc(50% - 103px);
    animation: rotate 1s infinite cubic-bezier(0.895, 0.03, 0.685, 0.22);

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }

        from {
            transform: rotate(360deg);
        }
    }
`