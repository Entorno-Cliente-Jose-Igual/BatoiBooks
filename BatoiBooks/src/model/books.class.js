import Book from './book.class.js';

export default class Books{
    constructor(){
        this.data = [];
    }

    populate(array){
        this.data = array.map(book => new Book(book));
    }

    addBook(book){
        let ultimoId = this.data.reduce((max, book) => book.id > max ? book.id : max, 0);
        const libro = new Book({id:ultimoId + 1, ...book});
        this.data.push(libro);
        return libro;
    }
    
    removeBook(id){
        const bookIndex = this.data.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new Error('No se ha podido eliminar el libro, compruebe que el id es correcto');
        } else {
            this.data = this.data.filter(book => book.id !== id);
        }
    }

    changeBook(book){
        const bookIndex = this.data.findIndex(b => b.id === book.id);
        if (bookIndex !== -1) {
            this.data[bookIndex] = new Book(book);
            return this.data[bookIndex];
        } else {
            throw new Error('No se ha podido modificar el libro, compruebe que el id es correcto');
        }
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