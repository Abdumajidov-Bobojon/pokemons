import { Route, Routes } from "react-router";
import PokemonList from "./containers/PokemonList";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<PokemonList />} />
        </Routes>
    );
}

export default App;