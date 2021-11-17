import { Route, Routes } from "react-router";
import PokemonDetail from "./containers/PokemonDetail";
import PokemonList from "./containers/PokemonList";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/:id" element={<PokemonDetail />} />
        </Routes>
    );
}

export default App;