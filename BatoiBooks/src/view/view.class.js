export default class View {
    constructor() {
        this.bookList = document.getElementById('list');
        this.about = document.getElementById('about');
        this.form = document.getElementById('form');
        this.messages = document.getElementById('messages');
        this.remove = document.getElementById('remove');
        this.bookForm = document.getElementById('bookForm');
    }

    renderModulesSelect(modules) {
        const selectUI = document.getElementById("id-module");
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Seleccione un módulo';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectUI.appendChild(defaultOption);
        modules.forEach(module => {
            const option = document.createElement('option');
            option.value = module.code;
            option.textContent = module.cliteral;
            selectUI.appendChild(option);
        });

        selectUI.required = true
        selectUI.value = '';
    }

    renderBook(book, modules = []) {
        const bookUI = document.createElement('div');
        bookUI.className = 'card';
        const moduleName = modules.find(module => module.code === book.moduleCode)?.cliteral ?? 'Desconocido';

        bookUI.innerHTML = `
        <img src="${book.photo === '' ? '/public/defaultIMG.jpg' : book.photo}" alt="Libro: ${book.id}">
        <div>
          <h3>${moduleName} (${book.id})</h3>
          <h4>${book.publisher}</h4>
          <p>${book.pages} paginas</p>
          <p>Estado: ${book.status}</p>
          <p>${book.soldDate ? 'Fecha de venta: ' + book.soldDate : 'En venta'}</p>
          <p>${book.comments}</p>
          <h4>Precio: ${book.price.toFixed(2)} €</h4>
          <div id="botones">
            <button class="botonesLibro" type="button" data-action="cart" data-id="${book.id}">
              <span class="material-icons">add_shopping_cart</span>
            </button>
            <button class="botonesLibro" type="button" data-action="edit" data-id="${book.id}">
              <span class="material-icons">edit</span>
            </button>
            <button class="botonesLibro" type="button" data-action="remove" data-id="${book.id}">
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>`;

        this.bookList.appendChild(bookUI);
    }

    removeBookFromView(id) {
        const bookUI = this.bookList.querySelector(`[data-id="${id}"]`);
        if (bookUI) {
            this.bookList.removeChild(bookUI);
        }
    }

    setBookListHandler(callback) {
        this.bookList.addEventListener('click', (event) => {
            const buttonClicked = event.target.closest('button');
            if (!buttonClicked) {
                return;
            }
            const action = event.target.getAttribute('data-action');
            const bookId = event.target.getAttribute('data-id');
            callback(action, bookId);
        });
    }

    setBookResetHandler(callback) {
        const resetButton = this.bookForm.querySelector("button[type='reset']");
        resetButton.addEventListener('click', (event) => {
            event.preventDefault();
            callback();
        });
    }

    renderFormToAddBook(){
        this.bookForm.querySelector('h3').textContent = 'Añadir libro';
        this.bookForm.querySelector("button[type='submit']").textContent = 'Añadir';
        document.getElementById('divId').style.visibility = 'hidden';
        this.bookForm.reset();
        document.getElementById('id-module').value = '';
    }

    renderBookInForm(book){
        this.bookForm.querySelector('h3').textContent = 'Editar libro';
        this.bookForm.querySelector("button[type='submit']").textContent = 'Editar';
        document.getElementById('divId').style.visibility = 'visible';
        document.getElementById('bookId').value = book.id;
        document.getElementById('bookId').disabled = true;
        document.getElementById('id-module').value = book.moduleCode;
        document.getElementById('publisher').value = book.publisher;
        document.getElementById('price').value = book.price;
        document.getElementById('pages').value = book.pages;
        document.querySelector(`input[name="status"][value="${book.status}"]`).checked = true;
        document.getElementById('comments').value = book.comments;
    }

    showMessage(type, message) {
        const messageUI = document.createElement('div');
        messageUI.className = type + " alert alert-danger alert-dismissible";
        messageUI.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
        `;
        this.messages.appendChild(messageUI);

        setTimeout(() => {
            if (messageUI.parentElement) {
                messageUI.parentElement.removeChild(messageUI);
            }
        }, 3000);
    }

    setBookSubmitHandler(callback) {
        this.bookForm.addEventListener('submit', (event) => {
            event.preventDefault();
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
            });
        });
    }

    setBookRemoveHandler(callback) {
        document.getElementById('remove').addEventListener('click', () => {
            const idToRemove = document.getElementById('id-remove').value;
            callback(idToRemove);
        });
    }
}