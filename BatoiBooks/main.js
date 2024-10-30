import './style.css'
import batoiLogo from './public/logoBatoi.png'

document.querySelector('#app').innerHTML = `
  <div>
    <a" target="_blank">
      <img src="${batoiLogo}" class="logo" alt="BatoiLogo" />
    </a>
    <h1>BatoiBooks</h1>

    <nav>
      <ul>
        <li><a href="#list">Ver Libros</a></li>
        <li><a href="#form">Añadir Libro</a></li>
        <li><a href="#about">Acerca de...</a></li>
      </ul>
    </nav>
    <div id="messages"></div>
    <div id="list"></div>
    <div id="form"></div>
  <div>
    <label for="id-remove">Id:</label>
    <input type="number" id="id-remove">
    <button id="remove">Borrar libro</button>
  </div>
  <form id="bookForm">
    <div>
      <label for="id-module">Módulo:</label>
      <select id="id-module">
        <option>- Selecciona un módulo -</option>
      </select>
    </div>

    <div>
      <label for="publisher">Editorial:</label>
      <input type="text" id="publisher" required>
    </div>

    <div>
      <label for="price">Precio:</label>
      <input type="number" id="price">
    </div>

    <div>
      <label for="pages">Páginas:</label>
      <input type="number" id="pages">
    </div>

    <div>
      <label>Estado:</label>
      <!-- Aquí poned un radiobutton para cada estado -->
      <input type="radio" name="status" value="new">Nuevo
      <input type="radio" name="status" value="good">Bueno      
      <input type="radio" name="status" value="used">Usado
      <input type="radio" name="status" value="bad">Malo
      <input type="radio" name="status" value="digital">Digital
    </div>

    <div>
      <label for="comments">Comentarios:</label>
      <textarea id="comments"></textarea>
    </div>

    <button type="submit">Añadir</button>
    <button type="reset">Reset</button>
  </form>
  </div>
`

document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller()
  myController.init()
})


