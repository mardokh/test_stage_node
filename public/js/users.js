
// ** CONSTS ** //
const addUser = document.getElementById('addUser')
const updateUser = document.getElementById('updateUser')
const usersForm = document.querySelector('.user_form_section')
const closeBtn = document.querySelector('.bi-x-circle-fill')
const submitBtn = document.getElementById('submitBtn')
const fisrtName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')


// **  USER ADD/UPDATE HANDLER  ** //

// Display form handler
addUser.addEventListener('click', (e) => {
    usersForm.classList.remove('hidden')
    submitBtn.value = "ADD"
})
updateUser.addEventListener('click', (e) => {
    usersForm.classList.remove('hidden')
    submitBtn.value = "UPDATE"
})

// Close form
closeBtn.addEventListener('click', () => {
    usersForm.classList.add('hidden')
})

// SUbmit form hanlder 
usersForm.addEventListener('submit', async (e) => {

    // Prevent default submit
    e.preventDefault()

    // Catching input values
    const data = {
        fistName: fisrtName.value,
        lastName: lastName.value,
        email: email.value
    }

    try {
        if (submitBtn.value === "ADD") {
            const response = await fetch("http://localhost:3000/api/users", {
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
                // ...
            }
            else if (response.status === 400) {
                // ...
            }
        }
        else if (submitBtn.value === "UPDATE") {
            // ...
        }
    }
    catch (err) {
        // ...
    }
})