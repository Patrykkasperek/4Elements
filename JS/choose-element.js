import {listener, fireArrays, waterArrays, earthArrays, airArrays} from "./main.js";


let backDoor;
const chooseYourElement = document.querySelector("#chooseYourElement");
const el = document.querySelector('.el');
const buttonsHandler = buttons;


starter.addEventListener("click",()=>{
    startGame.style.display = "none";
    chooseYourElement.style.display = "flex";
    header.style.display = "flex";
    backDoor = document.querySelector("#elementsCollection").outerHTML
    document.querySelector('#openSound').play()
    document.querySelector('#openSound').currentTime = 0;
    sound.style.display = 'flex'
    listener()
})

export default class Element {

    constructor(natureElement, elementPowers, rule, playerElemental, background, buttonsColor,chosenElement, pointsSumary, arrType) {
        this.element = natureElement;
        this.powers = elementPowers;
        this.rule = rule;
        this.player = playerElemental;
        this.background = background;
        this.buttonsColor = buttonsColor;
        this.chosenElement = chosenElement;
        this.pointsSumary = pointsSumary;
        this.arrType = arrType;
        

        this.clickHandler = this.gameRules.bind(this);
        this.clickhandler2 = this.backToChoose.bind(this);
        this.clickHandler3 = this.startGame.bind(this);
        this.clickHandler4 = this.pointRule.bind(this);
        this.clickHandler5 = this.chosen.bind(this);
        this.clickHandler6 = this.dropInterval.bind(this);
        this.clickhandler7 = this.buttonStyler.bind(this);
    }

    chosen() {
        header.innerHTML = `You choosen ${this.element}, and you have ${this.powers}`;
        chooseYourElement.innerHTML = this.rule;
        document.querySelector('#buttons').style.display = 'flex';
        document.querySelector('.container').appendChild(buttonsHandler)
        document.querySelector('#back').addEventListener("click", this.clickhandler2);
        document.querySelector('#next').addEventListener("click", this.clickHandler);
    }

    backToChoose() {
        header.innerHTML = "Choose your element:"
        chooseYourElement.innerHTML = backDoor
        chooseYourElement.style.display = "flex";
        document.querySelector('#buttons').style.display = 'none';
        document.querySelector('#next').innerHTML = 'Next <br> >';
        document.querySelector('#next').removeEventListener("click", this.clickHandler);
        document.querySelector('#next').removeEventListener("click", this.clickHandler3);
        tablePoints.style.display = "none";
        remember.style.display = "none";
        gameAction.style.display = 'none';
        endCard.style.display = 'none';
        header.style.display = 'flex'; 
        openSound.play()
        listener();
    }

    gameRules() {
        header.innerHTML = `Points in game with ${this.element}:`
        el.style.backgroundImage = `url('img/${this.background}.png')`
        this.clickHandler4();
        next.innerHTML = "START GAME";
        next.removeEventListener("click", this.clickHandler);
        next.addEventListener("click", this.clickHandler3);
    }

    startGame() {
        next.removeEventListener("click", this.clickHandler3);
        gameplay.style.display = 'flex';
        gameAction.style.display = 'flex'
        header.style.display = 'none';
        chooseYourElement.style.display = 'none';
        tablePoints.style.display = "none";
        remember.style.display = 'none'
        endCard.style.display = 'none'
        buttons.remove()
        sound.style.display = 'none'
        soundOnAction.style.display = 'flex'
        gameplay.style.background = `url(img/${this.background}Background.png)`;

        if (soundControl.classList.contains('on')) {
            soundControl.setAttribute('class', 'off')
            soundControlAction.setAttribute('class', 'on')
            openSound.pause()
            gameSound.play()
        }
        else if (soundControl.classList.contains('off') && soundControlAction.classList.contains('on')) {
            soundControlAction.setAttribute('class', 'on')
            gameSound.play()
        }
        else if (soundControl.classList.contains('off') && soundControlAction.classList.contains('off')) {
            soundControlAction.setAttribute('class', 'off')
            gameSound.pause()
        }
        else {
            soundControl.setAttribute('class', 'off')
            soundControlAction.setAttribute('class', 'off')
            openSound.pause()
            gameSound.pause()
        }

        this.clickhandler7();
        this.clickHandler6();

        

    }

    pointRule = () => {
        tablePoints.style.display = "flex";
        remember.style.display = "flex"
        chooseYourElement.style.display = "none";

        if (this.element === "fire element") {
            this.tablePointsConstructor(fireArrays)
        }
        else if (this.element === "water element") {
            this.tablePointsConstructor(waterArrays)
        }
        else if (this.element === "earth element") {
            this.tablePointsConstructor(earthArrays)
        }
        else {
            this.tablePointsConstructor(airArrays)
        }
    };

