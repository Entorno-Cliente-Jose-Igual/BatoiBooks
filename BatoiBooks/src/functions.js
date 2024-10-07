'use strict'

function getBookById(books,bookId){
    let libro = books.find(book => book.id === bookId);
    if(libro == undefined || libro == null){
        throw new Error('El libro que buscas no existe');
    }else{
        return libro;
    }
}

function getBookIndexById(books,bookId){
    let numero = books.findIndex(book => book.id === bookId);
    if(numero === -1){
        throw new Error('No se encuentra el libro ni su indice');
    }else{
        return numero;
    }
}

function bookExists(books,userId,moduleCode){
    return books.some((book)=> book.userId === userId && book.moduleCode === moduleCode);
}

function booksFromUser(books,userId){
    return books.filter(book => book.userId === userId);
}

function booksFromModule(books,moduleCode){
    return books.filter(book => book.moduleCode === moduleCode);
}

function booksCheeperThan(books,price){
    return books.filter(book => book.price <= price);
}

function booksWithStatus(books,status){
    return books.filter(book => book.status.toLowerCase() === status.toLowerCase());
}

function averagePriceOfBooks(books){
    let precioSuma = books.reduce((total,book) => total += book.price,0);
    precioSuma = precioSuma / books.length;
    return (isNaN(precioSuma))? '0.00 €': precioSuma.toFixed(2) + ' €';
}

function booksOfTypeNotes(books){
    return books.filter((book) => book.publisher === 'Apunts');
}

function booksNotSold(books){
    let libros = books.filter((book) => book.soldDate === "");
    return libros;
}

function incrementPriceOfbooks(books,precentage){
    return books.map(book => ({...book, price: book.price + (book.price * precentage)}));
}

function getUserById(users,userId){
    let usuario = users.find(user => user.id === userId);

    if(usuario != null && usuario != undefined){
        return usuario;
    }else{
        throw new Error('No se ha encontrado el usuario por su id');
    }
}

function getUserIndexById(users,userId){
    let usuarioIndex = users.findIndex(user => user.id === userId);

    if(usuarioIndex != -1){
        return usuarioIndex;
    }else{
        throw new Error('No se ha encontrado el usuario por su id');
    }
}

function getUserByNickName(users,nick){
    let usuarioNick = users.find(user => user.nick === nick);

    if(usuarioNick != null && usuarioNick != undefined){
        return usuarioNick;
    }else{
        throw new Error('No se ha encontrado el usuario por su nick');
    }
}

function getModuleByCode(modules,moduleCode){
    let mod = modules.find(modul => modul.code === moduleCode);

    if(mod != null && mod != undefined){
        return mod;
    }else{
        throw new Error('No se ha encontrado el modulo');
    }
}

export {
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNotes,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode
  }