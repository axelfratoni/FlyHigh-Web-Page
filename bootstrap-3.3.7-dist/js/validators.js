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
  return onlyNumbers(num) || num.length != 4;
}
function validateCountry(num){
  return onlyLettersAndSpace(num);
}
function validatePhoneNumberInput(num){
  return onlyNumbers(num) || num.length != 8;
}
function validateEmail(num){
  var aux = num.split("@");
  if(aux.length != 2)
    return true;
  var aux2 = aux[1].split(".");
  return aux[1].search(/[^A-Za-z.]/) != -1 || aux[0].search(/[^A-Za-z.]/) != -1 || aux2.length < 2;
}

function validateBirthDateInput(num, type){
  if(lengthIsZero(num))
    return true;
  var aux = num.split("-");
  var today = new Date();
  if(type == "adult"){
    if((today.getFullYear() - aux[0]) < 18){
      return true;
    }else if((today.getYear() - aux[0]) == 18){
      if((today.getMonth() - aux[1]) < 0){
        return true;
      }else if((today.getMonth() - aux[2]) == 0){
        if((today.getDate() - aux[2]) < 0){
          return true;
        }
      }
    }
  }else{
    if((today.getYear() - aux[0]) < 3){
      return true;
    }else if((today.getYear() - aux[0]) == 3){
      if((today.getMonth() - aux[1]) < 0){
        return true;
      }else if((today.getMonth() - aux[2]) == 0){
        if((today.getDate() - aux[2]) < 0){
          return true;
        }
      }
    }
  }
  return false;
}
