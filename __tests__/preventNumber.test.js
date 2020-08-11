
// console.log(isNaN(1));

// console.log(isNaN('f'));

// console.log(isNaN(parseInt('f')));

// console.log(isNaN(parseInt('1')));

let clientInput = 'sdf';
let numInput = '123111ff';
let mixedArr = '111sss1';

let nameArr = [];



  
test('expect true to be true', () => {
  expect(true).toBe(true);
})

test('expect function to break up a string into an array', () => {

  splitInput = input => {
    let splitInput = input.split('');
    return splitInput;
  }
  
  
  expect(splitInput(clientInput)).toEqual(['s', 'd', 'f']);
});

test('expect function to change string of numbers into a single number ', () => {
  numStringToNum = numString => {
    let splitStringArr = numString.split('');
    //console.log(splitStringArr);
    
    let parsedStringArr = [];
    for (let i = 0; i <splitStringArr.length; i++) {
      parsedStringArr.push(parseInt(splitStringArr[i]));
    }
    //console.log(parsedStringArr.join(''));
    
    return parseInt(parsedStringArr.join(''));
  }

  expect(numStringToNum(numInput)).toEqual(expect.any(Number));
});

test('expect function to take mixed string of numbers and letters, filter out the NaN, and return numbers ', () => {
  const letterRegex = /^[a-zA-Z]+$/;
  let parsedArr = [];
  
  filterMixedArr = mixedArr => {
    console.log("mixedArr");
    //check incoming string
    //console.log(mixedArr);
    //does it contain only letters
    console.log("testing letter regex");
    console.log(letterRegex.test(mixedArr));
    expect(letterRegex.test(mixedArr)).toBe(false);
    if (letterRegex.test(mixedArr)) {
      
      console.log("message contains only letters");
      //return "message contains only letters";
    } else {
      
      //return mixedArr;
    }
    
    let splitStringArr = mixedArr.split('');
    console.log("split string arr");
    console.log(splitStringArr);
    
    let parsedStringArr = [];
    for (let i = 0; i <splitStringArr.length; i++) {
      parsedStringArr.push(parseInt(splitStringArr[i]));
    }
    console.log("parsed string arr");
     console.log(parsedStringArr);//has NaN inside
     parsedArr = [parsedStringArr];
     if (parsedStringArr.includes(NaN)){
       console.log("includes NaN");
     } else {
       console.log("string contains numbers");
       if (parsedStringArr.includes(NaN)) {
          
       }
       return parseInt(parsedStringArr.join(''));
     }
     console.log(parsedStringArr.join(''));
    let noNaNArr = parsedStringArr.filter(index => !isNaN(index));
    console.log("no NaN Array");
    console.log(noNaNArr);
    console.log("joined no NaN Array of numbers");
    console.log(parseInt(noNaNArr.join('')));
    
    return parseInt(noNaNArr.join(''));
    //return noNaNArr.join('');//this is a string
  }
  let resultArr = filterMixedArr(mixedArr);
  expect(resultArr).toEqual(expect.any(Number));

});


test("checks if NaN is tested false for number 0-9 regex", () => {
  const numRegex = /[0-9]/g;

  expect(numRegex.test(NaN)).toBe(false);
})





