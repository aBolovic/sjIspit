function getBooks() {
    fetch("http://localhost:8110/admin/book")
    .then(res => res.json())
    .then(data => {
        console.log(data);

        for(let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");

            td1.innerHTML = data[i].title;
            td2.innerHTML = data[i].author;
            td3.innerHTML = data[i].year_of_publication;
            td4.innerHTML = data[i].genre;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            document.getElementById("book").appendChild(tr);
        } 
    })
    .catch(error => console.error("Error fetching books:", error));
}

function editBook(bookId) {
    fetch(`http://localhost:8110/admin/book/${bookId}`)
    .then(res => res.json())
    .then(book => {

        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("year_of_publication").value = book.year_of_publication;
        document.getElementById("genre").value = book.genre;


        document.getElementById("addBookForm").addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = {
                title: document.getElementById("title").value,
                author: document.getElementById("author").value,
                year_of_publication: document.getElementById("year_of_publication").value,
                genre: document.getElementById("genre").value
            };

            fetch(`http://localhost:8110/admin/book/${bookId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(updatedBook => {
                alert("Book updated successfully!");
                getBooks();
            })
            .catch(error => console.error("Error updating book:", error));
        });
    })
    .catch(error => console.error("Error fetching book data for editing:", error));
}

function deleteBook(bookId) {
    if (confirm("Are you sure you want to delete this user?")) {
        fetch(`http://localhost:8110/admin/book/${bookId}`, {
            method: "DELETE"
        })
        .then(() => {
            alert("Book deleted successfully!");
            getBooks();
        })
        .catch(error => console.error("Error deleting book:", error));
    }
}

window.addEventListener("load", function(){
    getBooks();
    document.getElementById("addBookForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            year_of_publication: document.getElementById("year_of_publication").value,
            genre: document.getElementById("genre").value,
        };

        fetch("http://localhost:8110/admin/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(newBook => {
            getBooks(); 
        })
        .catch(error => console.error("Error adding book:", error));
    });
});