import Base from "../Base";
import Tabs from "../Tabs/Tabs";
import "./Crew.css";
import ansari from "./images/image-anousheh-ansari.png";
import hurley from "./images/image-douglas-hurley.png";
import shuttleworth from "./images/image-mark-shuttleworth.png";
import glover from "./images/image-victor-glover.png";


function Crew() {
    let controls = [
        <div className="dot"></div>,
        <div className="dot"></div>,
        <div className="dot"></div>,
        <div className="dot"></div>,
    ]


    let contents = [
        <div className="crew-member">
            <div>
                <h2>Commander</h2>
                <h1> Douglas Hurley</h1>
                <p>  Douglas Gerald Hurley is an American engineer, former Marine Corps pilot
                    and former NASA astronaut. He launched into space for the third time as
                    commander of Crew Dragon Demo-2. </p>
            </div>
            <div className="hero">
                <img src={hurley} alt="" />
            </div>
        </div>,
        <div className="crew-member">
            <div>
                <h2> Pilot</h2>
                <h1> Victor Glover</h1>
                <p> Pilot on the first operational flight of the SpaceX Crew Dragon to the
                    International Space Station. Glover is a commander in the U.S. Navy where
                    he pilots an F/A-18.He was a crew member of Expedition 64, and served as a
                    station systems flight engineer.  </p>
            </div>
            <div className="hero">
                <img src={glover} alt="" />
            </div>
        </div>,
        <div className="crew-member">
            <div>
                <h2>Mission Specialist</h2>
                <h1> Mark Shuttleworth</h1>
                <p> Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind
                    the Linux-based Ubuntu operating system. Shuttleworth became the first South
                    African to travel to space as a space tourist. </p>
            </div>
            <div className="hero">
                <img src={shuttleworth} alt="" />
            </div>
        </div>
        ,
        <div className="crew-member">
            <div>
                <h2>Flight engineer</h2>
                <h1> Anousheh Ansari</h1>
                <p> Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems.
                    Ansari was the fourth self-funded space tourist, the first self-funded woman to
                    fly to the ISS, and the first Iranian in space. </p>
            </div>
            <div className="hero">
                <img src={ansari} alt="" />
            </div>
        </div>
    ]

    return (
        <Base id={"crew"}>
            <h1 className="main-h1">02 Meet your crew</h1>
            <Tabs controls={controls} contents={contents} />
        </Base>
    )
}

export default Crew;