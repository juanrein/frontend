window.onload = () => {
    setEventHandlers();
}

const SYMBOL_CHARACTERS = "!#¤%&/()=?@£${[]}^*,.-;:_<>";
const LETTER_CHARACTERS_LOWER = "abcdefghijklmnopqrstuvwxyzåäö";
const LETTER_CHARACTERS_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
const NUMBERS = "0123456789";

function computeStrength(params) {
    let {length, uppercase, lowercase, numbers, symbols} = params;
    if (length <= 0) {
        return 0;
    }
    if (!uppercase && !lowercase && !numbers && !symbols) {
        return 0;
    }
    let alphabetLength = 29;
    let total = 0;
    if (uppercase) {
        total += alphabetLength;
    }
    if (lowercase) {
        total += alphabetLength;
    }
    if (numbers) {
        total += 10;
    }
    if (symbols) {
        total += SYMBOL_CHARACTERS.length;
    }
    total *= length;

    let maxLength = (alphabetLength + alphabetLength + 10 + SYMBOL_CHARACTERS.length) * 20;

    let score = Math.ceil((total / maxLength) * 4);

    return score;
}

function updateStrength(score) {
    for (let i=0; i<score; i++) {
        let bar = document.getElementById(`bar${i+1}`);
        bar.classList.remove("non-active");
        bar.classList.add("active");
    }
    for (let i=score; i<4; i++) {
        let bar = document.getElementById(`bar${i+1}`);
        bar.classList.remove("active");
        bar.classList.add("non-active");
    }

    let p = document.getElementById("strength");
    switch (score) {
        case 0:
            p.textContent = "";
            break;
        case 1:
            p.textContent = "Very weak";
            break;
        case 2:
            p.textContent = "Weak";
            break;
        case 3:
            p.textContent = "Strong";
            break;
        case 4:
            p.textContent = "Very strong";
            break;
        default:
            break;
    }
}

function generatePassword(values) {
    let {length, uppercase, lowercase, numbers, symbols} = values;
    let chars = "";
    if (uppercase) {
        chars += LETTER_CHARACTERS_UPPER;
    }
    if (lowercase) {
        chars += LETTER_CHARACTERS_LOWER;
    }
    if (numbers) {
        chars += NUMBERS;
    }
    if (symbols) {
        chars += SYMBOL_CHARACTERS;
    }

    let password = "";
    for (let i=0; i<length; i++) {
        let index = Math.floor(Math.random() * chars.length);
        password += chars.charAt(index);
    }
    return password;
}

function getFieldValues() {
    let values = {
        "length": parseInt(document.getElementById("length").value),
        "uppercase": document.getElementById("uppercase").checked,
        "lowercase": document.getElementById("lowercase").checked,
        "numbers": document.getElementById("numbers").checked,
        "symbols": document.getElementById("symbols").checked,
    }
    return values;
}

function setEventHandlers() {
    document.getElementById("copy").addEventListener("click", e => {
        let value = document.getElementById("pw").value;
        navigator.clipboard.writeText(value).then(() => {
            console.log("success");
        }, () => {
            console.log("failed");
        })
    })

    document.getElementById("length").addEventListener("change", e => {
        let val = e.target.value;
        document.getElementById("character-length").textContent = val;
    })

    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("change", e => {
            let value;
            switch (e.target.type) {
                case "checkbox":
                    value = e.target.checked;
                    break;
                case "range":
                    value = e.target.value
                    break;
            }
            let values = getFieldValues();
            let score = computeStrength(values);
            updateStrength(score);
        })
    });

    document.getElementById("pw-form").addEventListener("submit", e => {
        e.preventDefault();
        let values = getFieldValues();
        let password = generatePassword(values);
        console.log(password);
        document.getElementById("pw").value = password;
    })
}