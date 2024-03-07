//DOM elements
const mainContainer = document.getElementById("library-main-container")

const nameInput = document.getElementById("add-book-name")
const authorInput = document.getElementById("add-book-author")
const pagesInput = document.getElementById("add-book-pages")
const readInput = document.getElementById("add-book-read")
const addButton = document.getElementById("add-book-button")

//data object save
const myLibrary = [];

//e.listener to form button
addButton.addEventListener('click', function () {
  //calls to add the form to the data
  addBookToLibrary()
  //cleans the DOM and set the complete data array
  renderLibrary()
})
//buttons inside mainContainer(remove and read status)
mainContainer.addEventListener('click', function (event) {
  //checks if the button is the remove
  if (event.target.classList.contains('remove-book-button')) {
    //takes the index of the button (same as the object)
    const indexToRemove = event.target.dataset.index;
    //takes the the index and removes it from the data save (object index and data save position is the same)
    myLibrary.splice(indexToRemove, 1);
    //call to render the new array
    renderLibrary();
    //checks if the button is the read status
  } else if (event.target.classList.contains('toggle-read-button')) {
    //takes the index of the button (same as the object)
    const indexToToggle = event.target.dataset.index;
    //uses the func inside the data save status with the button index
    myLibrary[indexToToggle].toggleReadStatus();
    //call to render the new array
    renderLibrary();
  }
});

//Book object constructor
function BookConstructor(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = null;
  this.info = () =>`${this.title} by ${this.author}. ${this.pages} pages. 
    ${this.read ?"Read":"Not Read"}`;
  
  //changes read status
  this.toggleReadStatus = () => {
    this.read = !this.read;
  };
};
//Adds new object to the data array
function addBookToLibrary() {
  //use values of DOM form to make a new object with the constructor
  const newBook = new BookConstructor(nameInput.value, authorInput.value, pagesInput.value, readInput.value);
  //adds new key with the array length as value. This works as an unique ID for the object
  newBook.index = myLibrary.length;
  //adds the new object to the data
  myLibrary.push(newBook);
  //call to render the div
  renderLibrary();
}
//renders the data array
function renderLibrary() {
  //cleans the DOM
  mainContainer.innerHTML = '';
  //inherits in the data array
  for (let i = 0; i < myLibrary.length; i++) {
    //sets new HTML in the DOM
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
