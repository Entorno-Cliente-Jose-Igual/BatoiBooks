import Book from './book.class.js';

export default class Books{
    constructor(){
        let data = [];
    }

    populate(array){
        this.data = array;
    }

    addBook(book){
        let ultimoId = this.data.reduce((max, book) => book.id > max ? book.id : max);
        const libro = new Book({id:ultimoId, ...book});
        this.data.push(libro);
    }
    //esta hay que comprobar q este bien
    removeBook(id){
       this.data = this.data.filter(book => book.id !== id);
    }

    changeBook(book){

    }
}