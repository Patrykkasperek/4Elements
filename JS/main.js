import Element from './choose-element.js'
import * as rulesOfNature from "./rulesOfNature.js";

let player;

export const fireArrays = [[-5, 5, -5], [-10, -10, 10], [0, 5, -5], [10, 0, -5]];
export const waterArrays = [[10, 0, -5], [-5, 5, -5], [-10, -10, 10], [0, 5, -5]];
export const earthArrays = [[0, 5, -5], [10, 0, -5], [-5, 5, -5], [-10, -10, 10]];
export const airArrays = [[-10, -10, 10], [0, 5, -5], [10, 0, -5], [-5, 5, -5]];

const soundControl = document.querySelector('#soundControl');
const soundControlAction = document.querySelector('#soundControlAction')

const fireElement = new Element("fire element", "fire powers", rulesOfNature.ruleOfFire, "firePlayer", "fire", 'orange', player, 0, fireArrays);
const waterElement = new Element("water element", "water powers", rulesOfNature.ruleOfWater, "waterPlayer", "water", 'darkturquoise', player, 0, waterArrays);
const earthElement = new Element("earth element", "earth powers", rulesOfNature.ruleOfEarth, "earthPlayer", "earth", 'saddlebrown', player, 0, earthArrays);
const airElement = new Element("air element", "air powers", rulesOfNature.ruleOfAir, "airPlayer", "air", 'cornflowerblue', player, 0, airArrays);

export const listener = () => {

    const openSound = document.querySelector("#openSound");
    const gameSound = document.querySelector("#gameSound");

    document.querySelector("#fire").addEventListener("click", () => {
        fireElement.chosen();
        player = fireElement.player
    })
    document.querySelector("#water").addEventListener("click", () => {
        waterElement.chosen();
        player = waterElement.player;
    })
    document.querySelector("#earth").addEventListener("click", () => {
        earthElement.chosen();
        player = earthElement.player
    })
    document.querySelector("#air").addEventListener("click", () => {
        airElement.chosen();
        player = airElement.player
    })

    soundControl.addEventListener('click', () => {
        if (soundControl.classList.contains('on')) {
            soundControl.setAttribute('class', 'off')
            openSound.pause()
        }
        else {
            soundControl.setAttribute('class', 'on')
            openSound.play()
        }
    })

    soundControlAction.addEventListener('click', () => {
        if (soundControlAction.classList.contains('on')) {
            soundControlAction.setAttribute('class', 'off')
            gameSound.pause()
        }
        else {
            soundControlAction.setAttribute('class', 'on')
            gameSound.play()
        }
    })
}