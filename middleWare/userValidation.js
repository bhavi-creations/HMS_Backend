exports.validateEmail=function(mail) {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(mail);
  }
  
  exports.validatePhoneNumber = function(mobile) {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(mobile);
  }

 exports.validatePassword=function(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;
    return passwordPattern.test(password);
  }

  exports.validatename = function(name){
 const patternname =/^[a-zA-Z]+$/;
 return patternname.test(name);
  }
exports.validateGender = function(gender) {
  const validGenders = ["male", "female", "others"];
  return validGenders.includes(gender.toLowerCase());
}