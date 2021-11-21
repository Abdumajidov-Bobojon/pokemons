import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../utils/axios"

export const fetchPokemons = createAsyncThunk("app/fetchPokemons",
    async () => {
        let promises = []

        for (let i = 1; i <= 100; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`
            promises.push(api.get(url).then(res => res.data))
        }

        return Promise.all(promises).then(res => {
            return res.map(e => ({
                name: e.name,
                id: e.id,
                image: e.sprites['front_shiny'],
                types: e.types.map((type: any) => type.type.name)
            }));
        })
    }
)
