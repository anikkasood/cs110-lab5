async function loadBooks() {

    let response = await fetch("http://localhost:3000/books");

    console.log(response.status); //200
    console.log(response.statusText); //OK

    if(response.status === 200){
        let data = await response.text();
        console.log(data);
        const books = JSON.parse(data);

        for (let book of books) {
            const x = `
                <div class = "col-4" id="book-${book.isbn}">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <h6 class="card-subtitle mb-2 test-muted">${book.isbn}</h6>

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
            `

            // document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
            document.getElementById('books').innerHTML += x;

        }
    }


}

async  function deleteBook(isbn){
    try{
        let response = await fetch(`http://localhost:3000/book/${isbn}`,{
            method: 'DELETE'
        });

        if(response.ok){
            document.getElementById(`book-${isbn}`).remove();
        }else {
            console.error('Failed to delete book');
        }
    }catch (error) {
        console.error('Error deleting book:', error);
    }
   

}

loadBooks();