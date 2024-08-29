
// * EMAIL VALIDATION * // 
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

// * PASSWORD VALIDATION * // 
function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d.*\d).+$/
    return regex.test(password)
}

// * REGISTRATION HANDLER * //
document.getElementById("registration_form_container_id").addEventListener('submit', async (e) => {

    // Prevent default submit
    e.preventDefault()

    // Inputs fields elements
    const FirstName = document.getElementById("registration_firstName_input")
    const LastName = document.getElementById("registration_lastName_input")
    const Email = document.getElementById("registration_email_input")
    const Password = document.getElementById("registration_password_input")


    // Errors elements displayers
    const registerError = document.getElementById("registration_form_error")
    const invalidEmail = document.getElementById("registration_invalid_email")
    const invalidPassword = document.getElementById("registration_invalid_password")

    // Catching input values
    const data = {
        firstName: FirstName.value,
        lastName: LastName.value,
        email: Email.value,
        password: Password.value
    }

    // Stope code variable
    let stopCode = false

    // Check empty fields
    for (const key in data) {
        if (data[key] === "") {
            document.getElementById(`registration_${key}_input`).style.border = "2px solid red"
            stopCode = true
        }
    }

    // Validate email
    if (!validateEmail(data.email)) {
        invalidEmail.classList.remove("registration_form_hidden_element")
        invalidEmail.innerHTML = "Email field required a valid email address format"
        Email.style.border = "2px solid red"
        stopCode = true
    }

    // Validate password
    if (!validatePassword(data.password)) {
        invalidPassword.classList.remove("registration_form_hidden_element")
        invalidPassword.innerHTML = "Password must contain at least one capital letter and two numbers"
        Password.style.border = "2px solid red"
        stopCode = true
    }

    // Stop rest of the code
    if (stopCode) {
        registerError.classList.remove("registration_form_hidden_element")
        registerError.innerHTML = "All form fields are required"
        return
    }
    
    try {
        // Send credentials to the server
        console.log('is in try catch bloc')
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        // Extrad json response
        const jsonResponse = await response.json()

        // Respons hadling
        if (response.status === 200) {
            window.location.href = "http://localhost:3000"
        } else {
            registerError.innerHTML = jsonResponse.message
        }
    } 
    catch (err) {
        registerError.innerHTML = "An server side error occurred during the registration process"
    }

})


// * LOGIN HANDLER * //
document.getElementById("connection_form_container_id").addEventListener('submit', async (e) => {

    // Prevent default submit
    e.preventDefault()

    // Catching input values
    const data = {
        email: document.getElementById("email_connection_input").value,
        password: document.getElementById("password_connection_input").value
    }

    // Error element displayer
    const errorElement = document.getElementById("connection_form_connect_failed")

    try {
        // Send credentials to the server
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        // Extrad json response
        const jsonResponse = await response.json()

        // Respons hadling
        switch(response.status) {
            case 200:
                localStorage.setItem('admin_token', jsonResponse.token)
                window.location.href = "http://localhost:3000/dashboard"
              break
            case 401:
            case 400:    
                errorElement.innerHTML = jsonResponse.message
              break
        }
    }
    catch (err) {
        errorElement.innerHTML = "An server side error occurred during the registration process"
    }

})


// * FROMS SWITCH * //
const registrationButton = document.getElementById("singUp_button_id")
const connectionButton = document.getElementById("login_button_id")
const registrationFrom = document.getElementById("registration_form_container_id")
const connectionFrom = document.getElementById("connection_form_container_id")

registrationButton.addEventListener('click', () => {
    connectionFrom.classList.add('form_hidden')
    registrationFrom.classList.remove('form_hidden')
})
connectionButton.addEventListener('click', () => {
    registrationFrom.classList.add('form_hidden')
    connectionFrom.classList.remove('form_hidden')
})


// * LOGGED IN REDIRECTION * //
window.onload = async () => {

    if (localStorage.getItem("admin_token")) {
        window.location.href = "http://localhost:3000/dashboard"
    }
    
}
