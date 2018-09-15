// creating validation methods that when executed, will do the validations.
// as well as one master method that when run, will execute the validaiton methods.

// we pass val and rules..the rules will validate the val for each rule that applies. snce rules will be a JS object, we configured it in the auth file to be a JS onject.
// we will use a for in loop to loop through the rules..

// we use a switch statement that will switch the rules for different cases we execute different funstions that will do the actual validations.
// 'case "isEmail"' is the property that was designated in the validationRules object in auth.

// case 'isEmail' then dictates that we need to execute some funtion
// we pass the EmailValidator funciton to the switch case but we need to store the value that was passed.

// passing connectedValue gives us a dynamic way of getting conectedValue if required.
const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for ( let rule in rules) {
    switch(rule) {
      case 'isEmail':
      // we set this equal becuase if this fails it should be false. we also set it to isValid && the result of EmailValidator. we take the previous validity we already have and just update it with the new piece of information.  only if both are true then isValid will come out as true.
      // the idea behind this is that if we have another rule that when checked with isValid and it ame out as false, EmailValidator wouldn't override the general validity of the value we recieve.
        isValid = isValid && EmailValidator(val);
        break;
      case 'minLength':
      // the value is the minLength we want to check.  so the second value is rules[rule].  we access the current rule and that will give us the  value for that rule.
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
      default:
      isValid = true;
    }
  }
  return isValid;
}

// this checks if the email is a valid email address.
const EmailValidator = val => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
};
// this checks if the minLength of password is a valid.
const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
};

// val and checkVal will compare and then return true or false.
const equalToValidator = (val, checkValue) => {
  return val === checkValue;
};

export default validate;
