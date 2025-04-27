const myLibrary = []



function Book(book,author,pages){
    if (!new.target){
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.book = book;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(book){
    myLibrary.push(book);
    return
}

const book1 = new Book("harry","vahid",300);
const book2 = new Book("harry","vd",330);
addBookToLibrary(book1)
addBookToLibrary(book2)
console.log(myLibrary)

console.log(myLibrary[0].book)


// dom manipulation //

const libraryInHtml = document.querySelector(".library")

const div1 = document.createElement("div");
div1.setAttribute("id", "div1");
div1.classList.add("card")
libraryInHtml.appendChild(div1);

const h4Book = document.createElement("h4");
h4Book.textContent = "Book:";
div1.appendChild(h4Book);

const pBook1 = document.createElement("p");
pBook1.textContent = myLibrary[0].book;
div1.appendChild(pBook1);

const h4Author = document.createElement("h4");
h4Author.textContent = "Author:";
div1.appendChild(h4Author);

const pAuthor1 = document.createElement("p");
pAuthor1.textContent = myLibrary[0].author;
div1.appendChild(pAuthor1);

const h4Pages = document.createElement("h4");
h4Pages.textContent = "Pages:";
div1.appendChild(h4Pages);

const pPages1 = document.createElement("p");
pPages1.textContent = myLibrary[0].pages;
div1.appendChild(pPages1);

const readButoon1 = document.createElement("button")
readButoon1.classList.add("readen");
readButoon1.textContent = "Read";
div1.appendChild(readButoon1);

const deleteButton1 = document.createElement("button")
deleteButton1.classList.add("delete");
deleteButton1.textContent = "Delete"
div1.appendChild(deleteButton1);





