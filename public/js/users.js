
// ** CONSTS ** //

const addUser = document.getElementById('addUser')
const usersForm = document.querySelector('.user_form_section')
const closeBtn = document.querySelector('.bi-x-circle-fill')
const deleteBtn = document.querySelector('.bi-trash')
const submitBtn = document.getElementById('submitBtn')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const password = document.getElementById('password')
const tbody = document.getElementById('tableBody')
const tableLoader = document.getElementById('table_loader')
const formLoader = document.getElementById('form_loader')
let userId = ""

/* *************************************************************************************************************************** */

// ** GET USERS LIST HANDLER ** //
const getUsers = async () => {

    try {
        const response = await fetch("http://localhost:3000/api/getting/users", {
            method: "GET"
        })

        const jsonResponse = await response.json();

        if (response.status === 200 && jsonResponse.data.length > 0) {

            tbody.innerHTML = ""

            jsonResponse.data.forEach(user => {
                const row = document.createElement('tr')
                row.setAttribute('class', 'tbody_row')
                row.setAttribute('id', `${user._id}`)
                row.innerHTML = `
                    <td class="tbody_data">${user.firstName}</td>
                    <td class="tbody_data">${user.lastName}</td>
                    <td class="tbody_data">${user.email}</td>
                    <td class="tbody_data">${new Date(user.timestamp)}</td>
                    <td class="tbody_data">
                        <div class="user_table_actions">
                            <div>
                                <i class="bi bi-pencil-square" id="${user._id}"></i>
                                <i class="bi bi-trash" id="${user._id}"></i>
                            </div>
                            <label class="switch">
                                <input type="checkbox" ${user.status === "unable" ? "checked" : ""}>
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </td>
                `
                tbody.appendChild(row)
            })
        }
        else if (response.status === 404) {
            console.log(jsonResponse)
        }

    } catch (err) {
        console.log(err)
    }
    finally {
        // Hide loader
        tableLoader.style.display = 'none'
    }
}

// Execute function
getUsers()

/* *************************************************************************************************************************** */

// ** USER ADD/UPDATE SUBMIT FORM HANDLER ** //
usersForm.addEventListener('submit', async (e) => {
    // Prevent default submit
    e.preventDefault()

    // Show loader
    formLoader.style.visibility = 'visible'

    // Catching input values
    const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    }

    try {
        if (submitBtn.value === "ADD") {
            const response = await fetch("http://localhost:3000/api/create/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            // Extrad json response
            const jsonResponse = await response.json()

            // Respons handling
            if (response.status === 201) {
                formLoader.textContent = jsonResponse.message
                
                // Update users list
                await getUsers()

                setTimeout(() => {
                    usersForm.classList.add('hidden')
                    formLoader.style.visibility = 'hidden'
                    
                    // Scroll to bottom of the page
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth'
                    })                  

                    // Set style for new user
                    let lastChild = tbody.lastElementChild
                    if (lastChild) {
                        let styleChildren = lastChild.querySelectorAll('.tbody_data')
                        styleChildren.forEach(child => {
                            child.classList.add('flash-border')
                        })
                    }
                }, 1000)
            }
            else if (response.status === 409 || response.status === 500) {
                formLoader.textContent = jsonResponse.message
            }
        } 
        else if (submitBtn.value === "UPDATE") {
            const response = await fetch(`http://localhost:3000/api/update/user/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            // Extrad json response
            const jsonResponse = await response.json()

            // Respons handling
            if (response.status === 200) {
                formLoader.textContent = jsonResponse.message

                // Update users list
                await getUsers()

                setTimeout(() => {
                    usersForm.classList.add('hidden')
                    formLoader.style.visibility = 'hidden'

                    let Edited = document.getElementById(`${userId}`)

                    Edited.scrollIntoView({
                        behavior: 'smooth'
                    })

                    // Set style for new user
                    let styleEdited = Edited.querySelectorAll('.tbody_data')
                    styleEdited.forEach(child => {
                        child.classList.add('flash-border')
                    })
                    
                }, 1000)
            }
            else if (response.status === 400 || response.status === 404 || response.status === 500) {
                formLoader.textContent = jsonResponse.message
            }
        }
    } catch (err) {
        console.log(err)
    }
})

/* *************************************************************************************************************************** */

// **  USER ADD/UPDATE DISPLAY FORM HANDLER  ** //
// Display form handler
addUser.addEventListener('click', (e) => {
    usersForm.classList.remove('hidden')
    firstName.value = ""
    lastName.value = ""
    email.value = ""
    password.value = ""
    submitBtn.value = "ADD"
})

// Add an event listener to the tbody element
tbody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('bi-pencil-square')) {
        usersForm.classList.remove('hidden')
        password.classList.add('hidden')
        submitBtn.value = "UPDATE"
        userId = e.target.id

        try {
            const response = await fetch(`http://localhost:3000/api/getting/user/${userId}`, {
                method: "GET"
            })
    
            const jsonResponse = await response.json()
    
            // Respons hadling
            if (response.status === 200) {
        
                firstName.value = jsonResponse.data.firstName
                lastName.value = jsonResponse.data.lastName
                email.value = jsonResponse.data.email
            }
            else if (response.status === 400 || response.status === 404 || response.status === 500) {
                console.log('GET USER FAILED : ', jsonResponse)
            } 
        }
        catch (err) {
            console.log(err)
        }       
    }
})

// Close form
closeBtn.addEventListener('click', () => {
    usersForm.classList.add('hidden')
})

/* *************************************************************************************************************************** */

// **  USER DELETE HANLDER  ** //

tbody.addEventListener('click', async (e) => {

    if (e.target.classList.contains('bi-trash')) {
        
        const delId = e.target.id

        try {
            const response = await fetch(`http://localhost:3000/api/delete/user/${delId}`, {
                method: "DELETE"
            })

            // Respons hadling
            if (response.status === 204) {
                console.log('DELETE USER SUCCESS')
            }
            else if (response.status === 400 || response.status === 404 || response.status === 500) {
                console.log('DELETE USER FAILED')
            } 
        }
        catch (err) {
            console.log(err)
        }
    }
})