    tablePointsConstructor = (arrays) => {
        const tableData = tablePoints.getElementsByTagName("td")

        let arr1 = 0;
        let arr2 = 0;
        let arr3 = ["attack <br>", "bypass <br>", "defence <br>"]

        for (const table of tableData) {
            table.innerHTML = arr3[arr2] + arrays[arr1][arr2]
            arr1++
            if (arr1 === 4) {
                arr1 = 0;
                arr2++;
            } 
        }
    }

    buttonStyler() {
        document.querySelector("#attack").style.background = this.buttonsColor;
        document.querySelector("#defend").style.background = this.buttonsColor;

        attack.addEventListener("mousedown", () => {
            document.querySelector("#attack").setAttribute("style", "background-color: white")
            document.querySelector('#attackSound').play()
            this.attack(this.arrType);
        })
        attack.addEventListener("mouseup", () => {
            document.querySelector("#attack").setAttribute("style", `background-color: ${this.buttonsColor}`)
        })
        defend.addEventListener("mousedown", () => {
            document.querySelector("#defend").setAttribute("style", "background-color: white")
            document.querySelector('#defenceSound').play()
            this.defend(this.arrType);
        })
        defend.addEventListener("mouseup", () => {
            document.querySelector("#defend").setAttribute("style", `background-color: ${this.buttonsColor}`)
        })
    }

    attack(arr) {

        const target = document.querySelector('#target')

        if (target) {
            if (target.classList.contains('fire')) {
                this.pointsSumary += arr[0][0]
            }
            else if (target.classList.contains('water')) {
                this.pointsSumary += arr[1][0];
            }
            else if (target.classList.contains('earth')) {
                this.pointsSumary += arr[2][0];
            }
            else if (target.classList.contains('air')) {
                this.pointsSumary += arr[3][0];
            }
            target.remove();
            pointer.innerHTML = this.pointsSumary;
        }
    }

    defend(arr) {

        const target = document.querySelector('#target')

        if (target) {
            if (target.classList.contains('fire')) {
                this.pointsSumary += arr[0][2]
            }
            else if (target.classList.contains('water')) {
                this.pointsSumary += arr[1][2];
            }
            else if (target.classList.contains('earth')) {
                this.pointsSumary += arr[2][2];
            }
            else if (target.classList.contains('air')) {
                this.pointsSumary += arr[3][2];
            }
            target.remove();
            pointer.innerHTML = this.pointsSumary;
        }
    }

    bypass(arr) {
        const target = document.querySelector('#target')

        if (target) {
            if (target.classList.contains('fire')) {
                this.pointsSumary += arr[0][1]
            }
            else if (target.classList.contains('water')) {
                this.pointsSumary += arr[1][1];
            }
            else if (target.classList.contains('earth')) {
                this.pointsSumary += arr[2][1];
            }
            else if (target.classList.contains('air')) {
                this.pointsSumary += arr[3][1];
            }
            target.remove();
            pointer.innerHTML = this.pointsSumary;
        }
    }

    dropInterval() {
        const attackButton = document.querySelector("#attack");
        const DefendButton = document.querySelector("#defend");
        attackButton.addEventListener("click", this.attack);
        DefendButton.addEventListener("click", this.defend);
        this.creatingTarget();
        this.timer();
    }

    creatingTarget() {

        const creator = setInterval(() => {
            const elem = ['fire', 'water', 'earth', 'air'];
            const point = document.createElement("div")
            point.setAttribute("id", "target")
            point.setAttribute("class", elem[Math.floor(Math.random() * 4)])
            document.querySelector(".container").appendChild(point);

            if (point.classList.contains('fire')) {
                document.querySelector("#fireSound").play()
            }
            else if (point.classList.contains('water')) {
                document.querySelector("#waterSound").play()
            }
            else if (point.classList.contains('earth')) {
                document.querySelector("#earthSound").play()
            }
            else {
                document.querySelector("#airSound").play()
            }

            setTimeout(() => {
                this.bypass(this.arrType)
            }, 1700)

        }, 2500);

        setTimeout(() => { clearInterval(creator); }
            , 60000);
    }

    timer() {
        const seconds = setInterval(() => {
            timer.innerHTML -= 1;
        }, 1000)

        setTimeout(() => { clearInterval(seconds); }, 60000)

        setTimeout(() => {
            endCard.style.display = "flex";
            lastWords.innerHTML = `Your result is  <br><p id = "result"> ${this.pointsSumary}</p> Next time will be better! <br>You can choose another element, or play again with the same.${buttonsHandler.outerHTML}`
            next.addEventListener("click", this.clickHandler3)
            back.addEventListener("click", () => { location.reload() })
            gameSound.pause();
            gameSound.currentTime = 0
            this.pointsSumary = 0;
            pointer.innerHTML = this.pointsSumary;
            timer.innerHTML = 60;
            
        }, 62000)
    }

}