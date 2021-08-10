const { test, expect } = require('@playwright/test');
const { calculatorPage } = require('../pages/calculatorPage')


//Tests configuration/set up
test.describe('Calculator test suite', () => {
  let page;
  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    startPage = new calculatorPage(page);
  });

//Before each test firstly navigate to website
test.beforeEach(async () => {
    await startPage.goto();
});

//Hardcoded arrey of build numbers
const buildNumbers = [0,1,2,3,4,5,6,7,8,9];

//Getting random int values
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

let number1 = getRandomIntInclusive(0, 1000);
let number2 = getRandomIntInclusive(0, 1000);

//Getting random string values
function randomString(){
  return Math.random().toString(36);
  }
  
let value1 = randomString();
let value2 = randomString();

//Addition tests
test('Checking that ADD operation works', async () => {
  for(let i = 0; i < buildNumbers.length; i++) {
    const buildsSelect = await page.$("#selectBuild");
    buildsSelect.selectOption(buildNumbers[i].toString());
    await page.selectOption('select[name="selectOperation"]', '0');     

    await page.fill('#number1Field', number1.toString());
    await page.fill('#number2Field', number2.toString());
    await page.click('#calculateButton');

    let answer = number1 + number2;
  
    //const answerFieldIsVisible = await page.isVisible('#numberAnswerField');
    //expect(answerFieldIsVisible).toBeTruthy();

    const addAnswer = await page.inputValue('#numberAnswerField');
   
    console.log(`Expected answer on build nr.${i} was ${answer}, actual anwser is ${addAnswer}`);
    expect(addAnswer).toContain(answer.toString());
  }
});

test.only('Checking that in ADD operation first number is not accepted as text', async () => {
  for(let i = 0; i < buildNumbers.length; i++) {
    const buildsSelect = await page.$("#selectBuild");
    buildsSelect.selectOption(buildNumbers[i].toString());
    await page.selectOption('select[name="selectOperation"]', '1');
    
    await page.fill('#number1Field', value1);
    await page.fill('#number2Field', number2.toString());
    await page.click('#calculateButton');
    await page.isVisible('#errorMsgField');
    const number1AddText = await page.textContent('#errorMsgField');
    if (number1AddText){
      console.log(`Build nr.${i} throws error message when dividing Add operation is chosen and First number input is text value`);
      }
        else{
          console.log(`Build nr.${i} do not throw error message when dividing Add operation is chosen and First number input is text value`)
        }
    expect(number1AddText).toContain('Number 1 is not a number');
  }
});

 //Subtraction tests
test.only('Checking that SUBTRACT operation works', async () => {
  for(let i = 0; i < buildNumbers.length; i++) {
    const buildsSelect = await page.$("#selectBuild");
    buildsSelect.selectOption(buildNumbers[i].toString());
    await page.selectOption('select[name="selectOperation"]', '1');
    
    let answer = number1 - number2;

    await page.fill('#number1Field', number1.toString());
    await page.fill('#number2Field', number2.toString());
    await page.click('#calculateButton');

    const subtractAnswer = await page.inputValue('#numberAnswerField');
   
    console.log(`Expected answer on build nr.${i} was ${answer}, actual anwser is ${subtractAnswer}`);
    expect(subtractAnswer).toContain(answer.toString());
  }
});

//Multiplication tests
test.only('Checking that MULTIPLY operation works', async () => {
  for(let i = 0; i < buildNumbers.length; i++) {
    const buildsSelect = await page.$("#selectBuild");
    buildsSelect.selectOption(buildNumbers[i].toString());
    await page.selectOption('select[name="selectOperation"]', '2');
    
    let answer = number1 * number2;

    await page.fill('#number1Field', number1.toString());
    await page.fill('#number2Field', number2.toString());
    await page.click('#calculateButton');

    const multiplyAnswer = await page.inputValue('#numberAnswerField');
   
    console.log(`Expected answer on build nr.${i} was ${answer}, actual anwser is ${multiplyAnswer}`);
    expect(multiplyAnswer).toContain(answer.toString());
  }
});

//Division tests
test('Checking that DIVIDE operation works', async () => {
  for(let i = 0; i < buildNumbers.length; i++) {
    const buildsSelect = await page.$("#selectBuild");
    buildsSelect.selectOption(buildNumbers[i].toString());
    await page.selectOption('select[name="selectOperation"]', '3');
    
    let answer = number1 / number2;

    await page.fill('#number1Field', number1.toString());
    await page.fill('#number2Field', number2.toString());
    await page.click('#calculateButton');

    const divideAnswer = await page.inputValue('#numberAnswerField');
   
    console.log(`Expected answer on build nr.${i} was ${answer}, actual anwser is ${divideAnswer}`);
    expect(divideAnswer).toContain(answer.toString());
  }
});

test.only('Checking that dividing by 0 throws error message', async () => {
  for(let i = 0; i < buildNumbers.length; i++) {
    const buildsSelect = await page.$("#selectBuild");
    buildsSelect.selectOption(buildNumbers[i].toString());
    await page.selectOption('select[name="selectOperation"]', '3');
    
    await page.fill('#number1Field', number1.toString());
    await page.fill('#number2Field', '0'.toString());
    await page.click('#calculateButton');
    await page.isVisible('#errorMsgField');
    const divideByZero = await page.textContent('#errorMsgField');
    if (divideByZero){
      console.log(`Build nr.${i} throws error message when dividing be zero`);
      }
        else{
          console.log(`Build nr.${i} do not throw error message when dividing be zero`)
        }
    expect(divideByZero).toContain('Divide by zero error');
 
  }
});

//Concatonation tests
test.only('Checking that CONCATENATE operation works', async () => {
  for(let i = 0; i < buildNumbers.length; i++) {
    const buildsSelect = await page.$("#selectBuild");
    buildsSelect.selectOption(buildNumbers[i].toString());
    await page.selectOption('select[name="selectOperation"]', '4');
    
    let answer = number1.toString() + number2.toString();

    await page.fill('#number1Field', number1.toString());
    await page.fill('#number2Field', number2.toString());
    await page.click('#calculateButton');

    const concatenateAnswer = await page.inputValue('#numberAnswerField');
   
    console.log(`Expected answer on build nr.${i} was ${answer}, actual anwser is ${concatenateAnswer}`);
    expect(concatenateAnswer).toContain(answer.toString());
  }
});
});



