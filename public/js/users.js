
// ** CONSTS ** //
const addUser = document.getElementById('addUser')
const updateUser = document.getElementById('updateUser')
const usersForm = document.querySelector('.user_form_section')
const closeBtn = document.querySelector('.bi-x-circle-fill')
const submitBtn = document.getElementById('submitBtn')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const password = document.getElementById('password')


// **  USER ADD/UPDATE HANDLER  ** //

// Display form handler
addUser.addEventListener('click', (e) => {
    usersForm.classList.remove('hidden')
    submitBtn.value = "ADD"
})

if (updateUser) {
    updateUser.addEventListener('click', (e) => {
        usersForm.classList.remove('hidden')
        submitBtn.value = "UPDATE"
    })
}

// Close form
closeBtn.addEventListener('click', () => {
    usersForm.classList.add('hidden')
})


const tbody = document.getElementById('tableBody');


// Fetch users from the backend and dynamically create rows
const fetchAndDisplayUsers = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/getting/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Extract JSON response
        const users = await response.json();

        // Check if response is OK and users data is present
        if (response.status === 200 && users.data.length > 0) {
            
            // Clear existing rows
            tbody.innerHTML = "";

            // Loop through users and create table rows
            users.data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${new Date(user.timestamp)}</td>
                    <td>
                        <div class="user_table_actions">
                            <div>
                                <i class="bi bi-pencil-square" id="updateUser"></i>
                                <i class="bi bi-trash"></i>
                            </div>
                            <label class="switch">
                                <input type="checkbox" ${user.status === "unable" ? "checked" : ""}>
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });

        } else {
            console.log('No users found or failed to fetch users');
        }

    } catch (error) {
        console.log('Error fetching users: ', error);
    }
};

fetchAndDisplayUsers()


// Submit form hanlder 
usersForm.addEventListener('submit', async (e) => {

    // Prevent default submit
    e.preventDefault()

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
            
            // Respons hadling
            if (response.status === 201) {
                console.log('ADD SUCCESS : ', jsonResponse)
            }
            else if (response.status === 409 || response.status === 500) {
                console.log('ADD FAILED : ', jsonResponse)
            }
        }
        else if (submitBtn.value === "UPDATE") {
            const response = await fetch("http://localhost:3000/api/update/user/66e83c4d74786eff0edb73d0", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(data)
            })
    
            // Extrad json response
            const jsonResponse = await response.json()
            
            // Respons hadling
            if (response.status === 200) {
                console.log('UPDATE SUCCESS : ', jsonResponse)
            }
            else if (response.status === 400 || response.status === 404 || response.status === 500) {
                console.log('UPDATE FAILED : ', jsonResponse)
            }
        }
    }
    catch (err) {
        console.log(err)
    }
})