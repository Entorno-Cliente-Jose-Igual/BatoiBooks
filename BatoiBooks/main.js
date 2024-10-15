import './style.css'
import batoiLogo from './public/logoBatoi.png'
import data from './src/services/datos'
import books from './src/model/books.class';
import modules from './src/model/modules.class';
import users  from './src/model/users.class';




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

const books = new Books()
books.populate(data.books)

const modules = new Modules()
modules.populate(data.modules)

const users = new Users()
users.populate(data.users)

console.log(books.toString());
console.log(books.booksFromModule(5021));
console.log(books.booksWithStatus('new'));
console.log(books.incrementPriceOfbooks(0.1));