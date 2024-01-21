document.addEventListener("DOMContentLoaded", () => {
    const mario = document.querySelector(".mario");
    const pipe = document.querySelector(".pipe");
    const retry = document.querySelector(".retry");
    const game_over = document.querySelector(".game-over");
    const sound_over = new Audio("../audio/loser.m4a");
    var sound_back = new Audio("../audio/background.m4a");
    sound_back.play();

    let isJumping = false;
    let canDoubleJump = true;

    const jump = () => {
        if (!isJumping) {
            mario.classList.add("jump");

            setTimeout(() => {
                mario.classList.remove("jump");
            }, 700);

            isJumping = true;
            canDoubleJump = true;

            setTimeout(() => {
                isJumping = false;
            }, 700);
        } else if (canDoubleJump) {
            mario.classList.add("double-jump");

            setTimeout(() => {
                mario.classList.remove("double-jump");
            }, 700);

            canDoubleJump = false;
        }
    };


    const resetGame = () => {
        pipe.style.animation = "pipe-animation 1.5s infinite linear";
        mario.src = "../img/mario.png";
        mario.style.width = "150px";
        mario.style.bottom = "20vh";
        pipe.style.right = "-80px";
        mario.classList.remove("mario-losing");
        game_over.style.display = "none";
        game_over.style.opacity = "0";
        sound_over.pause();

        const newLoop = setInterval(() => {
            const pipePosition = pipe.offsetLeft;
            const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

            if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 170) {
                clearInterval(newLoop);

                setTimeout(() => {
                    game_over.style.display = "flex";
                    game_over.style.opacity = "1";
                }, 3000);
            }
        }, 10);
    };


    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 170 && marioPosition > -20) {
            pipe.style.animation = "none";
            pipe.style.left = `${pipePosition}px`;


            mario.style.bottom = `${marioPosition}px`;
            mario.src = "../img/game-over.png";
            mario.style.width = "75px";
            mario.style.marginLeft = "50px";
            mario.style.transition = "bottom .5s ease-in";
            sound_back.pause()

            setTimeout(() => {
                mario.style.bottom = `calc(${marioPosition}px + 200px)
                `;
            }, 200);
            setTimeout(() => {
                mario.style.bottom = "-20vh";
            }, 400);
            sound_over.play();

            clearInterval(loop);



            setTimeout(() => {
                game_over.style.display = "flex";
                game_over.style.opacity = "1";
            }, 3000);
        }



        retry.addEventListener("click", () => {
            window.location.reload();
        });
    }, 10);

    document.addEventListener("keydown", (event) => {
        if (event.keyCode === 32) {
            jump();
        }
    });

});
