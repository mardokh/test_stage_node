// * ADMIN REGISTRATION * //
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

    try {
        // Send credentials to the server
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Respons hadling
        if (response.status === 200) {
            const jsonResponse = await response.json() // Await the JSON parsing
            console.log(jsonResponse) // Log the parsed JSON response
        } else {
            document.getElementById("registration_form_error").innerHTML = "Registration failed. Please try again."
        }
    } 
    catch (err) {
        console.log("An error occurred during the registration process", err)
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

    try {
        // Send credentials to the server
        const response = await fetch("http://localhost:3000/connection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        // Respons hadling
        if (response.status === 200) {
            const jsonResponse = await response.json() 
            console.log(jsonResponse) 
        }
        else {
            console.log('password or email failed')
        }
    }
    catch (err) {
        console.log("An error occurred during the connect process", err)
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


