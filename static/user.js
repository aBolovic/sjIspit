function getUsers() {
    fetch("http://localhost:8110/admin/user")
    .then(res => res.json())
    .then(data => {
        console.log(data);

        for(let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let td5 = document.createElement("td");
            td1.innerHTML = data[i].name;
            td2.innerHTML = data[i].last_name;
            td3.innerHTML = data[i].email;
            td4.innerHTML = data[i].password;
            td5.innerHTML = data[i].role;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            document.getElementById("user").appendChild(tr);
        } 
    })
    .catch(error => console.error("Error fetching users:", error));
}

function editUser(userId) {
    fetch(`http://localhost:8110/admin/user/${userId}`)
    .then(res => res.json())
    .then(user => {

        document.getElementById("name").value = user.name;
        document.getElementById("last_name").value = user.last_name;
        document.getElementById("email").value = user.email;
        document.getElementById("password").value = user.password;
        document.getElementById("role").value = user.role;


        document.getElementById("addUserForm").addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = {
                name: document.getElementById("name").value,
                last_name: document.getElementById("last_name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                role: document.getElementById("role").value
            };

            fetch(`http://localhost:8110/admin/user/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(updatedUser => {
                alert("User updated successfully!");
                getUsers();
            })
            .catch(error => console.error("Error updating user:", error));
        });
    })
    .catch(error => console.error("Error fetching user data for editing:", error));
}

function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        fetch(`http://localhost:8110/admin/user/${userId}`, {
            method: "DELETE"
        })
        .then(() => {
            alert("User deleted successfully!");
            getUsers();
        })
        .catch(error => console.error("Error deleting user:", error));
    }
}

window.addEventListener("load", function(){
    getUsers();
    document.getElementById("addUserForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            last_name: document.getElementById("last_name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            role: document.getElementById("role").value
        };

        fetch("http://localhost:8110/admin/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(newUser => {
            getUsers(); 
        })
        .catch(error => console.error("Error adding user:", error));
    });
});