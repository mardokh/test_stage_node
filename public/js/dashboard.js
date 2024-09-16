
// * CONSTS * //
const loader = document.getElementById('loader')
const rowInput = document.getElementById('rowInput')
const columnInput = document.getElementById('columnInput')
const squearesContainer = document.getElementById('dashboard_squares_displayer');
const dashboard_btn = document.getElementById("dashboard_btn")
const firstname = document.getElementById("firstName")
const lastname = document.getElementById("lastName")
const mail = document.getElementById("email")


// * GET USER INFO * //
window.onload = async () => {

    // Show loader
    loader.style.display = 'flex'

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
                firstname.innerHTML = jsonResponse.data.firstName
                lastname.innerHTML = jsonResponse.data.lastName
                mail.innerHTML = jsonResponse.data.email
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
    } finally {
        // Hide loader
        loader.style.display = 'none'
    }
}


// * SQUARE PAVING * //
// Squares generator
const generateSquares = () => {
    const rows = parseInt(rowInput.value)
    const cols = parseInt(columnInput.value)

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
rowInput.addEventListener('input', generateSquares)
columnInput.addEventListener('input', generateSquares)

// Initial square
generateSquares()


// * LOGOUT USER * //
dashboard_btn.addEventListener('click', async () => {
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
