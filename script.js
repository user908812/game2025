const settingsMenu = document.getElementById('settings-menu');

const player1 = {
    element: document.querySelector(".player1"),
    speed: 10,
    keys: {
        forward: 'd',
        backwards: 'a'
    }
};
const player2 = {
    element: document.querySelector(".player2"),
    speed: 10,
    keys: {
        forward: 'ArrowRight',
        backwards: 'ArrowLeft'
    }
};

const players = [player1.element, player2.element];

window.addEventListener('DOMContentLoaded', () => {
    setPosAbsolute();
    setDefaultPosition(player1);
    setDefaultPosition(player2);
});

checkPlayerPosition();

ifIsColliding(player1.element, player2.element, () => {
    console.log('Collision detected')
});




function openSettingsMenu() {
    settingsMenu.showModal();
}

function setPosAbsolute() {
    player1.element.style.position = 'absolute';
    player2.element.style.position = 'absolute';
}

function setDefaultPosition(player) {
    if (!player.element.style.left) player.element.style.left = "0px";
    if (!player.element.style.top) player.element.style.top = "0px";
}

function walk(player, direction, speed) {
    let currentLeft = parseInt(player.style.left) || 0;
    // let currentTop = parseInt(player.style.top) || 0;

    if (direction === 'forward') {
        player.style.left = (currentLeft + speed) + 'px';
    } else if (direction === 'backwards') {
        player.style.left = (currentLeft - speed) + 'px';
    }
}

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case player1.keys.forward:
            walk(player1.element, 'forward', player1.speed);
            break;
        case player1.keys.backwards:
            walk(player1.element, 'backwards', player1.speed);
            break;
        case player2.keys.forward:
            walk(player2.element, 'forward', player2.speed);
            break;
        case player2.keys.backwards:
            walk(player2.element, 'backwards', player2.speed);
            break;
    }
});

function checkCollision(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

function checkPlayerPosition() {
    players.map(player => {
        setInterval(() => {
            if (parseInt(player.style.left) < 0) {
                player.style.left = 0;
            } else if (parseInt(player.style.left) > window.innerWidth - 90) {
                player.style.left = window.innerWidth - 90 + 'px';
            }
        }, 0);
    })
}

function ifIsColliding(elem1, elem2, action) {
    setInterval(() => {
        if (checkCollision(elem1, elem2)) {
            action();
        }
    }, 0);
}