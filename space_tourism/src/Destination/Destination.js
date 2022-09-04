import Base from "../Base";
import Tabs from "../Tabs/Tabs";
import "./Destination.css";

import europa from "./images/image-europa.png";
import mars from "./images/image-mars.png";
import moon from "./images/image-moon.png";
import titan from "./images/image-titan.png";

function Destination() {
    let controls = [
        "Moon",
        "Mars",
        "Europa",
        "Titan",
    ]

    let contents = [
        <div className="planet">
            <img src={moon} alt="" />
            <div>
                <h1>Moon</h1>
                <p>See our planet as you’ve never seen it before. A perfect relaxing trip away to help
                    regain perspective and come back refreshed. While you’re there, take in some history
                    by visiting the Luna 2 and Apollo 11 landing sites.</p>
                <div className="info">
                    <div>
                        <p>Avg. distance</p>
                        <p className="number">384,400km</p>
                    </div>
                    <div>
                        <p>Est. travel time</p>
                        <p className="number">3 days</p>
                    </div>
                </div>
            </div>
        </div>,

        <div className="planet">
            <img src={mars} alt="" />
            <div>
                <h1>Mars</h1>
                <p>Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons,
                    the tallest planetary mountain in our solar system. It’s two and a half times
                    the size of Everest!</p>
                <div className="info">
                    <div>
                        <p>Avg. distance</p>
                        <p className="number">225 mil. km</p>
                    </div>
                    <div>
                        <p>Est. travel time</p>
                        <p className="number">9 months</p>
                    </div>
                </div>
            </div>
        </div>,
        <div className="planet">
            <img src={europa} alt="" />
            <div>
                <h1>Europa</h1>
                <p>The smallest of the four Galilean moons orbiting Jupiter, Europa is a
                    winter lover’s dream. With an icy surface, it’s perfect for a bit of
                    ice skating, curling, hockey, or simple relaxation in your snug
                    wintery cabin.</p>
                <div className="info">
                    <div>
                        <p>Avg. distance</p>
                        <p className="number">628 mil. km</p>
                    </div>
                    <div>
                        <p>Est. travel time</p>
                        <p className="number">3 years</p>
                    </div>
                </div>
            </div>
        </div>,
        <div className="planet">
            <img src={titan} alt="" />
            <div>
                <h1>Titan</h1>
                <p>The only moon known to have a dense atmosphere other than Earth, Titan
                    is a home away from home (just a few hundred degrees colder!). As a
                    bonus, you get striking views of the Rings of Saturn.
                </p>
                <div className="info">
                    <div>
                        <p>Avg. distance</p>
                        <p className="number">1.6 bil. km</p>
                    </div>
                    <div>
                        <p>Est. travel time</p>
                        <p className="number">7 years</p>
                    </div>
                </div>
            </div>
        </div>
    ]

    return (
        <Base id={"destination"}>
            <h1 className="main-h1">01 Pick your destination</h1>
            <Tabs controls={controls} contents={contents} />
        </Base>
    )
}

export default Destination;