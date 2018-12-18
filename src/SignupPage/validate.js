import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {

  let errors = {};
  let val=[]

  if(validator.isEmpty(data.name)){
    errors.name = "this field is required"
    val.push("this field is required")
  }


  if(validator.isEmpty(data.phone)){
    errors.phone = "this field is required"
    val.push("this field is required")
  }
  else if(data.phone.length <10||data.phone.length >10){
    errors.phone = "the phone number must be 10 digit"
    val.push("the phone number must be 10 digit")

  }
  if(validator.isEmpty(data.address)){
    errors.address = "this field is required"
    val.push("this field is required")
  }

  if(validator.isEmpty(data.email)){
    errors.email = "this field is required"
    val.push("this field is required")
  }
  else if (!(validator.isEmail(data.email))) {
    errors.email = "invalid email"
    val.push("invalid email")
  }

  if(validator.isEmpty(data.password)){
    errors.password = "this field is required"
    val.push("this field is required")
  }else if(data.password.length < 6 || data.password.length > 6){
    errors.password = "the password must be 6 digit"
    val.push("the password must be 6 digit")
  }

  if(validator.isEmpty(data.confirmpassword)){
    errors.confirmpassword = "this field is required"
    val.push("this field is required")
  }
  else if(data.password !== data.confirmpassword){
    errors.confirmpassword = "password not match"
    val.push("password not match")
  }

  if(data.gps === false){
    errors.gps = "ไม่สามารถเข้าถึงตำแหน่ง กรุณารีเฟรชเว็ปไซต์"
    val.push("ไม่สามารถเข้าถึงตำแหน่ง กรุณารีเฟรชเว็ปไซต์")
  }

  if(data.billType == 1){
    if(validator.isEmpty(data.code)){
      errors.code = 'this field is required'
      val.push("this field is required")
    }
    else if(data.code !== 'hy-order'){
      errors.code = 'this code incorrect'
      val.push('this code incorrect')
    }

  }

  /*if(validator.isEmpty(data.id)){
    errors.id = "this field is required"
  }

  if(validator.isEmpty(data.password)){
    errors.password = "this field is required"
  }else if(data.password.length < 4){
    errors.password = "the password must be more 3 digit"
  }*/



  return {
    errors,
    isValid: isEmpty(errors),
    val
  }

}
