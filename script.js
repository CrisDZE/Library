class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}. ${this.pages} pages. ${this.read ? "Read" : "Not Read"}`;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    book.index = this.books.length;
    this.books.push(book);
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }

  renderLibrary(container) {
    container.innerHTML = '';
    this.books.forEach((book, index) => {
      container.innerHTML += `
        <div id="book-container">
          <img src="https://img.freepik.com/free-vector/beautiful-book-club-pattern-illustration_23-2149330102.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709510400&semt=ais">
          <p>Title: ${book.title}</p>
          <p>Author: ${book.author}</p>
          <p>Pages: ${book.pages} </p>
          <p>Read: ${book.read ? "Yes" : "No"}</p>
          <p>${book.info()}</p>
          <button class="remove-book-button" data-index="${index}">Remove</button>
          <button class="toggle-read-button" data-index="${index}">Toggle Read Status</button>
        </div>
      `;
    });
  }
}

const mainContainer = document.getElementById("library-main-container");
const nameInput = document.getElementById("add-book-name");
const authorInput = document.getElementById("add-book-author");
const pagesInput = document.getElementById("add-book-pages");
const readInput = document.getElementById("add-book-read");
const addButton = document.getElementById("add-book-button");

const myLibrary = new Library();

addButton.addEventListener('click', function () {
  const newBook = new Book(nameInput.value, authorInput.value, pagesInput.value, readInput.value);
  myLibrary.addBook(newBook);
  myLibrary.renderLibrary(mainContainer);
});

mainContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-book-button')) {
    const indexToRemove = event.target.dataset.index;
    myLibrary.removeBook(indexToRemove);
    myLibrary.renderLibrary(mainContainer);
  } else if (event.target.classList.contains('toggle-read-button')) {
    const indexToToggle = event.target.dataset.index;
    myLibrary.books[indexToToggle].toggleReadStatus();
    myLibrary.renderLibrary(mainContainer);
  }
});

// Initial rendering
myLibrary.renderLibrary(mainContainer);
