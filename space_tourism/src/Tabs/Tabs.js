import { useState } from "react"

function Tabs(props) {
    let [active, setActive] = useState(0);

    return (
        <div className="tabs">
            <div className="tabs-controls">
                {props.controls.map((c,i) => {
                    if (i === active) {
                        return (
                            <div key={i} 
                                onClick={() => setActive(i)} 
                                className="tabs-controls-active">
                                    {c}
                            </div>)
                    }
                    return (
                        <div key={i} onClick={() => setActive(i)} >{c}</div>
                    );
                })}
            </div>

            <div className="tabs-content">
                {props.contents[active]}
            </div>
        </div>
    )
}

export default Tabs;