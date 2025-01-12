const myLibrary = [
  new Book('Crime and Punishment','Fyodor Dostoyevsky','720',true),
  new Book('1984','George Orwell','328',false)
];

function Book(title,author,pages,hasRead){
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}
Book.prototype.changeReadStatus = function () {
  this.hasRead = !this.hasRead;
};


function addBookToLibrary(title,author,pages,hasRead){
  const book1 = new Book(title,author,pages,hasRead);
  myLibrary.push(book1);
}

function displayBooks(arr){
    const cnt = document.querySelector('.container');
    cnt.innerHTML = '';

    arr.forEach((element,index) => {
      const newElement = document.createElement('div');
      const newButton = document.createElement('button');
      const newReadStatus = document.createElement('button');

      newElement.className = 'childDiv';
      newButton.className = 'childBtn';
      newReadStatus.className = 'childBtn';

      newReadStatus.innerText= 'Toogle Read Status';
      newReadStatus.addEventListener('click',(event) =>{
        event.preventDefault();
        element.changeReadStatus();
        displayBooks(arr);
      })

      newButton.textContent = 'Remove';
      newButton.setAttribute('data-index',index);

      newButton.addEventListener('click',(event) =>{
        event.preventDefault();
        arr.splice(index,1);
        displayBooks(arr);
      })

      const createPara = (text) =>{
        const para = document.createElement('p');
        para.className = 'childPara';
        para.textContent = text;
        return para;
      }

      newElement.appendChild(createPara(`Title: ${element.title}`));
      newElement.appendChild(createPara(`Author: ${element.author}`));
      newElement.appendChild(createPara(`Pages: ${element.pages}`));
      newElement.appendChild(createPara(`Reading Status: ${element.hasRead}`));
    
      newElement.appendChild(newButton);
      newElement.appendChild(newReadStatus);

      cnt.appendChild(newElement);
    });
}

const dialog = document.getElementById("myDialog");
const form = document.getElementById("myForm");
const showBtn = document.querySelector('.b1');
const cancelBtn = document.getElementById("cancel");

form.addEventListener('submit',(event) =>{
  event.preventDefault();

  const title = document.getElementById('bookTitle').value;
  const writer = document.getElementById('bookAuthor').value;
  const page = parseInt(document.getElementById('totalPages').value);
  const view = document.getElementById('readingStatus').value;
  addBookToLibrary(title,writer,page,view);
  displayBooks(myLibrary);
  dialog.close();
  form.reset();
});

showBtn.addEventListener("click", () => {
  dialog.showModal();
});
cancelBtn.addEventListener("click", () => {
  dialog.close();
  form.reset();
});
displayBooks(myLibrary);