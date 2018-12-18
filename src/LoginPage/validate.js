import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {

  let errors = {};


  if(validator.isEmpty(data.username)){
    errors.id = "this field is required"
  }

  if(validator.isEmpty(data.password)){
    errors.password = "this field is required"
  }else if(data.password.length < 6||data.password.length > 6){
    errors.password = "the password must be 6 digit"
  }



  return {
    errors,
    isValid: isEmpty(errors)
  }

}
