import { useEffect, useState } from "react";
import styled from "styled-components";
import PokemonCard from "../components/PokemonCard";
import Select, { MultiValue, SingleValue } from "react-select"
import { pokemonTypes } from "../utils/pokemonTypes";
import { ReactComponent as Pokeball } from "../assets/pokeball.svg"
import { ReactComponent as PokeballColored } from "../assets/PokeballColored.svg"
import { useAppDispatch } from "../store/hooks";
import { fetchPokemons } from "../store/actions";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store"
import { getFromStorage } from "../utils/functions";

interface FilterTpyes {
    label: string,
    value: string
}

const PokemonList: Function = () => {
    const [filteredTypes, setFilteredTypes] = useState<FilterTpyes[] | null>(getFromStorage("filtered-types"))
    const [filteredId, setFilteredId] = useState<FilterTpyes | null>(getFromStorage("filtered-id"))
    const { pokemons, loading } = useSelector((state: RootState) => state.app)
    const dispatch = useAppDispatch()

    useEffect(() => {
        pokemons.length === 0 && dispatch(fetchPokemons())
        let scrollPos = sessionStorage.getItem("scrollPosition");

        if (scrollPos) {
            window.scrollTo(0, parseInt(scrollPos))
        }

    }, [dispatch, pokemons.length])

    const filterByName = (val: SingleValue<{ value: string; label: string; }>) => {
        if (val === null) {
            setFilteredId(null)
            sessionStorage.removeItem("filtered-id")
        } else {
            setFilteredId(val)
            sessionStorage.setItem("filtered-id", JSON.stringify(val))
        }
    }

    const filterByType = (val: MultiValue<{ value: string; label: string; }>) => {
        if (val.length === 0) {
            setFilteredTypes(null)
            sessionStorage.removeItem("filtered-types")
        } else {
            sessionStorage.setItem("filtered-types", JSON.stringify(val))
            setFilteredTypes([...val])
        }
    }

    const pokemonListGenerator = () => {
        let stateCopy = [...pokemons ?? []];

        if (filteredTypes) {
            stateCopy = stateCopy.filter(stateCopyEl =>
                filteredTypes?.map(filterEl =>
                    stateCopyEl.types.includes(filterEl.value)).includes(true)
            )
        }

        // Strict filter mode!
        // if (filteredTypes) {
        //     stateCopy = stateCopy.filter(stateCopyEl => filteredTypes?.every(filterEl =>
        //         stateCopyEl.types.includes(filterEl.value))
        //     )
        // }

        if (filteredId) {
            stateCopy = stateCopy?.filter(e => e.id === filteredId.value)
        }

        return stateCopy;
    }

    return (
        <ListWrapper>
            <Header>
                <Logo>
                    <LogoPokeball />
                    Pokedox
                </Logo>

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
            </Header>

            {loading && <StyledPokeball />}

            <PokemonsWrapper>
                {
                    pokemonListGenerator()?.map((element, index) =>
                        <PokemonCard
                            onClick={() =>
                                sessionStorage.setItem(
                                    "scrollPosition", window.scrollY.toString()
                                )
                            }
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

    @media(max-width: 1150px) {
        padding: 20px 50px;
    }

    @media(max-width: 990px) {
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

    @media(max-width: 600px) {
        gap: 20px 15px;
    }
    
    @media(max-width: 460px) {
        grid-template-columns: 1fr;
        gap: 20px 15px;
    }
`;

const Filters = styled.div`
    display: flex;
    gap: 10px;

    .select {
        min-width: 300px;
        font-size: 14px;

        @media(max-width: 700px) {
            width: 100%;
            min-width: auto;
        }
    }

    @media(max-width: 700px) {
        width: 100%;
    } 

    @media(max-width: 600px) {
        flex-direction: column;
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

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    @media(max-width: 950px) {
        flex-direction: column;
        gap: 20px;
    }
`;

const LogoPokeball = styled(PokeballColored)`
    width: 50px;
    height: 50px;
    margin-right: 10px;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    color: white;
    font-size: 32px;
    font-weight: bold;
`