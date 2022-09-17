// HTML - FRONTEND

const content = document.querySelector('.content');
const addBookButton = document.querySelector("#new-book");
const container = document.querySelector(".popup .container");
const popup = document.querySelector(".popup");
const submitButton = document.querySelector("#submit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const isreadinput = document.querySelector("#question");
const form = document.querySelector("add-book-form");
const error = document.querySelector(".error");

addBookButton.addEventListener("click", () => {
    popup.style.visibility = "visible";
});

document.addEventListener('click', (event) => {
    if (popup.style.visibility == 'visible' && !container.contains(event.target) && !addBookButton.contains(event.target)){
       popup.style.visibility = "hidden";
    }
});

// LOGIC - BACKEND

let myLibrary = [];

function book(title, author, pages, isread, image = "images/da_vinci_code.jpg") {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;
    this.image_link = image; // DEFAULT
}


let theHobbit = new book('The Hobbit', 'J.R.R. Tolkien', 290, false, "images/thehobbit.jpg");
let donQuixote = new book('Don Quixote', 'Miguel De Cervantes', 190, false, "images/don-quixote.jpg");
let daVinciCode = new book('Da Vinci Code', 'Dan Brown', 318, false, "images/da_vinci_code.jpg");

addBookToLibrary(theHobbit);
addBookToLibrary(donQuixote);
addBookToLibrary(daVinciCode);

submitButton.addEventListener('click', () => {
    if (validform()){
    let addedBook = new book(title.value, author.value, pages.value, question.value);
    addBookToLibrary(addedBook);
    clearform();
    popup.style.visibility = 'hidden';
    }else{
        error.style.visibility = 'visible';
    }
});


function addBookToLibrary(book) {
    myLibrary.push(book);

    const content = document.querySelector('.content');

    const card = document.createElement('div');
    card.classList.add('card');

    content.appendChild(card);

    const img = document.createElement('img');
    img.src = book.image_link;

    card.appendChild(img);

    const information = document.createElement('div');
    information.classList.add('information');

    card.appendChild(information);

    const div = document.createElement('div');

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = book.title;

    div.appendChild(title);

    const pages = document.createElement('div');
    pages.classList.add('pages');
    pages.textContent = book.pages;

    div.appendChild(pages);
    information.appendChild(div);

    card.appendChild(information);

    const seconddiv = document.createElement('div');

    const author = document.createElement('div');
    author.classList.add('author');
    author.textContent = book.author;

    seconddiv.appendChild(author);

    const read = document.createElement('div');
    read.classList.add('isread');
    read.textContent = book.read? 'Read': 'Not Read';

    seconddiv.appendChild(read);
    information.appendChild(seconddiv);
}

function validform() {
    return(title.value !== '' && author.value !== '' && pages.value !== '');
}

function clearform() {
    title.value = '';
    author.value = '';
    pages.value = '';
    question.checked = false;
}