import Book from './book.class.js';
import apiBooks from '../services/books.api.js';

export default class Books{
    constructor(){
        this.data = [];
    }

    async populate(){
        const libros =  await apiBooks.getDBBooks();
        this.data = libros.map(libro => new Book(libro));      
    }

    addBook(book){
        let ultimoId = this.data.reduce((max, book) => book.id > max ? book.id : max, 0);
        const libro = new Book({id:ultimoId + 1, ...book});
        this.data.push(libro);
        apiBooks.addDBBook(libro);
        return libro;
    }
    
    async removeBook(id){
        const bookIndex = this.data.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new Error('No se ha podido eliminar el libro, compruebe que el id es correcto');
        } 
        try{
            await api.getDBBook(id);
            await apiBooks.getDBBook(id);
        }catch(error){
            console.log(error);
        }

        this.data.splice(bookIndex,1)
    }

    async changeBook(book) {
        book = new Book(book);
        const index = this.data.findIndex((item) => item.id === book.id);
        if (index === -1) throw new Error("Book not found");
    
        try{
          await api.changeDBBook(book)
        }catch(error){
          console.log(error)
        }
    
        this.data[index] = book;
        return book;
    }

    toString(){
        return this.data.map(book => book.toString()).join('\n');
    }

    getBookById(bookId){
        let libro = this.data.find(book => book.id === bookId);
        if(libro == undefined || libro == null){
            throw new Error('El libro que buscas no existe');
        }else{
            return libro;
        }
    }
    
    getBookIndexById(bookId){
        let numero = this.data.findIndex(book => book.id === bookId);
        if(numero === -1){
            throw new Error('No se encuentra el libro ni su indice');
        }else{
            return numero;
        }
    }
    
    bookExists(userId,moduleCode){
        return this.data.some((book)=> book.userId === userId && book.moduleCode === moduleCode);
    }

    booksFromUser(userId){
        return this.data.filter(book => book.userId === userId);
    }
    
    booksFromModule(moduleCode){
        return this.data.filter(book => book.moduleCode === moduleCode);
    }
    
    booksCheeperThan(price){
        return this.data.filter(book => book.price <= price);
    }
    
    booksWithStatus(status){
        return this.data.filter(book => book.status.toLowerCase() === status.toLowerCase());
    }

    averagePriceOfBooks(){
        let precioSuma = this.data.reduce((total,book) => total += book.price,0);
        precioSuma = precioSuma / this.data.length;
        return (isNaN(precioSuma))? '0.00 €': precioSuma.toFixed(2) + ' €';
    }
    
    booksOfTypeNotes(){
        return this.data.filter((book) => book.publisher === 'Apunts');
    }
    
    booksNotSold(){
        let libros = this.data.filter((book) => book.soldDate === "");
        return libros;
    }
    
    incrementPriceOfbooks(precentage){
        return this.data.map(book => ({...book, price: book.price + (book.price * precentage)}));
    }
}