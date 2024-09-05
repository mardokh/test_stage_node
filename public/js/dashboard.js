
// * GET USER INFO * //
window.onload = async () => {

    try {
        const response = await fetch("http://localhost:3000/api/user", {
            method: "GET"
        })
    
        // Extrad json response
        const jsonResponse = await response.json()
    
        // Respons hadling
        switch(response.status) {
            case 200:
                document.getElementById("firstName").innerHTML = jsonResponse.data.firstName
                document.getElementById("lastName").innerHTML = jsonResponse.data.lastName
                document.getElementById("email").innerHTML = jsonResponse.data.email
              break
            case 400:
            case 401:    
            case 403:    
            case 404:
                window.location.href = "http://localhost:3000"
              break
        }
    }
    catch (err) {
        console.error('Error : ', err)
    }
    
}


// * SQUARE PAVING * //
const rowInput = document.getElementById('rowInput')
const columnInput = document.getElementById('columnInput')
const squearesContainer = document.getElementById('dashboard_squares_displayer')

// Squares generator
function generateSquares() {
    const rows = parseInt(rowInput.value)
    const cols = parseInt(columnInput.value)

    // Define rows and cols
    squearesContainer.style.gridTemplateRows = `repeat(${rows}, auto)`
    squearesContainer.style.gridTemplateColumns = `repeat(${cols}, auto)`
    squearesContainer.innerHTML = ''

    //let rowCol = rows === 1 && cols === 1 ? rows * cols : rows + cols - 1
    let rowCol = rows * cols

    // Creating squares
    for (let i = 0; i < rowCol; i++) {
        const square = document.createElement('div')
        square.classList.add('dashboard_square')
        squearesContainer.appendChild(square)
    }
}

// Set listenners
rowInput.addEventListener('input', generateSquares)
columnInput.addEventListener('input', generateSquares)

// Initial square
generateSquares()


// * LOGOUT USER  * //
document.getElementById("dashboard_btn").addEventListener('click', async () => {

    try {
        const response = await fetch("http://localhost:3000/api/logout", {
            method: "GET"
        })

        if (!response.ok) {
            console.error('Failed to logout')
        }

        window.location.href = 'http://localhost:3000'

    } 
    catch (err) {
        console.error('Error : ', err)
    }
})
