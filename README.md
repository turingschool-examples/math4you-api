# math4you-be

### Set Up
1. Clone down this repo and `cd` into the directory
2. Run `npm i`
3. Run `node server.js`

### Usage

- Endpoint: `http://localhost:3001/:operation`  
  - Possible values for `operation` in endpoint: "add", "subtract", "multiply", "divide"
- Method: `POST`
- Headers: `{ Content-Type: "application/json" }`
- Body: `{ numbers: <array of numbers, any length> }`
- Example response: `{ equation: "3 / 1", id: 1639434472416, solution: 4 }`
