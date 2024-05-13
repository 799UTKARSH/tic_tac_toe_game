let boxes = document.querySelectorAll("#box");
let resetBtn = document.querySelector("#reset-btn");
let newgame = document.querySelector("#new-game");
let msg = document.querySelector(".msg");
let msgconatainer = document.querySelector(".msg-container");

let turnO = true;  // player -> x , player -> o

// winning patterns

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetgame=()=>{
    count=0;
    turnO= true;
    enableboxes();
    msgconatainer.classList.add("hide");
};
let count=0;
//active the button in alternative way so that both player put their value in the table

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");

        if (turnO) {
            box.innerText = "O";
            turnO = false;

        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        count=count+1;           // count the click 
        if(count==9){            // draw condition checking 
            draw();   
            // msg.innerHTML='draw match'          // draw match calling  
            
        }
        box.disabled = true;   // disabled the boxes after on time clicking
        checkwinner();          // check winner calling function
    });
});

// disable the all button after win the match by one player

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// active all the buttons

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText="";
    }
};

//show the who is winner of the match

const showWinner = (winner) => {

    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgconatainer.classList.remove("hide");
    disableboxes();
    setTimeout(() => {
        resetgame();
    }, 2000);
};

// checking the  winning condition of the match

const checkwinner = () => {
    for (let pattern of winpatterns) {
        let pos1val = box[pattern[0]].innerText;
        let pos2val = box[pattern[1]].innerText;
        let pos3val = box[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("winner ", pos1val);
                showWinner(pos1val);
            }
        }

    }
};

//  draw the game and restart game after 2 second;

const draw = () =>{
    msg.innerText=`MATCH DRAW`;
    msgconatainer.classList.remove("hide");
    setTimeout(() => {
        resetgame();
    }, 2000);

};
newgame.addEventListener("click", resetgame);
resetBtn.addEventListener("click", resetgame);