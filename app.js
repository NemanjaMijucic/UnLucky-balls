const numbers = document.querySelectorAll('.number');
const combinationContainer = document.querySelector('.combination');
let combinationArr = [];
const start = document.getElementById('start');
const drum = document.querySelector('.drum');
const drawedNumberBall = document.querySelectorAll('.ball');
let drawedNumbers = [];
const allNumbersDiv = document.querySelector('#all-numbers');
let winningComb = [];
const betAmount = document.querySelector('#bet-amount');
const prize = document.querySelector('.prize');
const money = document.querySelector('#money');
const guessedNumbers = document.querySelector('.guessed-numbers');
const ballsHolder = document.querySelector('.balls-holder');
ballsHolder.style.visibility = 'hidden';
const drawDiv = document.querySelector('#draw');
const playAgain = document.querySelector('.play-again');
playAgain.style.visibility = 'hidden';
const title = document.getElementById('title');

const modalBg = document.querySelector('.modal-bg');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal-text');
const closeBtn = document.querySelector('.close-btn');
const rules = document.getElementById('rules');

//rules div
rules.addEventListener('click', function() {
    modalAlert('Pick six numbers out of eighty and place a bet beetween $1 to $10000. Based on guessed numbers your winnings are multiplied')
})

//inserting numbers into buttons 
function insertNum() {
    for (let i = 0; i < 80; i++) {
        numbers[i].innerText = i + 1;
    }
}
insertNum();



//selecting numbers for draw
numbers.forEach(function (number) {
    number.addEventListener('click', function (e) {
        const selectedNum = e.target;

        if (combinationArr.length === 6) {
            removeNumber(selectedNum);
            return;
        }

        if (combinationArr.length <= 5) {
            if (!combinationArr.includes(+selectedNum.innerText)) {
                combinationArr.push(+selectedNum.innerText);
                selectedNum.classList.add('gray');
                addNumber(selectedNum);
            } else {
                removeNumber(selectedNum);
            }
        }



    });
});


//add number to combination container div
function addNumber(selectedNum) {
    const uiNumber = document.createElement('button');
    uiNumber.innerText = +selectedNum.innerText;
    uiNumber.classList.add('number');
    combinationContainer.appendChild(uiNumber);

    addColor(selectedNum, uiNumber);


}

//add color to ui number
function addColor(selectedNum, uiNumber) {
    if (selectedNum.classList.contains('yellow')) {
        uiNumber.classList.add('yellow');
    }
    if (selectedNum.classList.contains('red')) {
        uiNumber.classList.add('red');
    }
    if (selectedNum.classList.contains('green')) {
        uiNumber.classList.add('green');
    }
    if (selectedNum.classList.contains('blue')) {
        uiNumber.classList.add('blue');
    }
    if (selectedNum.classList.contains('purple')) {
        uiNumber.classList.add('purple');
    }
}

//remove number from combination container

function removeNumber(selectedNum) {
    combinationArr.forEach((comb, index) => {
        if (comb === +selectedNum.innerText) {
            combinationArr.splice(index, 1);
        }
        if (selectedNum.classList[0] === 'number' && comb === +selectedNum.innerText) {
            selectedNum.classList.remove('gray');
            combinationContainer.removeChild(combinationContainer.childNodes[index]);
        }
    });
}

//drawing of numbers

start.addEventListener('click', function () {
    if (betAmount.value > 100000 || isNaN(betAmount.value) || betAmount.value < 0 || betAmount.value === '') {
        modalAlert('please place bet between $1 and $10000')
        return
        
    } if (combinationArr.length < 6) {
        modalAlert('please select six numbers')
        return
        
    }
    else if(betAmount.value > 100000 || isNaN(betAmount.value) || betAmount.value < 0 || betAmount.value === '' || combinationArr.length === 6){
       
        drawingNumbers();
    }
    ballsHolder.style.visibility = 'visible';
});

