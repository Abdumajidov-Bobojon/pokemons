import { createSlice } from '@reduxjs/toolkit'
import { fetchPokemons } from './actions'

interface PokemonData {
    name: string;
    id: string,
    image: string,
    types: string[]
}

interface AppState {
    pokemons: Array<PokemonData> | [],
    loading: boolean
}

const initialState: AppState = {
    pokemons: [],
    loading: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPokemons.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchPokemons.fulfilled, (state, { payload }: any) => {
            state.pokemons = payload;
            state.loading = false
        })

    }
})

export default appSlice.reducer