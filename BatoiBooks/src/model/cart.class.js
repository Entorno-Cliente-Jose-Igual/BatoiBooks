export default class Cart{
    constructor(){
        this.data = [];
    }

    populate(){
        //por ahora no hace nada
    }

    getBookById(id){
        return this.data.find(book => book.id === id) ? this.data.find(book => book.id === id) : {};
    }

    addItem(book){
        if(!this.getBookById(book.id).id){
            throw new Error(`El libro con id ${book.id} ya existe en el carrito`);
        }
        this.data.push(copyBook);
    }

    removeItem(id){
       const index = this.data.findIndex(book => book.id === id);
       if(index === -1){
           throw new Error(`El libro con id ${id} no existe en el carrito`);
       }
       this.data.splice(index, 1);
    }

    toString(){
        let text = `Cart: ${this.data.length} `;
        this.data.forEach(book => text += `\n\t${book.toString()}`);
        return text;
    }
}