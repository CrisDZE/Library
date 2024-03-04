const mainContainer = document.getElementById("library-main-container")

const nameInput = document.getElementById("add-book-name")
const authorInput = document.getElementById("add-book-author")
const pagesInput = document.getElementById("add-book-pages")
const readInput = document.getElementById("add-book-read")
const addButton = document.getElementById("add-book-button")

const myLibrary = [];

function BookConstructor(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = null;
  this.info = () =>`${this.title} by ${this.author}. ${this.pages} pages. 
    ${this.read ?"Read":"Not Read"}`;
  
  this.toggleReadStatus = () => {
    this.read = !this.read;
  };
};

function addBookToLibrary() {
  // do stuff here
  const newBook = new BookConstructor(nameInput.value, authorInput.value, pagesInput.value, readInput.value);
  newBook.index = myLibrary.length;
  myLibrary.push(newBook);
  renderLibrary();
}

addButton.addEventListener('click', function () {
  addBookToLibrary()
  mainContainer.innerHTML = ''
for(let i=0; i < myLibrary.length; i++){
  mainContainer.innerHTML +=`
  <div id="book-container">
    <img src="https://img.freepik.com/free-vector/beautiful-book-club-pattern-illustration_23-2149330102.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709510400&semt=ais">
      <p>Title: ${myLibrary[i].title}</p>
      <p>Author: ${myLibrary[i].author}</p>
      <p>Pages: ${myLibrary[i].pages} </p>
      <p>Read: ${myLibrary[i].read ? "Yes" : "No"}</p>
      <p>${myLibrary[i].info()}</p>
      <button class="remove-book-button" data-index="${i}">Remove</button>
  </div>
  `
}
  console.log(myLibrary)
})
function renderLibrary() {
  mainContainer.innerHTML = ''; // Limpiar el contenedor
  for (let i = 0; i < myLibrary.length; i++) {
    mainContainer.innerHTML += `
      <div id="book-container">
        <img src="https://img.freepik.com/free-vector/beautiful-book-club-pattern-illustration_23-2149330102.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709510400&semt=ais">
        <p>Title: ${myLibrary[i].title}</p>
        <p>Author: ${myLibrary[i].author}</p>
        <p>Pages: ${myLibrary[i].pages} </p>
        <p>Read: ${myLibrary[i].read ? "Yes" : "No"}</p>
        <p>${myLibrary[i].info()}</p>
        <button class="remove-book-button" data-index="${i}">Remove</button>
        <button class="toggle-read-button" data-index="${i}">Toggle Read Status</button>
      </div>
    `;
  }
}
mainContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-book-button')) {
    const indexToRemove = event.target.dataset.index;
    myLibrary.splice(indexToRemove, 1);
    renderLibrary();
  } else if (event.target.classList.contains('toggle-read-button')) {
    const indexToToggle = event.target.dataset.index;
    myLibrary[indexToToggle].toggleReadStatus(); // Cambiar el estado de lectura del libro
    renderLibrary(); // Volver a renderizar la biblioteca después de cambiar el estado de lectura
  }
});


