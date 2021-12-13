const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.locals.title = 'Math API';
app.locals.solutions = [];

app.set('port', 3001);

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is now running on ${app.get('port')}!`);
});

app.get('/solutions', (request, response) => {
  response.status(200).json(app.locals.solutions);
});

app.post('/:operation', (request, response) => {
  const operation = request.params.operation;
  const numbers = request.body.numbers;

  if (!numbers.length) {
    return response.status(422).json({ message: `You did not send any numbers.`})
  }

  let nonnumbers = numbers.filter(number => {
    return (typeof number !== 'number')
  })

  if (nonnumbers.length) {
    return response.status(422).json({ message: `You submitted an invalid data type. Only send numbers.`})
  }

  let solution = numbers[0];
  let equation = '';

  numbers.forEach((number, index) => {
    if (index === 0) {
      equation += `${number}`
    } else {
      equation += ` / ${number}`

      if (operation === 'add') {
        solution += number
      } else if (operation === 'subtract') {
        solution -= number
      } else if (operation === 'multiply') {
        solution *= number
      } else if (operation === 'divide') {
        solution /= number
      } else {
        return response.status(404).json({ message: `That is a not a valid endpoint. Try '/add', '/subtract', '/multiply', or '/divide'.`})
      }
    }
  })

  const newSolution = {
    id: Date.now(),
    equation,
    solution
  }

  app.locals.solutions.push(newSolution);

  response.status(201).json(newSolution);
});
