let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let newGameBtn2 = document.querySelector("#new-btn2");
let msgContainer = document.querySelector(".msg-container");
let msg2Container = document.querySelector(".msg2-container");
let msg = document.querySelector("#msg");
let msg2 = document.querySelector("#msg2");

let turn0 = true;
let count = 0;
let winner = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (winner) return; // Prevent further moves if a winner is found

    count++;
    if (turn0) {
      box.innerHTML = '<span style="color: green;">O</span>';
      turn0 = false;
    } else {
      box.innerHTML = '<span style="color: red;">X</span>';
      turn0 = true;
    }
    box.disabled = true;

    checkWinner();

    if (!winner && count === boxes.length) {
      showDraw();
    }
  });
});

const resetGame = () => {
  count = 0;
  turn0 = true;
  winner = false; // Reset winner flag
  enableBoxes();
  msgContainer.classList.add("hide");
  msg2Container.classList.add("hide2");
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winnerSymbol) => {
  msg.innerText = `Congratulations!!! Winner is ${winnerSymbol}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  winner = true; // Set winner flag
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return; // Stop further checks once a winner is found
      }
    }
  }
};

const showDraw = () => {
  msg2.innerText = "The Game is Draw \n Please restart a new Game";
  msg2Container.classList.remove("hide2");
  count = 0;
};

newGameBtn.addEventListener("click", resetGame);
newGameBtn2.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
