
// * CONSTS * //
const loader = document.getElementById('loader')
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const rowInput = document.getElementById('rowInput')
const columnInput = document.getElementById('columnInput')
const squearesContainer = document.getElementById('dashboard_squares_displayer')
const square = document.createElement('div')
const dashboard_btn =  document.getElementById("dashboard_btn")


// * GET USER INFO * //
window.onload = async () => {

    // Unable loader
    loader.style.display = 'flex'

    try {
        const response = await fetch("http://localhost:3000/api/user", {
            method: "GET"
        });

        // Extract JSON response
        const jsonResponse = await response.json()

        // Handle response
        switch(response.status) {
            case 200:
                firstName.innerHTML = jsonResponse.data.firstName
                lastName.getElementById("lastName").innerHTML = jsonResponse.data.lastName
                email.getElementById("email").innerHTML = jsonResponse.data.email
                break;
            case 400:
            case 401:
            case 403:
            case 404:
                window.location.href = "http://localhost:3000"
                break;
        }
    } catch (err) {
        console.error('Error : ', err)
    } finally {
        // Disable loader
        loader.style.display = 'none'
    }
}


// * SQUARE PAVING * //
// Squares generator
function generateSquares() {
    const rows = parseInt(rowInput.value)
    const cols = parseInt(columnInput.value)

    // Define rows and cols
    squearesContainer.style.gridTemplateRows = `repeat(${rows}, auto)`
    squearesContainer.style.gridTemplateColumns = `repeat(${cols}, auto)`
    squearesContainer.innerHTML = '';

    let rowCol = rows * cols;

    // Creating squares
    for (let i = 0; i < rowCol; i++) {
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
        const response = await fetch("http://localhost:3000/api/logout", {
            method: "GET"
        });

        if (!response.ok) {
            console.error('Failed to logout');
        }

        window.location.href = 'http://localhost:3000';

    } catch (err) {
        console.error('Error : ', err);
    }
});
