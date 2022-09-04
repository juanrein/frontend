import Tabs from "../Tabs/Tabs";
import "./Technology.css";
import Base from "../Base";

function Technology() {
    let controls = [
        <div className="number-dots">1</div>,
        <div className="number-dots">2</div>,
        <div className="number-dots">3</div>
    ]

    let contents = [
        <div className="tech">
            <div>
                <h2>The terminology</h2>
                <h1>The launch vehicle</h1>
                <p> A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a
                    payload from Earth's surface to space, usually to Earth orbit or beyond. Our
                    WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall,
                    it's quite an awe-inspiring sight on the launch pad!</p>
            </div>

            <div id="img-vehicle-container"></div>
        </div>,

        <div className="tech">
            <div>
                <h2>The terminology</h2>
                <h1>Spaceport</h1>
                <p> A spaceport or cosmodrome is a site for launching (or receiving) spacecraft,
                    by analogy to the seaport for ships or airport for aircraft. Based in the
                    famous Cape Canaveral, our spaceport is ideally situated to take advantage
                    of the Earth’s rotation for launch.</p>
            </div>

            <div id="img-spaceport-container"></div>
        </div>,

        <div className="tech">
            <div>
                <h2>The terminology</h2>
                <h1>Space capsule</h1>
                <p> A space capsule is an often-crewed spacecraft that uses a blunt-body reentry
                    capsule to reenter the Earth's atmosphere without wings. Our capsule is where
                    you'll spend your time during the flight. It includes a space gym, cinema,
                    and plenty of other activities to keep you entertained.</p>
            </div>

            <div id="img-capsule-container"></div>
        </div>

    ]

    return (
        <Base id={"technology"}>
            <h1 className="main-h1">03 Space launch 101</h1>
        
            <Tabs controls={controls} contents={contents} />
        </Base>
    );
}

export default Technology;