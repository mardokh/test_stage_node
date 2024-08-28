
window.onload = async () => {

    try {
        const response = await fetch("http://localhost:3000/api/user", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
            }
        })
    
        // Extrad json response
        const jsonResponse = await response.json()
    
        // Respons hadling
        switch(response.status) {
            case 200:
                document.getElementById("dashboard_firstName").innerHTML = jsonResponse.data.firstName
                document.getElementById("dashboard_lastName").innerHTML = jsonResponse.data.lastName
                document.getElementById("dashboard_email").innerHTML = jsonResponse.data.email
              break
            case 400:
            case 401:    
            case 403:    
            case 404:
                console.log(jsonResponse.message)    
                window.location.href = "http://localhost:3000/main"
              break
        }
    }
    catch (err) {
        console.log('Error : ', err)
    }
    
}


//* LOGOUT HANDLER *//
const lougoutBtn = document.getElementById("dashboard_logout_btn").addEventListener("click", () => {
    localStorage.removeItem("admin_token")
    window.location.href = "http://localhost:3000/main"
})

