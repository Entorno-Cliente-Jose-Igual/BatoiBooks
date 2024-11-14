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
    }

    renderBook(book, modules = []) {
        const bookUI = document.createElement('div');
        bookUI.classList.add("card");
        bookUI.setAttribute("id", book.id);

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
          <h4>Precio: ${book.price} €</h4>
          <button data-type="cart" data-id="${book.id}" class="cart">
            <span class="material-icons">add_shopping_cart</span>
          </button>
          <button data-type="edit" data-id="${book.id}" class="edit">
             <span class="material-icons">edit</span>
          </button>
          <button data-type="delete" data-id="${book.id}" class="delete">
             <span class="material-icons">delete</span>
          </button>
        </div>`;

        this.bookList.appendChild(bookUI);
    }

    renderEditedBook(book, modules = []){
        const bookUI = document.getElementById(book.id);
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
          <h4>Precio: ${book.price} €</h4>
          <button data-type="cart" data-id="${book.id}" class="cart">
            <span class="material-icons">add_shopping_cart</span>
          </button>
          <button data-type="edit" data-id="${book.id}" class="edit">
             <span class="material-icons">edit</span>
          </button>
          <button data-type="delete" data-id="${book.id}" class="delete">
             <span class="material-icons">delete</span>
          </button>
        </div>`;
    }

    renderBookInForm(book){
        this.bookForm.querySelector("h3").textContent = "Editar libro";
        this.bookForm.querySelector("button[type='submit']").textContent = "Editar";
        document.getElementById("id").parentElement.classList.remove("hidden");
        document.getElementById("id").value = book.id;
        document.getElementById("id-module").value = book.moduleCode;
        document.getElementById("publisher").value = book.publisher;
        document.getElementById("price").value = book.price;
        document.getElementById("pages").value = book.pages;
        document.querySelector("input[name='status'][value='"+ book.status +"']").checked = true;
        document.getElementById("comments").value = book.comments;
    }

    removeBookFromView(id) {
        const bookUI = this.bookList.querySelector(`[data-id="${id}"]`);
        if (bookUI) {
            this.bookList.removeChild(bookUI);
        }
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
        }, 9000);
    }

    setBookSubmitHandler(callback) {
        this.bookForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const payload = {
                moduleCode: document.getElementById('id-module').value,
                publisher: document.getElementById('publisher').value,
                price: document.getElementById('price').value,
                pages: document.getElementById('pages').value,
                status: document.querySelector('input[name="status"]:checked')?.value,
                comments: document.getElementById('comments').value
            };
             
            if(document.getElementById('id').value){
               payload.id = document.getElementById('id').value;
            }
            callback(payload);
        });
    }

    setBookButtonsHandler(callback) {
        this.bookList.addEventListener('click',(event) => {
            const buttonClicked = event.target.closest("button");
            if(!buttonClicked) return;
            callback(buttonClicked.className ,buttonClicked.dataset.id);
        })
    }
}