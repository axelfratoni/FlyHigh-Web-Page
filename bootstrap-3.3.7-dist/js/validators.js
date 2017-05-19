function lengthIsZero(num){
  return num.length == 0;
}
// Devuelve verdadero si encuentra algo distinto a un numero
function onlyNumbers(num){
  return lengthIsZero(num) || num.search(/[^0-9]/) != -1;
}
// Devuelve verdadero si encuentra algo distinto a una letra
function onlyLetters(num){
  return lengthIsZero(num) || num.search(/[^A-Za-z]/) != -1;
}
function onlyLettersAndSpace(num){
  return lengthIsZero(num) || num.search(/[^A-Za-z\s]/) != -1;
}
function validateCreditCardNumber(num){
  return onlyNumbers(num)  || num.length != 16;
}
function validateCvv(num){
  return onlyNumbers(num) || num.length != 3;
}
function validateName(num){
  return onlyLetters(num[0])|| onlyLetters(num[1]);
}
function validateCity(num){
  return onlyLettersAndSpace(num);
}
function validateAddressNumber(num){
  return onlyNumbers(num) || num.lenth >= 5;
}
function validateAddressName(num){
  return onlyLetters(num);
}
function validatePostalCode(num){
  return onlyLetters(num) || num.length != 4;
}
function validateCountry(num){
  return onlyLettersAndSpace(num);
}
function validatePhoneNumberInput(num){
  return onlyNumbers(num) || num.length != 8;
}
function validateEmail(num){
  var aux = num.split("@");
  return aux.length != 2 || aux[1].search(/[^A-Za-z.]/) != -1;
}
function validateBirthDateInput(num){
  return true;
}
