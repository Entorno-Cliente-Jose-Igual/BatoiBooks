import Modules from "../model/modules.class";
import Users from "../model/users.class";
import Books from "../model/books.class";
import View from '../view/view.class';
import Cart from "../model/cart.class";

export default class Controller{
    constructor(){
        this.model = {
            modules: new Modules(),
            users: new Users(),
            books: new Books(),
            cart: new Cart()
        }
        this.view = new View();
    }

    async init(){
        this.view.setBookListHandler(this.handleBookButtonClicked.bind(this));
        this.view.setBookResetHandler(this.handleBookReset.bind(this));

        try {
            await Promise.all([
                this.model.modules.populate(),
                this.model.users.populate(),
                this.model.books.populate(),
                this.model.cart.populate()
            ]);
            this.view.renderModulesSelect(this.model.modules.data);
            this.model.books.data.forEach(book => this.view.renderBook(book, this.model.modules.data));
            this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
            this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
            this.addEventListenersToButtons2();
        } catch (error) {
            this.view.showMessage('error', 'Error al inicializar los datos: ' + error.message);
        }
    }

    async handleSubmitBook(payload){
        payload.pages = parseInt(payload.pages);
        payload.price = parseFloat(payload.price);

        try {
            if(payload.id){
                payload.id = parseInt(payload.id);
                const editedBook = await this.model.books.changeBook(payload.id);
                this.view.showMessage('success', 'El libro ha sido editado correctamente');
                this.view.renderBook(editedBook);
                return;
            }

            const book = await this.model.books.addBook(payload);
            this.view.renderBook(book);
            this.view.showMessage('success', 'El libro ha sido añadido correctamente');
        } catch (error) {
            this.view.showMessage('error', 'Error al añadir el libro: ' + error.message);
        }
    }

    async handleRemoveBook(id){
        if(!confirm(`¿Estás seguro de que deseas eliminar el libro con id: ${id} ?`)){
            return;
        }
        try {
            const bookExists = this.model.books.data.some(book => book.id === id);
            if (!bookExists) {
                throw new Error('El libro no existe');
            }
            await this.model.books.removeBook(id);
            this.view.removeBookFromView(id);
            this.view.showMessage('success', 'El libro ha sido eliminado correctamente');
        } catch (error) {
            this.view.showMessage('error', 'Error al eliminar el libro: ' + error.message);
        }
    }

    async handleBookButtonClicked(action, bookId) {
        const book = this.model.books.getBookById(bookId);
        switch (action) {
            case 'remove':
                console.log("Botón de eliminación pulsado");
                await this.handleRemoveBook(bookId);
                break;
            case 'cart':
                console.log("Añadir al carrito");
                this.model.cart.addItem(book);
                break;
            case 'edit':
                console.log("Editar libro");
                this.view.renderBookInForm(book);
                break;
            default:
                break;
        }
    }

    handleBookReset() {
        this.view.renderFormToAddBook();
    }
}