function drawingNumbers() {

    while (drawedNumbers.length < 20) {
        let drawedNumber = Math.floor(Math.random() * 80) + 1;

        if (!drawedNumbers.includes(drawedNumber)) {
            drawedNumbers.push(drawedNumber);
        }
    }
    for (let i = 0; i < drawedNumbers.length; i++) {
        setTimeout(function () {
            drum.innerText = drawedNumbers[i];
            if (drawedNumbers[i] <= 16) {
                drum.style.backgroundColor = 'yellow';
            }
            if (drawedNumbers[i] >= 17 && drawedNumbers[i] <= 32) {
                drum.style.backgroundColor = 'rgb(230, 4, 4)';
            }
            if (drawedNumbers[i] >= 33 && drawedNumbers[i] <= 48) {
                drum.style.backgroundColor = 'rgb(39, 39, 238)'
            }
            if (drawedNumbers[i] >= 49 && drawedNumbers[i] <= 64) {
                drum.style.backgroundColor = 'rgb(150, 4, 150)';
            }
            if (drawedNumbers[i] > 65) {
                drum.style.backgroundColor = 'rgb(3, 235, 3)';
            }

        }, 2000 * i);

    }
    setTimeout(insertingNumInBall, 2000);
    start.disabled = true;

    drawedNumbers.forEach(function (numb) {
        combinationArr.forEach(function (selnumb) {
            if (numb === selnumb) {
                winningComb.push(selnumb);
            }
        });
    });

    /*function for winnings*/

    setTimeout(function () {
        if (winningComb.length < 1) {
            money.innerText = 'No gusses, better luck next time :(';
        }
        if (winningComb.length === 1) {
            let win = parseInt(betAmount.value) * 2;
            colorDrawedNumbers();
            money.innerText = `You won ${win} $, guessed number:`

        }
        if (winningComb.length === 2) {
            let win = parseInt(betAmount.value) * 5;
            colorDrawedNumbers();
            money.innerText = `You won ${win} $, guessed numbers:`
        }
        if (winningComb.length === 3) {
            let win = parseInt(betAmount.value) * 20;
            colorDrawedNumbers();
            money.innerText = `You won ${win} $, guessed numbers:`
        }
        if (winningComb.length === 4) {
            let win = parseInt(betAmount.value) * 100;
            colorDrawedNumbers();
            money.innerText = `You won ${win} $, guessed numbers:`
        }
        if (winningComb.length === 5) {
            let win = parseInt(betAmount.value) * 300;
            colorDrawedNumbers();
            money.innerText = `You won ${win} $, guessed numbers:`
        }
        if (winningComb.length === 6) {
            let win = parseInt(betAmount.value) * 1000;
            colorDrawedNumbers();
            money.innerText = `You won ${win} $, guessed numbers:`
        }

        drum.style.visibility = 'hidden';
        window.scrollTo(0, 900);
        playAgain.style.visibility = 'visible';
        playAgain.addEventListener('click', function () {
            setTimeout(function () { window.location.reload(); window.scrollTo(0, 0); }, 500);
        });
    }, 40000);
}

function insertingNumInBall() {
    for (let i = 0; i < drawedNumbers.length; i++) {
        setTimeout(function () {
            drawedNumberBall[i].innerText = drawedNumbers[i];
            if (drawedNumbers[i] <= 16) {
                drawedNumberBall[i].style.backgroundColor = 'yellow';
            }
            if (drawedNumbers[i] >= 17 && drawedNumbers[i] <= 32) {
                drawedNumberBall[i].style.backgroundColor = 'rgb(230, 4, 4)';
            }
            if (drawedNumbers[i] >= 33 && drawedNumbers[i] <= 48) {
                drawedNumberBall[i].style.backgroundColor = 'rgb(39, 39, 238)';
            }
            if (drawedNumbers[i] >= 49 && drawedNumbers[i] <= 64) {
                drawedNumberBall[i].style.backgroundColor = 'rgb(150, 4, 150)';
            }
            if (drawedNumbers[i] >= 65) {
                drawedNumberBall[i].style.backgroundColor = 'rgb(3, 235, 3)';
            }
        }, 2000 * i);
    }
}

function colorDrawedNumbers() {
    winningComb.forEach(function (wonNum) {
        const winningNumb = document.createElement('button');
        winningNumb.classList.add('number');
        if (wonNum <= 16) {
            winningNumb.style.backgroundColor = 'yellow';
        }
        if (wonNum >= 17 && wonNum <= 32) {
            winningNumb.style.backgroundColor = 'rgb(230, 4, 4)';
        }
        if (wonNum >= 33 && wonNum <= 48) {
            winningNumb.style.backgroundColor = 'rgb(39, 39, 238)';
        }
        if (wonNum >= 49 && wonNum <= 64) {
            winningNumb.style.backgroundColor = 'rgb(150, 4, 150)';
        }
        if (wonNum > 65) {
            winningNumb.style.backgroundColor = 'rgb(3, 235, 3)'
        }
        winningNumb.innerText = wonNum;
        guessedNumbers.appendChild(winningNumb);
    });
}

/* function for modal alert*/

function modalAlert(text) {
   modalBg.classList.add('modal-active')
   modalText.innerText = text;
   closeBtn.addEventListener('click', modalClose)
}

function modalClose(){
    modalBg.classList.remove('modal-active')
    window.scrollTo(0,0);
}

