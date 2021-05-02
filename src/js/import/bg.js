const body = document.querySelector("body");
const IMG_NUMBER = 3;

export function paintImg(imgNumber) {

    let imageSrc = `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url('./src/img/bg_v${imgNumber + 1}.png') 50% 50% no-repeat`;
    body.style.background = imageSrc;
    body.style.backgroundSize = "cover";
}
