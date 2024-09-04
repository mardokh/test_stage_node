
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
                document.getElementById("dashboard_user_firstName").innerHTML = jsonResponse.data.firstName
                document.getElementById("dashboard_user_lastName").innerHTML = jsonResponse.data.lastName
                document.getElementById("dashboard_user_email").innerHTML = jsonResponse.data.email
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
        console.log('Error : ', err)
    }
    
}


//* LOGOUT HANDLER *//
/*
const lougoutBtn = document.getElementById("dashboard_logout_btn").addEventListener("click", () => {
    localStorage.removeItem("admin_token")
    window.location.href = "http://localhost:3000"
})
*/


// * SQUARE PAVING * //
const rowInput = document.getElementById('rowInput')
const columnInput = document.getElementById('columnInput')
const squearesContainer = document.getElementById('dashboard_squares_container_id')

function generateSquares() {
    const rows = parseInt(rowInput.value)
    const cols = parseInt(columnInput.value)

    squearesContainer.style.gridTemplateRows = `repeat(${rows}, auto)`
    squearesContainer.style.gridTemplateColumns = `repeat(${cols}, auto)`
    squearesContainer.innerHTML = ''

    //let rowCol = rows === 1 && cols === 1 ? rows * cols : rows + cols - 1
    let rowCol = rows * cols

    for (let i = 0; i < rowCol; i++) {
        const square = document.createElement('div')
        square.classList.add('dashboard_square')
        squearesContainer.appendChild(square)
    }
}

rowInput.addEventListener('input', generateSquares)
columnInput.addEventListener('input', generateSquares)

generateSquares()

