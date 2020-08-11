const { TestScheduler } = require("jest");

let incomingArray = ["test", "test", "test", "test"];
let incomingMixedArr = ["test", "test", "test", "1" ]

let [...rest] = incomingArray;

//console.log(rest);


test('checks if spread is grabbing the elements of the incoming array', () => {
  expect(rest).toEqual(incomingArray);
});

test("checks if the rest array is being joined properly", () => {
  expect(rest.join('')).toBe("testtesttesttest")
});
const letterRegex = /^[a-zA-Z]+$/;
test("letter regex check the joined rest array if there are numbers then return false", () => {
  let [...rest] = incomingMixedArr;
  let joinedRest = rest.join('');
  expect(letterRegex.test(joinedRest)).toBe(false);
});