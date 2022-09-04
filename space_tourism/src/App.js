import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import Destination from './Destination/Destination';
import Crew from './Crew/Crew';
import Technology from "./Technology/Technology";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='destination' element={<Destination />} />
                <Route path='crew' element={<Crew />} />
                <Route path='technology' element={<Technology />} />
            </Routes>
        </div>
    );
}


export default App;
