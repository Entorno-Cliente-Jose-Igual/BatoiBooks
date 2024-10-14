import './style.css'
import batoiLogo from './public/logoBatoi.png'
import data from './src/services/datos'
import { averagePriceOfBooks, bookExists, booksCheeperThan, booksFromModule, booksFromUser, booksNotSold, booksOfTypeNotes, booksWithStatus, getBookById, getBookIndexById, getModuleByCode, getUserById, getUserByNickName, incrementPriceOfbooks } from './src/functions';




document.querySelector('#app').innerHTML = `
  <div>
    <a" target="_blank">
      <img src="${batoiLogo}" class="logo" alt="BatoiLogo" />
    </a>
    <h1>BatoiBooks</h1>
    <p class="read-the-docs">
      Abre la consola para ver el resultado
    </p>
  </div>
`

// Mostrar todos los libros del usuario 4
console.log(booksFromUser(data.books, 4));

// Mostrar todos los libros del módulo 5021 que están en buen estado ("good")
console.log(booksWithStatus(booksFromModule(data.books, 5021), 'good'));

// Incrementar un 10% el precio de los libros y mostrarlos por consola
console.log(incrementPriceOfbooks(data.books, 0.1));


//extra
console.log(getBookById(data.books, 1));
console.log(getBookIndexById(data.books, 1));
console.log(bookExists(data.books, 1));
console.log(booksFromUser(data.books, 1));
console.log(booksFromModule(data.books, 1));
console.log(booksCheeperThan(data.books, 10));
console.log(booksWithStatus(data.books, 'good'));
console.log(averagePriceOfBooks(data.books));
console.log(booksOfTypeNotes(data.books));
console.log(booksNotSold(data.books));
console.log(incrementPriceOfbooks(data.books, 0.1));
console.log(getUserById(data.users, 1));
console.log(getUserByNickName(data.users, 'Ximo'));
console.log(getModuleByCode(data.modules, 'CV0001'));