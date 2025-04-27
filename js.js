const myLibrary = []
const addButton = document.querySelector("#add")




function Book(book, author, pages, read = false) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.book = book;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read; // برعکس کردن وضعیت خوانده شده
  };

function addBookToLibrary(book) {
    myLibrary.push(book);
    return myLibrary
}




// create new card//

function createCard(bookObj) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = bookObj.id;

    const fields = [
        { label: "Book:", value: bookObj.book },
        { label: "Author:", value: bookObj.author },
        { label: "Pages:", value: bookObj.pages }
    ];

    fields.forEach(field => {
        const title = document.createElement("h4");
        title.textContent = field.label;
        card.appendChild(title);

        const value = document.createElement("p");
        value.textContent = field.value;
        card.appendChild(value);
    });

    const readButton = document.createElement("button");
    readButton.classList.add("readen");
    readButton.textContent = bookObj.read ? "Unread" : "Read";

    readButton.addEventListener("click", () => {
        bookObj.toggleReadStatus(); // وضعیت کتاب رو تغییر بده
        readButton.textContent = bookObj.read ? "Unread" : "Read"; // متن دکمه رو آپدیت کن
      });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";

    // delete button function //

    deleteButton.addEventListener("click", () => {
        const cardId = card.dataset.id;

        // حذف از آرایه myLibrary
        const index = myLibrary.findIndex(book => book.id === cardId);
        if (index !== -1) {
            myLibrary.splice(index, 1);
        }

        // حذف کارت از DOM
        card.remove();
    });

    card.append(readButton, deleteButton);

    return card;
}


// add button function //

addButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form refresh //

    const title = document.querySelector("#book").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const readStatus = document.querySelector("#read-status").checked;

    const newBook = new Book(title, author, pages,readStatus);
    addBookToLibrary(newBook);

    const library = document.querySelector(".library");
    const newCard = createCard(newBook);

    if (library.firstChild) {
        library.insertBefore(newCard, library.firstChild);
    } else {
        library.appendChild(newCard);
    }

    console.log(myLibrary)
    
});




