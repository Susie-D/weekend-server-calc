fetchAndRenderNumbers = () => {
  axios({
    method: 'GET',
    url: '/calculations',
  }).then((response) => {
    let numbersFromServer = response.data;

    // clear list
    let numberList = document.getElementById('resultHistory');
    numberList.innerHTML = ``;
    document.getElementById('recentResult').innerHTML = '';

    // render list
    for (num of numbersFromServer) {
      document.getElementById('recentResult').innerHTML = `${num.result}`;
      // show recent result
      numberList.innerHTML += `
            <li>${num.numOne} ${num.operator} ${num.numTwo} = ${num.result}</li>
        `;
    }
  });
};

let operator;

operation = (event) => {
  event.preventDefault();
  operator = event.target.innerHTML;
  //   console.log('operator', operator);
  return operator;
};

calculateNums = (event) => {
  event.preventDefault();

  let firstNumInput = document.getElementById('numOne');
  let firstNum = firstNumInput.value;

  let secondNumberInput = document.getElementById('numTwo');
  let secondNum = secondNumberInput.value;

  // show recent result

  axios({
    method: 'POST',
    url: '/calculations',
    data: {
      numOne: Number(firstNum),
      numTwo: Number(secondNum),
      operator: operator,
    },
  }).then((response) => {
    console.log('res', response.data);
    recentResult.innerHTML = '';
    firstNumInput = '';
    secondNumberInput = '';

    document.getElementById('recentResult');
    recentResult.innerHTML = `${response.data.result}`;

    fetchAndRenderNumbers();
  });
};

fetchAndRenderNumbers();
