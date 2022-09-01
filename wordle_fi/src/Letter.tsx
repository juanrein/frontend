type LetterProps = {
    letter: string;
    className: string;
}

function Letter(props: LetterProps) {
    return <td className={props.className}>{props.letter.toUpperCase()}</td>
}

export default Letter;