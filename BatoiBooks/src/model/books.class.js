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

    async addBook(book){
        const libros = await apiBooks.getDBBooks();
    
        // Map the IDs and filter out any invalid ones
        const ids = libros.map(libro => parseInt(libro.id, 10)).filter(id => !isNaN(id));
        
        // Calculate the maximum ID
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        
        // Create a new book with the next ID
        const libro = new Book({ id: (maxId + 1).toString(), ...book });
        
        // Add the new book to the data array
        this.data.push(libro);
        
        // Save the new book to the database
        await apiBooks.addDBBook(libro);
        
        return libro;
    }
    
    async removeBook(id){
        const bookIndex = this.data.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new Error('No se ha podido eliminar el libro, compruebe que el id es correcto');
        } 
        try{
            await apiBooks.removeDBBook(id);
        }catch(error){
            console.log(error);
        }

        this.data.splice(bookIndex,1)
    }

    async changeBook(book) {
       const newBook = new Book(book);
        const index = this.data.findIndex((item) => item.id === newBook.id);
        if (index === -1) throw new Error("Book not found");
    console.log('hola');
        try{
          await apiBooks.changeDBBook(newBook);
        }catch(error){
          console.log(error)
        }
    
        this.data[index] = newBook;
        return newBook;
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

    async bookExists(userId,moduleCode){
        const book = await apiBooks.bookDBExists(userId,moduleCode);
        return book !== null;
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