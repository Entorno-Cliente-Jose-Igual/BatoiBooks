import './style.css'
import batoiLogo from './public/logoBatoi.png'
import Books from './src/model/books.class';
import Modules from './src/model/modules.class';
import Users  from './src/model/users.class';




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

const allBooks = new Books()
await allBooks.populate()

const allModules = new Modules()
await allModules.populate()

const allUsers = new Users()
await allUsers.populate()

console.log(allUsers)

allUsers.changeUserPassword('2', 'contra');



console.log(allBooks.toString());
console.log(allBooks.booksFromModule(5021));
console.log(allBooks.booksWithStatus('new'));
console.log(allBooks.incrementPriceOfbooks(0.1));



