window.onload = () => {
    let orientation = 
        window.getComputedStyle(document.querySelector("main")).getPropertyValue("flex-direction");
    
    let image = new Image();
    if (orientation === "row") {
        image.src = "images/image-hero-desktop.png";
    }
    else {
        image.src = "images/image-hero-mobile.png";

        let menuOpen = new Image();
        menuOpen.src = "images/icon-menu.svg";

        let div = document.getElementById("menu-icon-container");
        div.appendChild(menuOpen);
        
        let menuClose = new Image();
        menuClose.src = "images/icon-close-menu.svg";
        menuClose.classList.add("hidden");
        menuClose.classList.add("menu-close");
        div.appendChild(menuClose);

        let links = document.getElementById("links");

        menuOpen.addEventListener("click", e => {
            document.querySelectorAll("#links nav, #links #login").forEach(n => n.classList.remove("hidden"));
            menuOpen.classList.add("hidden");
            menuClose.classList.remove("hidden");
            links.classList.add("hamburger-open");
        })

        menuClose.addEventListener("click", e => {
            document.querySelectorAll("#links nav, #links #login").forEach(n => n.classList.add("hidden"));
            menuOpen.classList.remove("hidden");
            menuClose.classList.add("hidden")
            links.classList.remove("hamburger-open");

        })

        document.querySelectorAll("#links nav, #links #login").forEach(n => n.classList.add("hidden"));
    }

    document.getElementById("hero-container").appendChild(image);

    document.querySelectorAll(".nav-multilevel").forEach(n => n.addEventListener("click", e => {
        n.classList.toggle("closed");
        n.querySelector(".icon-down").classList.toggle("hidden");
        n.querySelector(".icon-up").classList.toggle("hidden");
    }))
}