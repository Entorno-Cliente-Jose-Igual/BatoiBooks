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
        } catch (error) {
            this.view.showMessage('error', 'Error al inicializar los datos: ' + error.message);
        }
    }

    async handleSubmitBook(payload){
        try {
            const libro = await this.model.books.addBook(payload);
            this.view.renderBook(libro,this.model.modules.data);
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

    handleBookButtonClicked(action,bookId){
        switch (action) {
            case 'remove':
                this.handleRemoveBook(bookId);
                break;
            case 'cart':
                this.model.cart.addItem(this.model.books.getBookById(bookId));
                break;
            case 'edit':
                this.view.renderBookInForm(this.model.books.getBookById(bookId));
                break;
            default:
                break;
        }
    }
}