

const letterRegex = /^[a-zA-Z]+$/;

const numRegex = /[0-9]/g;

let mixedArr = ["1test"];

let correctArr = ["fjfjf", "fjfjfj"];

test("check if letting regex test is outputting true", () => {
  expect(letterRegex.test("ss")).toBe(true);
});

test("check if mixed string of letters and numbers contains numbers and then return true because it contains numbers ", () => {
  console.log(parseInt("ss111"));
  expect(isNaN(parseInt('1s11ss111'))).toBe(false);
});

test("convert an mixed array of strings and numbers into a string", () => {
  
  let joinedMixed = mixedArr.join('');
  expect(joinedMixed).toBe("1test");
});

test("convert an array of a strings into a string, if no numbers, then convert back into a original array", () => {
  let joinedCorrect = correctArr.join('');
  expect(letterRegex.test(joinedCorrect)).toBe(true);
  
  let verifiedArr;
  if (letterRegex.test(joinedCorrect)) {
    verifiedArr = correctArr;
  }

  expect(verifiedArr).toEqual(correctArr);
})