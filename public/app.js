
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

// Inputs fields elements
const FirstName = document.getElementById("firstName")
const LastName = document.getElementById("lastName")
const Email = document.getElementById("email")
const Password = document.getElementById("password")

// * FROM HANDLER * //
document.getElementById("form").addEventListener('submit', async (e) => {

    // Prevent default submit
    e.preventDefault()

    // * SING-IN * //
    if (!FirstName.value && !LastName.value) {

        // Catching input values
        const data = {
            email: Email.value,
            password: Password.value
        }

        // Error element displayer
        const errorElement = document.getElementById("invalid_form")

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
    }
    else {
        // * SING-UP * //
        // Errors elements displayers
        const registerError = document.getElementById("invalid_form")
        const invalidEmail = document.getElementById("invalid_email")
        const invalidPassword = document.getElementById("invalid_password")

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
                document.getElementById(`${key}`).style.border = "2px solid red"
                stopCode = true
            }
        }

        // Validate email
        if (!validateEmail(data.email)) {
            invalidEmail.classList.remove("hidden")
            invalidEmail.innerHTML = "Email field required a valid email address format"
            Email.style.border = "2px solid red"
            stopCode = true
        }

        // Validate password
        if (!validatePassword(data.password)) {
            invalidPassword.classList.remove("hidden")
            invalidPassword.innerHTML = "Password must contain at least one capital letter and two numbers"
            Password.style.border = "2px solid red"
            stopCode = true
        }

        // Stop rest of the code
        if (stopCode) {
            registerError.classList.remove("hidden")
            registerError.innerHTML = "All form fields are required"
            return
        }
        
        try {
            // Send credentials to the server
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
    }
})


// * FORM TOGGLE HANDLER * //
const toggleBtn = document.getElementById("toggle_btn")

toggleBtn.addEventListener("click", () => {

    switch (toggleBtn.textContent) {
        case "sing-up":
            FirstName.classList.remove("hidden")
            LastName.classList.remove("hidden")
            toggleBtn.textContent = "sing-in"
            break;
        case "sing-in":
            FirstName.classList.add("hidden")
            LastName.classList.add("hidden")
            toggleBtn.textContent = "sing-up"
            break;
        default:
            break;
    }
    
})


// * LOGGED IN REDIRECTION * //
window.onload = async () => {

    if (localStorage.getItem("admin_token")) {
        window.location.href = "http://localhost:3000/dashboard"
    }   
}