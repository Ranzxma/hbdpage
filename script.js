/* =========================
   ENTER WEBSITE
========================= */

function enterWebsite() {

    const opening = document.getElementById("opening");
    const main = document.getElementById("main");
    const music = document.getElementById("bgMusic");
    const musicStatus = document.getElementById("musicStatus");

    if (!opening || !main) {
        return;
    }


    /* =========================
       PLAY MUSIC
    ========================= */

    if (music) {

        music.volume = 0.5;

        music.play()
            .then(() => {

                if (musicStatus) {
                    musicStatus.classList.add("active");
                }

            })
            .catch(error => {

                console.log(
                    "Musik tidak dapat diputar:",
                    error
                );

            });

    }


    /* =========================
       OPEN WEBSITE
    ========================= */

    opening.style.opacity = "0";

    opening.style.transition =
        "opacity 1s ease";


    setTimeout(() => {

        opening.style.display = "none";

        main.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        initializeRevealAnimations();

    }, 1000);

}


/* =========================
   SCROLL REVEAL
========================= */

function initializeRevealAnimations() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) {
        return;
    }


    const observer =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================
   INITIALIZATION
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const main =
            document.getElementById("main");

        if (
            main &&
            !main.classList.contains("hidden")
        ) {

            initializeRevealAnimations();

        }

    }
);


/* =========================
   STORY PHOTO UPLOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const photoInput =
            document.getElementById("photoInput");

        const uploadedPhoto =
            document.getElementById("uploadedPhoto");

        const photoPlaceholder =
            document.getElementById("photoPlaceholder");


        if (
            !photoInput ||
            !uploadedPhoto ||
            !photoPlaceholder
        ) {
            return;
        }


        photoInput.addEventListener(
            "change",
            function () {

                const file =
                    this.files[0];

                if (!file) {
                    return;
                }


                /* =========================
                   CHECK IMAGE
                ========================= */

                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    alert(
                        "Silakan pilih foto/gambar."
                    );

                    return;

                }


                /* =========================
                   DISPLAY PHOTO
                ========================= */

                const imageURL =
                    URL.createObjectURL(file);


                uploadedPhoto.src =
                    imageURL;

                uploadedPhoto.style.display =
                    "block";

                photoPlaceholder.style.display =
                    "none";


                /* =========================
                   CLEAN MEMORY
                ========================= */

                uploadedPhoto.onload = () => {

                    URL.revokeObjectURL(
                        imageURL
                    );

                };

            }
        );


        /* =========================
           IMAGE ERROR
        ========================= */

        uploadedPhoto.addEventListener(
            "error",
            () => {

                uploadedPhoto.style.display =
                    "none";

                photoPlaceholder.style.display =
                    "flex";

            }
        );

    }
);