
// * CONST * //

const FirstName = document.getElementById("firstName")
const LastName = document.getElementById("lastName")
const Email = document.getElementById("email")
const Password = document.getElementById("password")
const toggleBtn = document.getElementById("toggle_btn")
const invalidForm = document.getElementById("invalid_form")
const invalidEmail = document.getElementById("invalid_email")
const invalidPassword = document.getElementById("invalid_password")
const formSubContainer = document.querySelector(".form_sub_container")
const formSubmit = document.getElementById("form")
const loader = document.getElementById('loader')
const rowInput = document.getElementById('rowInput')
const columnInput = document.getElementById('columnInput')
const squearesContainer = document.getElementById('dashboard_squares_displayer');
const firstname = document.getElementById("firstName")
const lastname = document.getElementById("lastName")
const mail = document.getElementById("email")
const addUser = document.getElementById('addUser')
const usersForm = document.querySelector('.user_form_section')
const form = document.querySelector('.user_form ')
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
const deleteYes = document.getElementById('user_delete_yes')
const deleteNo = document.getElementById('user_delete_no')
const userModal = document.querySelector('.user_modal')
const modelText = document.querySelector('.user_model_text')
const userSearch = document.getElementById('user_search_input')
const userSearchList = document.querySelector('.user_search_list')
const Loader = "wainting for finishing operation..."
let userFullName = ""
let userId = ""


// *  ON LOAD HANLDER  * //

window.addEventListener('load', async () => {

    if (window.location.href === "http://localhost:3000/") {
        try {
            // Send request for check session
            const response = await fetch("http://localhost:3000/api/session", {
                method: "GET"
            })
    
            // Respons hadling
            if (response.status === 200) {
                // if valide session redirect to dashboard
                window.location.href = "http://localhost:3000/dashboard"
            }
        }
        catch (err) {
            console.error("Error : ", err)
        }
    }
    else if (window.location.href === "http://localhost:3000/dashboard") {

        if (loader) {
            loader.style.display = 'flex'
        }
        
        // Fetch header
        await fetchHeader()

        // fetch user
        await getUser()

        // Squares generate
        generateSquares()    
    }
    else if (window.location.href === "http://localhost:3000/users") {

        // Fetch header
        await fetchHeader()

        // fetch user
        await getUser()

        // Get users
        getUsers()
    }
})


/* *****************************************************  HEDAER ************************************************************************ */


// *  HEADER DISPLAY HANDLER  * //

const fetchHeader = async () => {
    try {
        // Get the header
        const response = await fetch('../static/header.html')

        // Catch response
        const data = await response.text()

        // Display header
        document.getElementById('header').innerHTML = data

        // Set drop menu feature
        setupHeaderEventListeners()

        // Set logout feature
        await logoutHandler()
    }
    catch(err) {
        console.error(err)
    }
}


function setupHeaderEventListeners() {
    const menuDownBtn = document.querySelector('.bi-caret-down-fill')
    const menuDownConaiter = document.querySelector('.header_down_menu');
    const menuDownList = document.querySelector('.header_li_container');
    if (menuDownBtn) {
        menuDownBtn.addEventListener('click', () => {
            menuDownConaiter.classList.toggle('down_menu_active');
            menuDownList.classList.toggle('down_menu_ul_active');
        })
    }
}


/* *****************************************************  INDEX PAGE ************************************************************************ */


