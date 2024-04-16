// Global variable that will contain all of the
// calculation objects:
let calculations = [
  {
    numOne: 3,
    numTwo: 5,
    operator: '+',
    result: 8,
  },
];

const express = require('express');

const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('server/public'));

// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  console.log('GET calculations');
  res.send(calculations);
});

// POST /calculations
app.post('/calculations', (req, res) => {
  // POST req data - attach to the key (i.e. data: {numOne})
  let firstNum = req.body.numOne;
  let secondNum = req.body.numTwo;
  let operator = req.body.operator;

  let result = 0;

  switch (operator) {
    case '+':
      result = Number(firstNum) + Number(secondNum);
      break;
    case '-':
      result = Number(firstNum) - Number(secondNum);
      break;
    case '*':
      result = Number(firstNum) * Number(secondNum);
      break;
    case '/':
      result = Number(firstNum) / Number(secondNum);
      break;
  }


  // Create the "calculation result" object that needs to be push/added to the calculations array
  let resultObj = {
    numOne: Number(firstNum),
    numTwo: Number(secondNum),
    operator: operator,
    result: result,
  };

  console.log('POST calculations');
  console.log('Request', req.body);
  // push the results object to the array
  calculations.push(resultObj);
  res.status(201).send(resultObj);
});

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
};

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
};

module.exports = app;
