export default class View{
    constructor(){
        this.bookList = document.getElementById('list');
        this.about = document.getElementById('about');
        this.form = document.getElementById('form');
        this.messages = document.getElementById('messages');
        this.remove = document.getElementById('remove');
        this.bookForm = document.getElementById('bookForm');
    }

    renderModulesSelect(modules){
        const selectUI = document.getElementById("id-module")
        modules.forEach(module => {
            const option = document.createElement('option');
            option.value = module.code;
            option.textContent = module.cliteral;
            selectUI.appendChild(option)});
    }

    renderBook(book){
        const bookUI = document.createElement('div');
        bookUI.className = 'card';
        bookUI.innerHTML = `
        <img src="${book.photo}" alt="Libro: ${book.id}">
        <div>
          <h3>${book.moduleCode} (${book.id})</h3>
          <h4>${book.publisher}</h4>
          <p>${book.pages} paginas</p>
          <p>Estado: ${book.status}</p>
          <p>${book.soldDate}</p>
          <p>${book.comments}</p>
          <h4>${book.price} €</h4>
        </div>`;

        this.bookList.appendChild(bookUI);
    }

    renderRemoveBook(){
        const removeUI = document.createElement('div');
        removeUI.className = 'remove';
        removeUI.innerHTML = `
        <label for="id-remove">Id:</label>
        <input type="number" id="id-remove">
        <button id="remove">Borrar libro</button>`;
        this.remove.appendChild(removeUI);
    }

    showMessage(type,message){
        const messageUI = document.createElement('div');
        messageUI.className = type + "alert alert-danger alert-dismissible";
        messageUI.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
        `;
        this.messages.appendChild(messageUI);
    }

    setBookSubmitHandler(callback) {  
        this.bookForm.addEventListener('submit', (event) => {
           event.preventDefault()
           // a continuación recoge los datos del formulario y los guarda en un objeto // por último llama a la función recibida pasándole dicho objeto
           const moduleCode = document.getElementById('id-module').value;
           const publisher = document.getElementById('publisher').value;
           const price = document.getElementById('price').value;
           const pages = document.getElementById('pages').value;
           const status = document.querySelector('input[name="status"]:checked')?.value;
           const comments = document.getElementById('comments').value;
          callback({
            moduleCode,
            publisher,
            price, 
            pages,
            status, 
            comments
          })
        })
       }
       
       setRemoveBookHandler(callback) {
         this.remove.addEventListener('click', () => {
           // recoge la id del libro a borrar y la pasa a la fn
           const idToRemove = document.getElementById('id-remove').value
           callback(idToRemove)
         })
       }
}