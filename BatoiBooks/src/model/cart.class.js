export default class cart {
    constructor(){
        this.data = [];
    }

    populate(){
    }

    getBookById(id){
        return this.data.find(book => book.id === id) || {}
    }

    addItem(book){
        const bookToAdd = {...book};

        if(isNaN(this.getBookById(bookToAdd.id))){
            this.data.push(bookToAdd);
        }else{
            throw new Error('El libro ya está en el carrito')
        }
    }

    removeItem(id){
        if(this.data.find(book => book.id === id) !== undefined){
            this.data = this.data.filter(book => book.id !== id);
        }else{
            throw new Error('El libro no está en el carrito')
        }
    }

    toString(){
        return this.data.map(book => book.toString()).join('\n');
    }
}