const themeBtn = document.getElementById("themeBtn");

const history = [];

const historyBtn = document.getElementById("historyBtn");
const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const display = document.getElementById("display");

themeBtn.onclick = function(){

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        themeBtn.innerHTML = "☀";

    }else{

        themeBtn.innerHTML =
'<i class="fa-regular fa-moon"></i>';

    }

}

historyBtn.onclick = function(){

    if(historyPanel.style.display==="block")
        historyPanel.style.display="none";
    else
        historyPanel.style.display="block";

}

clearHistoryBtn.onclick = function(){

    history.length = 0;

    updateHistory();

}

function appendValue(value){
    display.value += value;
}

function appendPercentage(){

    let expression = display.value;

    if(expression.includes("+")){

        let parts = expression.split("+");

        if(parts.length === 2){

            let first = Number(parts[0]);
            let second = Number(parts[1]);

            display.value = first + "+" + (first * second / 100);
        }

    }

    else if(expression.includes("-")){

        let parts = expression.split("-");

        if(parts.length === 2){

            let first = Number(parts[0]);
            let second = Number(parts[1]);

            display.value = first + "-" + (first * second / 100);
        }

    }

    else if(expression.includes("*")){

        let parts = expression.split("*");

        if(parts.length === 2){

            display.value = parts[0] + "*" + (Number(parts[1]) / 100);
        }

    }

    else if(expression.includes("/")){

        let parts = expression.split("/");

        if(parts.length === 2){

            display.value = parts[0] + "/" + (Number(parts[1]) / 100);
        }

    }

    else{

        display.value = Number(display.value) / 100;

    }

}

function clearDisplay(){
    display.value = "";
}

function deleteLast(){
    display.value = display.value.slice(0,-1);
}

// function calculate(){

//     try{

//         let expression = display.value;

//         let result = eval(expression);

//         history.unshift(expression + " = " + result);

//         display.value = result;

//         updateHistory();

//     }

//     catch{

//         display.value="Error";

//     }

// }

function calculate() {

    try {

        let expression = display.value;

        // Handle Addition %
        expression = expression.replace(
            /(\d+(\.\d+)?)\+(\d+(\.\d+)?)%/g,
            (_, a, __, b) => Number(a) + (Number(a) * Number(b) / 100)
        );

        // Handle Subtraction %
        expression = expression.replace(
            /(\d+(\.\d+)?)\-(\d+(\.\d+)?)%/g,
            (_, a, __, b) => Number(a) - (Number(a) * Number(b) / 100)
        );

        // Handle Multiplication %
        expression = expression.replace(
            /(\d+(\.\d+)?)\*(\d+(\.\d+)?)%/g,
            (_, a, __, b) => Number(a) * (Number(b) / 100)
        );

        // Handle Division %
        expression = expression.replace(
            /(\d+(\.\d+)?)\/(\d+(\.\d+)?)%/g,
            (_, a, __, b) => Number(a) / (Number(b) / 100)
        );

        // Single Percentage
        expression = expression.replace(
            /(\d+(\.\d+)?)%/g,
            (_, a) => Number(a) / 100
        );

        let result = eval(expression);

        history.unshift(display.value + " = " + result);

        display.value = result;

        updateHistory();

    }

    catch {

        display.value = "Error";

    }

}

function updateHistory(){

    historyList.innerHTML = "";

    if(history.length === 0){

        historyList.innerHTML = "<li>No History</li>";

        return;
    }

    history.forEach(item => {

        let li = document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);

    });

}

// Keyboard Support

document.addEventListener("keydown",function(event){

    const key = event.key;

    if((key>='0' && key<='9') ||
        key==='+' ||
        key==='-' ||
        key==='*' ||
        key==='/' ||
        key==='.' ||
        key==='%'){

        display.value += key;
    }

    else if(key==="Enter"){

        event.preventDefault();
        calculate();

    }

    else if(key==="Backspace"){

        deleteLast();

    }

    else if(key==="Escape"){

        clearDisplay();

    }

});