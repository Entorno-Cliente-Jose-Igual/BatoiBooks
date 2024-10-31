import Modules from "../model/modules.class";
import Users from "../model/users.class";
import Books from "../model/books.class";
import View from '../view/view.class';
import Book from "../model/book.class";

export default class Controller{
    constructor(){
        this.model = {
            modules: new Modules(),
            users: new Users(),
            books: new Books()
        }
        this.view = new View();
    }

    async init(){
        await Promise.all([
            this.model.modules.populate(),
            this.model.users.populate(),
            this.model.books.populate()
        ]);
       this.view.renderModulesSelect(this.model.modules.data);
       this.model.books.data.forEach(book => this.view.renderBook(book));
       this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
       this.view.setRemoveBookHandler(this.handleRemoveBook.bind(this));
    }

    handleSubmitBook(payload){
        const libro = this.model.books.addBook(payload);
        this.view.renderBook(libro);
    }

    handleRemoveBook(id){
        const libro = this.model.books.removeBook(id);
        this.view.renderBook(libro);
    }
}