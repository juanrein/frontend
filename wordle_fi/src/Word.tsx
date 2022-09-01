import Letter from "./Letter";

type WordProps = {
    quess: string;
    target: string;
    hideColors: boolean;
};

export default function Word(props: WordProps) {
    let letters = [];
    for (let i=0; i<props.quess.length; i++) {
        let className;
        if (props.hideColors) {
            className="empty";
        }
        else {
            if (props.quess[i] === props.target[i]) {
                className="correct";
            }
            else if (props.target.includes(props.quess[i])) {
                className = "wrongSpot";
            }
            else {
                className="empty";
            }
        }
        letters.push(<Letter key={i.toString()} className={className} letter={props.quess[i]} />)
    }
    for (let i=props.quess.length; i<5; i++) {
        letters.push(<Letter key={i.toString()} className="empty" letter={" "} />)
    }
    return (
        <tr>{letters}</tr>
    )
}