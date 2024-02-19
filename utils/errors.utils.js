module.exports.signUpErrors = (err) => {
  let errors = { pseudo: '', email: '', password: '' };/* modifier les messages d'erreurs */
    
  if (err.message.includes('pseudo')){ 
        errors.pseudo = "incorrect pseudo"
    }

    if (err.message.includes('email')){        
        errors.email = "incorrect email"
    }

    if (err.message.includes('password')){
        errors.password = "password must be at least 6 characters long"
    }

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo')) {
        errors.pseudo = "this pseudo is already registered"
    }

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email')) {
        errors.email = "this email is already registered"
    }

    return errors;
}

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' };
    
    if (err.message.includes('email')) errors.email = "unknown email";
    if (err.message.includes('password')) errors.password = "wrong password";
    
    return errors;
}
