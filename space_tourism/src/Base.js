import Navigation from "./Navigation/Navigation"


function Base(props) {
    return (
        <div id={props.id} className="base">
            <>
                {<Navigation />}
                <main>
                    {props.children}
                </main>
            </>
        </div>
    )
}

export default Base;