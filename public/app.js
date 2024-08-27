
// * REGISTRATION HANDLER * //
document.getElementById("registration_form_container_id").addEventListener('submit', async (e) => {

    // Prevent default submit
    e.preventDefault()

    // Catching input values
    const data = {
        firstName: document.getElementById("registration_firsName_input").value,
        lastName: document.getElementById("registration_lastNameçinput").value,
        email: document.getElementById("registration_email_input").value,
        password: document.getElementById("registration_password_input").value
    }

    // Error element displayer
    const errorElement = document.getElementById("registration_form_error")

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
            window.location.href = "http://localhost:3000/main"
        } else {
            errorElement.innerHTML = jsonResponse.message
        }
    } 
    catch (err) {
        errorElement.innerHTML = "An server side error occurred during the registration process"
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

