async function loadBooks() {
    let response = await fetch("http://localhost:3000/books");

    if (response.status === 200) {
        let data = await response.json();
        const books = data;

        document.getElementById('books').innerHTML = '';
        for (let book of books) {
            const x = `
                <div class="col-4" id="book-${book.isbn}">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                            <div>Author: ${book.author}</div>
                            <div>Publisher: ${book.publisher}</div>
                            <div>Number Of Pages: ${book.numOfPages}</div>

                            <hr>

                            <button type="button" class="btn btn-danger" onClick="deleteBook('${book.isbn}')">Delete</button>
                            <button type="button" class="btn btn-primary" data-toggle="modal"
                                data-target="#editBookModal" onClick="setEditModal('${book.isbn}')">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('books').innerHTML += x;
        }
    }
}

async function deleteBook(isbn) {
    try {
        let response = await fetch(`http://localhost:3000/book/${isbn}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.getElementById(`book-${isbn}`).remove();
        } else {
            console.error('Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

async function setEditModal(isbn) {
    let response = await fetch(`http://localhost:3000/book/${isbn}`);

    if (response.status === 200) {
        let data = await response.json();
        const book = data;

        document.getElementById('isbn').value = book.isbn;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('publisher').value = book.publisher;
        document.getElementById('publish_date').value = book.publish_date;
        document.getElementById('numOfPages').value = book.numOfPages;
    }
}

document.getElementById('editForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const isbn = document.getElementById('isbn').value;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const publish_date = document.getElementById('publish_date').value;
    const publisher = document.getElementById('publisher').value;
    const numOfPages = document.getElementById('numOfPages').value;

    const updatedBook = {
        isbn,
        title,
        author,
        publish_date,
        publisher,
        numOfPages
    };

    try {
        let response = await fetch(`http://localhost:3000/book/${isbn}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        if (response.ok) {
            // Update the book in the DOM
            loadBooks();
            $('#editBookModal').modal('hide');
        } else {
            console.error('Failed to update book');
        }
    } catch (error) {
        console.error('Error updating book:', error);
    }
});

loadBooks();
