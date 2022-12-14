const content = document.querySelector('.content');
const addBookButton = document.querySelector("#new-book");
const container = document.querySelector(".popup .container");
const popup = document.querySelector(".popup");
const submitButton = document.querySelector("#submit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const isreadinput = document.querySelector("#question");
const image_link = document.querySelector("#image-link");
const form = document.querySelector("add-book-form");
const error = document.querySelector(".error");

addBookButton.addEventListener("click", () => {
    popup.style.visibility = "visible";
});

document.addEventListener('click', (event) => {
    if (popup.style.visibility == 'visible' && !container.contains(event.target) && !addBookButton.contains(event.target)) {
        popup.style.visibility = "hidden";
        error.style.visibility = "hidden";
        clearform();
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
let donQuixote = new book('Don Quixote', 'Miguel De Cervantes', 190, true, "images/don-quixote.jpg");
let daVinciCode = new book('Da Vinci Code', 'Dan Brown', 318, false, "images/da_vinci_code.jpg");
let harryPotter = new book('Harry Potter', "J.K Rowling", 260, false, "images/harry-potter.jpg");
let lotr = new book('Lord of the Rings', 'J.R.R. Tolkien', 238, false, "images/lotr.jpg");

addBookToLibrary(theHobbit);
addBookToLibrary(donQuixote);
addBookToLibrary(daVinciCode);
addBookToLibrary(harryPotter);
addBookToLibrary(lotr);


submitButton.addEventListener('click', () => {
    if (validform()) {
        let addedBook = new book(title.value, author.value, pages.value, isreadinput.checked, image_link.value);
        addBookToLibrary(addedBook);
        clearform();
        popup.style.visibility = 'hidden';
        error.style.visibility = 'hidden';
    } else {
        error.style.visibility = 'visible';
    }
});


function addBookToLibrary(book) {
    myLibrary.push(book);

    const card = document.createElement('div');
    card.classList.add('card');

    content.appendChild(card);

    const actionsdiv = document.createElement('div');

    const img = document.createElement('img');
    img.classList.add('book-cover');
    img.src = book.image_link;

    const actionslist = document.createElement('ul');
    actionslist.classList.add('actions');

    const action1 = document.createElement('li');
    action1.classList.add('read');
    const action2 = document.createElement('li');
    action2.classList.add('edit');
    const action3 = document.createElement('li');
    action3.classList.add('delete');

    let actions = [action1, action2, action3];

    actions.forEach((action) => {
        action.addEventListener('click', (event) => {
            bookName = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].textContent;
            //bookAuthor = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[0].textContent;
            action = event.target.parentNode.classList[0];

            actionHandler(bookName, action);
        })
    });

    const action1img = document.createElement('img');
    const action2img = document.createElement('img');
    const action3img = document.createElement('img');

    action1img.src = "images/read.png";
    action2img.src = "images/edit.png";
    action3img.src = "images/bin.png";

    action1.appendChild(action1img);
    action2.appendChild(action2img);
    action3.appendChild(action3img);

    actionslist.appendChild(action1);
    actionslist.appendChild(action2);
    actionslist.appendChild(action3);

    actionsdiv.appendChild(img);
    actionsdiv.appendChild(actionslist);

    card.appendChild(actionsdiv);

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
    pages.textContent = book.pages + " Pages";

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
    read.textContent = book.isread ? 'Read' : 'Not Read';
    read.style.color = book.isread ? 'green' : 'red';

    seconddiv.appendChild(read);
    information.appendChild(seconddiv);

    allCards = getAllCards();
}

function validform() {
    return (title.value !== '' && author.value !== '' && pages.value !== '');
}

function clearform() {
    title.value = '';
    author.value = '';
    pages.value = '';
    image_link.value = '';
    isreadinput.checked = false;
}

function actionHandler(bookName, action) {
    let bookIndex = findBook(bookName);
    if (bookIndex != -1) {
        if (action == "read") { //READ 
            readBook(bookIndex);
        } else if (action == "edit") { //EDIT
            editBook(bookIndex);
        } else if (action == "delete") { //DELETE
            deleteBook(bookIndex);
        }
    } else {
        console.log("Book not found");
    }
}


function deleteBook(bookIndex) {
    myLibrary = myLibrary.filter(b => b.title != myLibrary[bookIndex].title);
    allCards[bookIndex].remove();
    allCards = getAllCards();
}

function findBook(bookName) {
    return (myLibrary.map(b => b.title).indexOf(bookName));
}

function readBook(bookIndex) {
    myLibrary[bookIndex].isread = myLibrary[bookIndex].isread ? false : true;
    allCards[bookIndex].childNodes[1].childNodes[1].childNodes[1].textContent = myLibrary[bookIndex].isread ? "Read" : "Not Read";
    allCards[bookIndex].childNodes[1].childNodes[1].childNodes[1].style.color = myLibrary[bookIndex].isread ? "green" : "red";
}

function editBook(bookIndex) {
    edits = [allCards[bookIndex].childNodes[1].childNodes[0].childNodes[0],
    allCards[bookIndex].childNodes[1].childNodes[0].childNodes[1],
    allCards[bookIndex].childNodes[1].childNodes[1].childNodes[0]];

    edits.forEach((edit) => {
        edit.contentEditable = "true";
    });

    edits.forEach(edit => {
        edit.addEventListener('focusout', () => {
            edit.contentEditable = "false";
            saveChanges(bookIndex, edits);
        });
    })

    edits.forEach(edit => {
        edit.addEventListener('keypress', (e) => {
            if (e.which === 13 && document.activeElement === edit) {
                edit.contentEditable = "false";
            } else if (e.which === 13) {
                edit.contentEditable = "false";
                saveChanges(bookIndex, edits);
            }
        })
    });

    edits[0].focus()


}

function getAllCards() {
    return document.querySelectorAll('.card');
}

function saveChanges(bookIndex) {
    myLibrary[bookIndex].title = edits[0].textContent;
    myLibrary[bookIndex].pages = edits[1].textContent;
    myLibrary[bookIndex].author = edits[2].textContent;
}