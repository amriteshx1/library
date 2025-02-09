
class Book{
  constructor(title,author,pages,hasRead){

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }

  changeReadStatus(){
    this.hasRead = !this.hasRead;
  }
}

const myLibrary = [
  new Book('Crime and Punishment','Fyodor Dostoyevsky','720',true),
  new Book('1984','George Orwell','328',false)
];

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
const titleIn = document.getElementById('bookTitle');
const writerIn = document.getElementById('bookAuthor');
const pageIn = document.getElementById('totalPages');
const viewIn = document.getElementById('readingStatus');

titleIn.addEventListener('input', () => {
  titleIn.setCustomValidity('');
});

writerIn.addEventListener('input', () => {
  writerIn.setCustomValidity('');
});

pageIn.addEventListener('input', () => {
  pageIn.setCustomValidity('');
});

viewIn.addEventListener('input', () => {
  viewIn.setCustomValidity('');
});

form.addEventListener('submit',(event) =>{
  event.preventDefault();

  const title = titleIn.value.trim();
  console.log(title)
  const writer = writerIn.value.trim();
  const page = parseInt(pageIn.value.trim());
  const view = viewIn.value;

  let isValid = true;
  

  if(!title ){
    titleIn.setCustomValidity('Enter title');
    isValid = false;
  }
  
  if (!writer){
    writerIn.setCustomValidity('Enter author');
    isValid = false;
  }

  if (!page || page <= 0){
    pageIn.setCustomValidity('Enter valid number of pages');
    isValid = false;
  }
  
  if (viewIn.value === ""){
    viewIn.setCustomValidity('Provide reading status');
    isValid = false;
  }

  if (!isValid){
    form.reportValidity();
    return;
  }

  const bookNew = new Book(title,writer,page,view);
  myLibrary.push(bookNew);
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