// * FROM SUBMIT HANDLER * //
if (formSubmit) {

    formSubmit.addEventListener('submit', async (e) => {

        // Prevent default submit
        e.preventDefault()
    
        // **  SING-IN  ** //
    
        // Check form fields
        if (FirstName.classList.contains("hidden") && LastName.classList.contains("hidden")) {
    
            // Catching input values
            const data = {
                email: Email.value,
                password: Password.value
            }
    
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
                        window.location.replace("http://localhost:3000/dashboard")
                    break
                    case 401:
                    case 400:
                    case 500:
                     invalidForm.classList.remove("hidden")
                     invalidForm.innerHTML = jsonResponse.message  // server side catch error handling
                    break
                }
            }
            catch (err) {
             invalidForm.classList.remove("hidden")    // server catch side error handling
             invalidForm.innerHTML = "An server side error occurred during the registration process"
            }
        }
        else {
    
            // **  SING-UP  ** //
         
            // Catching input values
            const data = {
                firstName: FirstName.value,
                lastName: LastName.value,
                email: Email.value,
                password: Password.value
            }
    
            /*
    
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
                invalidForm.classList.remove("hidden")
                invalidForm.innerHTML = "All form fields are required"
                return
            }
            */
            
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
                switch (response.status) {
                    case 201:
                        window.location.href = "http://localhost:3000"
                        break
                    case 400:    
                    case 409:
                        invalidForm.classList.remove("hidden")
                        invalidForm.innerHTML = jsonResponse.message
                        break
                    case 422:
                        jsonResponse.forEach((error) => {
                            if (error.data === "invalidEmail") {
                                invalidEmail.classList.remove("hidden")
                                invalidEmail.innerHTML = error.message
                            } else if (error.data === "invalidPassword") {
                                invalidPassword.classList.remove("hidden")
                                invalidPassword.innerHTML = error.message
                            }
                        })
                        break
                }
            } 
            catch (err) {
                invalidForm.innerHTML = "An server side error occurred during the registration process"
            }
        }
    })
}


// * FORM TOGGLE HANDLER * //
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {

        // Switch according to text content
        switch (toggleBtn.textContent) {
            case "sing-up":
                FirstName.classList.remove("hidden")
                LastName.classList.remove("hidden")
                toggleBtn.textContent = "sing-in"
                formSubContainer.classList.remove("singIn")
                formSubContainer.classList.add("singUP")
                invalidForm.innerHTML = ""
                invalidEmail.innerHTML = ""
                invalidPassword.innerHTML = ""
                break;
            case "sing-in":
                FirstName.classList.add("hidden")
                LastName.classList.add("hidden")
                toggleBtn.textContent = "sing-up"
                formSubContainer.classList.remove("singUP")
                formSubContainer.classList.add("singIn")
                invalidForm.innerHTML = ""
                invalidEmail.innerHTML = ""
                invalidPassword.innerHTML = ""
                break;
            default:
                break;
        }
    })
}


/* *****************************************************  DASHBOARD PAGE ************************************************************************ */


// * GET USER * //
const getUser = async () => {

    try {
        // Send request for get user informations
        const response = await fetch("http://localhost:3000/api/user", {
            method: "GET"
        })

        // Extract JSON response
        const jsonResponse = await response.json()

        // Handle response
        switch(response.status) {
            case 200:
                // Display user informations
                firstname.innerHTML = jsonResponse.data.firstName
                lastname.innerHTML = jsonResponse.data.lastName
                mail.innerHTML = jsonResponse.data.email
                document.getElementById('header_full_name').textContent = jsonResponse.data.firstName + " " + jsonResponse.data.lastName
                break
            case 400:
            case 401:
            case 403:
            case 404:
                window.location.href = "http://localhost:3000"
                break
        }
    } catch (err) {
        console.error('Error : ', err)
    } 
    finally {
        // Hide loader
        if (loader) {
            loader.style.display = 'none'
        }
    }
}


// * SQUARE PAVING HANDLER * //

// Squares generator
const generateSquares = () => {

    const rows = rowInput.value && parseInt(rowInput.value)
    const cols = columnInput.value && parseInt(columnInput.value)

    // Define rows and cols
    squearesContainer.style.gridTemplateRows = `repeat(${rows}, auto)`
    squearesContainer.style.gridTemplateColumns = `repeat(${cols}, auto)`
    squearesContainer.innerHTML = ''

    let rowCol = rows * cols;

    // Creating squares
    for (let i = 0; i < rowCol; i++) {
        const square = document.createElement('div')
        square.classList.add('dashboard_square')
        squearesContainer.appendChild(square)
    }
}

