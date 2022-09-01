window.onload = () => {
    window.onresize = () => {
        positionElements();
    }

    positionElements();

    setEventListeners();
}


function setEventListeners() {
    let form = document.getElementById("card-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let values = {}
        document.querySelectorAll("input[type=text]").forEach(inputField => {
            values[inputField.name] = inputField.value;
        })

        console.log(values);

        let after = document.getElementById("after-submit-screen");
        after.classList.remove("hidden");

        let cardForm = document.getElementById("card-form");
        cardForm.classList.add("hidden");
    })

    document.querySelectorAll("input[type=text]").forEach(inputField => {
        inputField.addEventListener("keyup", e => {
            console.log(inputField.name);
            switch (inputField.name) {
                case "cardholder":
                    let name = document.getElementById("fixed-name");
                    name.textContent = inputField.value;
                    break;
                case "cardnumber":
                    let number = document.getElementById("fixed-number");
                    number.textContent = inputField.value;
                    break;
                case "month":
                    let date = document.getElementById("fixed-date");
                    let oldText = date.textContent;
                    let newText = inputField.value + oldText.slice(2, 5);
                    date.textContent = newText;
                    break;
                case "year":
                    let datey = document.getElementById("fixed-date");
                    let oldTexty = datey.textContent;
                    let newTexty = oldTexty.slice(0, 3) + inputField.value;
                    datey.textContent = newTexty;
                    break;
                case "cvc":
                    let cvc = document.getElementById("fixed-cvc");
                    cvc.textContent = inputField.value;
                    break;
                default:
                    break;
            }            
        })
    })
}

function mobilePosition() {
    let cardBack = document.getElementById("img-card-back");
    let cardFront = document.getElementById("img-card-front");
    let dots = document.getElementById("img-card-dots");
    let number = document.getElementById("fixed-number");
    let name = document.getElementById("fixed-name");
    let date = document.getElementById("fixed-date");
    let cvc = document.getElementById("fixed-cvc");

    let img_w = Math.floor(cardBack.clientWidth);
    let img_h = Math.floor(cardBack.clientHeight);

    let top_margin = 20;

    cardFront.style.top = `calc(${top_margin}px + ${img_h}px / 2 + ${img_h}px * 0.075)`;

    dots.style.top = `calc(10px + ${top_margin}px + ${img_h}px / 2 + ${img_h}px * 0.075)`;
    number.style.top = `calc(${img_h}px / 2 + ${top_margin}px + ${img_h}px / 2 + ${img_h}px * 0.075)`;
    number.style.width = `${img_w}px`;

    name.style.top = `calc(${img_h}px + ${top_margin}px + ${img_h}px / 2 + ${img_h}px * 0.075 - 30px)`;
    
    date.style.top = `calc(${img_h}px + ${top_margin}px + ${img_h}px / 2 + ${img_h}px * 0.075 - 30px)`;
    date.style.right = `calc(100vw - ${top_margin}px - ${img_w}px + 36px)`;
 
    cvc.style.top = `calc(20px + ${img_h}px / 2 - ${img_h}px * 0.07)`;
    cvc.style.right = `calc(${top_margin}px + 24px + ${img_w}px * 0.07)`;


    let colorBlock = document.getElementById("color-block");
    let form = document.getElementById("card-form");

    colorBlock.style.height = 
        `calc(${img_h}px / 2 + ${top_margin}px + ${img_h}px / 2 + ${img_h}px * 0.075 + 25px)`;
    form.style.height = 
        `calc(100vh - ${img_h}px / 2 + ${top_margin}px + ${img_h}px / 2 + ${img_h}px * 0.075 + 25px)`;

    form.style.paddingTop = `calc(${img_h}px / 2)`;

    let after = document.getElementById("after-submit-screen");
    after.style.height = 
        `calc(100vh - ${img_h}px / 2 + ${top_margin}px + ${img_h}px / 2 + ${img_h}px * 0.075 + 25px)`;
    after.style.paddingTop = `calc(${img_h}px / 2)`;
}

function desktopPosition() {
    let cardBack = document.getElementById("img-card-back");
    let cardFront = document.getElementById("img-card-front");
    let dots = document.getElementById("img-card-dots");
    let number = document.getElementById("fixed-number");
    let name = document.getElementById("fixed-name");
    let date = document.getElementById("fixed-date");
    let cvc = document.getElementById("fixed-cvc");

    let img_w = Math.floor(cardBack.clientWidth);
    let img_h = Math.floor(cardBack.clientHeight);

    cardFront.style.top = `calc(100vh / 2 - ${img_h}px - 20px)`;
    cardBack.style.top = `calc(100vh / 2 + 20px)`;
    
    number.style.top = `calc(100vh / 2 - ${img_h}px - 20px + ${img_h}px / 2)`;
    number.style.left = `calc(40vw / 6)`;
    number.style.width = `${img_w}px`;

    name.style.top = `calc(100vh / 2 - ${img_h}px - 20px + ${img_h}px - 20px)`;
    name.style.left = `calc(40vw / 6 + 10px)`;

    date.style.top = `calc(100vh / 2 - ${img_h}px - 20px + ${img_h}px - 20px)`;
    date.style.left = `calc(40vw / 6 + ${img_w}px - 40px)`;

    cvc.style.top = `calc(100vh / 2 + 20px + ${img_h}px * 0.45)`;
    cvc.style.left = `calc(40vw / 3 + ${img_w}px - ${img_w}px * 0.2)`;

    let form = document.getElementById("card-form");
    form.style.paddingLeft = `calc(${img_w}px / 2)`;

    dots.style.top = `calc(100vh / 2 - ${img_h}px - 20px + 10px)`;


}

function positionElements() {
    let styles = window.getComputedStyle(document.getElementById("container"));
    let alignment = styles.getPropertyValue("flex-direction");

    console.log(alignment);
    if (alignment === "column") {
        mobilePosition();
    }
    else {
        desktopPosition();
    }

}