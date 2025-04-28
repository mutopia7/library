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

Book.prototype.toggleReadStatus = function () {
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

        if (bookObj.read) {
            card.classList.add("read");
          } else {
            card.classList.remove("read");
          };
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
    e.preventDefault();
  
    const titleInput = document.querySelector("#book");
    const authorInput = document.querySelector("#author");
    const pagesInput = document.querySelector("#pages");
    const readStatus = document.querySelector("#read-status").checked;
  
    const titleError = document.querySelector("#book-error");
    const authorError = document.querySelector("#author-error");
    const pagesError = document.querySelector("#pages-error");
  
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pagesValue = pagesInput.value.trim();
    const pages = Number(pagesValue);
  
    // اول پاک کنیم خطاهای قبلی رو
    titleError.textContent = "";
    authorError.textContent = "";
    pagesError.textContent = "";
  
    let isValid = true;
  
    // چک عنوان کتاب
    if (!title) {
      titleError.textContent = "Title is required.";
      isValid = false;
    }
  
    // چک نویسنده
    if (!author) {
      authorError.textContent = "Author is required.";
      isValid = false;
    }
  
    // چک صفحات
    if (!pagesValue) {
      pagesError.textContent = "Pages is required.";
      isValid = false;
    } else if (pages <= 0 || isNaN(pages)) {
      pagesError.textContent = "Enter a positive number.";
      isValid = false;
    }
  
    if (!isValid) {
      return; // اگر خطایی بود، اضافه نکن
    }
  
    const newBook = new Book(title, author, pages, readStatus);
    addBookToLibrary(newBook);
  
    const library = document.querySelector(".library");
    const newCard = createCard(newBook);
  
    if (library.firstChild) {
      library.insertBefore(newCard, library.firstChild);
    } else {
      library.appendChild(newCard);
    }
  
    // ریست فرم
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    document.querySelector("#read-status").checked = false;
  });



// controls button //

const clearAllButton = document.querySelector("#clear-all");
const showReadButton = document.querySelector("#show-read");
const showUnreadButton = document.querySelector("#show-unread");
const library = document.querySelector(".library");

// دکمه Clear All
clearAllButton.addEventListener("click", () => {
  myLibrary.length = 0; // آرایه خالی بشه
  library.innerHTML = ""; // همه کارت ها از صفحه پاک بشن
});

// دکمه Show Read Books
showReadButton.addEventListener("click", () => {
  library.innerHTML = ""; // صفحه خالی کن
  myLibrary
    .filter(book => book.read) // فقط کتاب‌های خوانده شده
    .forEach(book => {
      const card = createCard(book);
      card.classList.add("read");
      library.appendChild(card);
    });
});

// دکمه Show Unread Books
showUnreadButton.addEventListener("click", () => {
  library.innerHTML = ""; // صفحه خالی کن
  myLibrary
    .filter(book => !book.read) // فقط کتاب‌های نخوانده
    .forEach(book => {
      const card = createCard(book);
      library.appendChild(card);
    });
});

  