// Set listeners
if (rowInput) {
    rowInput.addEventListener('input', generateSquares)
}
if (columnInput) {
    columnInput.addEventListener('input', generateSquares)
}


// * LOGOUT USER HANDLER * //

const logoutHandler = async () => {
    const logout_btn = document.querySelector(".header_logout_btn")
    if (logout_btn) {
        logout_btn.addEventListener('click', async () => {
            try {
                // Send request to logout session
                const response = await fetch("http://localhost:3000/api/logout", {
                    method: "GET"
                });
        
                if (!response.ok) {
                    console.error('Failed to logout')
                }
        
                // if logout successfully redirect to login page
                window.location.href = 'http://localhost:3000'
        
            } catch (err) {
                console.error('Error : ', err)
            }
        })
    }
}


/* *****************************************************  USER PAGE ************************************************************************ */


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


// ** ADD/UPDATE SUBMIT FORM HANDLER ** //

if (form) {
    form.addEventListener('submit', async (e) => {
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
    
}


// **  USER ADD/UPDATE DISPLAY FORM HANDLING  ** //

// Add display handler
if (addUser) {
    addUser.addEventListener('click', (e) => {
        usersForm.classList.remove('hidden')
        form.classList.remove('hidden')
        password.classList.remove('hidden')
        firstName.value = ""
        lastName.value = ""
        email.value = ""
        password.value = ""
        submitBtn.value = "ADD"
    })
}

// Update display handler
if (tbody) {
    tbody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('bi-pencil-square')) {
            usersForm.classList.remove('hidden')
            form.classList.remove('hidden')
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
}

// Close form
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        usersForm.classList.add('hidden')
    })
}


// **  USER DELETE HANDLING  ** //

// Modal display handler
if (tbody) {
    tbody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('bi-trash')) {
            form.classList.add('hidden')
            usersForm.classList.remove('hidden')
            userModal.classList.remove('hidden')
            userId = e.target.id
        }
    })
}

// Confirme delete
if (deleteYes) {
deleteYes.addEventListener('click', async (e) => {

    // Show loader
    formLoader.style.visibility = 'visible'

    try {
        const response = await fetch(`http://localhost:3000/api/delete/user/${userId}`, {
            method: "DELETE"
        })

        // Respons hadling
        if (response.status === 204) {
            modelText.textContent = "User deleted successfully"

            // Update users list
            await getUsers()
            
            setTimeout(() => {
                usersForm.classList.add('hidden')
                userModal.classList.add('hidden')
                formLoader.style.visibility = 'hidden'
            }, 1000)
        }
        else if (response.status === 400 || response.status === 404 || response.status === 500) {
            const jsonResponse = await response.json()
            modelText.textContent = jsonResponse.message
            setTimeout(() => {
                usersForm.classList.add('hidden')
                userModal.classList.add('hidden')
                formLoader.style.visibility = 'hidden'
            }, 1000)
        } 
    }
    catch (err) {
        console.log(err)
    }
})

}

// Cancel delete
if (deleteNo) {
    deleteNo.addEventListener('click', () => {
        usersForm.classList.add('hidden')
        userModal.classList.add('hidden')
    })
}


// **  USERS SEARCH HANDLING  ** //

userSearch.addEventListener('input', async () => {

    // Catch field value
    const searchTerm = userSearch.value
    
    try {
        // Send search term to server
        const response = await fetch(`http://localhost:3000/api/search/users?query=${encodeURIComponent(searchTerm)}`, {
            method: "GET"
        })

        const users = await response.json()
        
        // Clear the existing user list
        if (userSearchList) {

            userSearchList.classList.remove('hidden')

            userSearchList.innerHTML = ''

            // Display the filtered users
            users.data.forEach(user => {
                console.log(user)
                const listItem = document.createElement('li')
                listItem.textContent = `${user.firstName} ${user.lastName}`
                userSearchList.appendChild(listItem)
            })
        }

        if (userSearch.value === "") {
            userSearchList.innerHTML = ''
            userSearchList.classList.add('hidden')
        }
    }
    catch(err) {
        console.error(err)
    }
})