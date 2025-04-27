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

