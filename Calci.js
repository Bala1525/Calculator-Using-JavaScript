/* ============== Calculator ============== */
const keys = document.querySelectorAll('.key')
/* Calculator screen */
const preOperationEl = document.querySelector('.previous-operation');
const currentOperationEl = document.querySelector('.current-operation');
let operation;/* Set to null because there is no Operation yet*/
let preOperation ;
let currentOperation;
let lastKeyIndex;/*store the values in the form of array(in array values are store from o index thats y we minus 1 in total value this output is stored in last key)*/
let lastKey;
let operationResult;
/* Keys click event */
let clickedKeyName;
keys.forEach(key => {
  key.addEventListener('click', () => {
    clickedKeyName = key.dataset.keyname;
    lastKeyIndex = currentOperationEl.textContent.length - 1;
    lastKey = currentOperationEl.textContent[lastKeyIndex];
    populateScreen(clickedKeyName);
  })
})
// Populate the screen with keys that are clicked
function populateScreen(clickedKey) {
  // If user enters more than allowed numbers
  if (currentOperationEl.textContent.length > 9) {
    currentOperationEl.style.fontSize = "2rem";
  }

  // When user enters more than
  if (clickedKey === '*' || clickedKey === '+' || clickedKey === '-' || clickedKey === '/' || clickedKey === '=') {

    /* Not allowing to have more than one operation in a row */
    if (lastKey !== ' ') {
      // Adding to pre operation
      preOperationEl.textContent += `${currentOperationEl.textContent} ${clickedKey}`;
      /* clearing out the pre operation */
      currentOperationEl.textContent = " ";
    }
    if (clickedKey === '=') {
      operation = preOperationEl.textContent
      /* Calculating the result */
      console.log(operation);
      operationResult = operate(operation)
      if (operationResult === Infinity) {
        operationResult ='Error';
      }
      /* Showing the result */
      preOperationEl.textContent = ""
      currentOperationEl.textContent=operationResult;
    }
  }
  /* When user hits = */
  /* When user hits del button */
  else if (clickedKey === 'del') {
    currentOperationEl.textContent = currentOperationEl.textContent.slice(0,-1);
  } else if (clickedKey === 'reset') {
    reset();
  }
  else {
    currentOperationEl.textContent += clickedKey;
  }
}


/* This function will get a string as argument and act exactly like eval it will calculate the operation and return the result */
function operate(operation) {

  // turning operation into an array
  operation = operation.split(' ')

  // stores the result of operation
  let operationResult;
  // this loop will go through every element of the array and operates every * or / operation and shrinks the string down until there is no more * or / left
  while (operation.includes('/') || operation.includes('*')) {
    for (let i = 0; i < operation.length; i++) {
      if (operation[i] === '*') {
        operation[i] = operation[i + 1];
        operation[i] *= operation[i - 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
      if (operation[i] === '/') {
        operation[i] = operation[i - 1] / operation[i + 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
    }
  }
  // this loop will go through every element of the array and operates every - or + operation and shrinks the string down until there is no more - or + left
  while (operation.includes('+') || operation.includes('-')) {
    for (let i = 0; i < operation.length; i++) {
      if (operation[i] === '+') {
        operation[i + 1] = Number(operation[i + 1]);
        operation[i - 1] = Number(operation[i - 1]);
        operation[i] = operation[i + 1];
        operation[i] += operation[i - 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
      if (operation[i] === '-') {
        operation[i] = operation[i - 1];
        operation[i] -= operation[i + 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
    }
  }
  /* Checking to see if the result have a decimal point if so round it up to two decimal points for better readability else just set operation result to it's original value*/
  if (operation[0] % 1 !== 0) {
    operationResult = Math.round(operation[0] * 100) / 100;
  } else {
    operationResult = operation[0];
  }
  return operationResult;
}
/* This function will reset everything */
function reset() {
  operation = undefined;
  preOperation = undefined;
  currentOperation = undefined;
  lastKeyIndex = undefined;
  lastKey = undefined;
  operationResult = undefined;
  preOperationEl.textContent = ""
  currentOperationEl.textContent = "";
}