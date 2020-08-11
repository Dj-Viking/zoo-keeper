

const letterRegex = /^[a-zA-Z]+$/;

const numRegex = /[0-9]/g;

test("check if letting regex test is outputting true", () => {
  expect(letterRegex.test("ss")).toBe(true);
});

test("check if mixed string of letters and numbers contains numbers and then return true because it contains numbers ", () => {
  console.log(parseInt("ss111"));
  expect(isNaN(parseInt('1s11ss111'))).toBe(false);
});