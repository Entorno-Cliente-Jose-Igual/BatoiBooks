import './style.css'
import batoiLogo from './public/logoBatoi.png'
import Controller from './src/controller/controller.class'

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
  <form id="bookForm">
    <h3>Añadir libro</h3>

    <div class="hidden">
      <label for="id">ID:</label>
      <input type"text" id="id" disabled><br>
    </div>
    <div>
      <label for="id-module">Módulo:</label>
      <select id="id-module" required>
      </select>
    </div>

    <div>
      <label for="publisher">Editorial:</label>
      <input type="text" id="publisher" required>
    </div>

    <div>
      <label for="price">Precio:</label>
      <input type="number" id="price" required>
    </div>

    <div>
      <label for="pages">Páginas:</label>
      <input type="number" id="pages" required>
    </div>

    <div>
      <label>Estado:</label>
      <!-- Aquí poned un radiobutton para cada estado -->
      <input type="radio" name="status" value="new" required>Nuevo
      <input type="radio" name="status" value="good" required>Bueno      
      <input type="radio" name="status" value="used" required>Usado
      <input type="radio" name="status" value="bad" required>Malo
      <input type="radio" name="status" value="digital" required>Digital
    </div>

    <div>
      <label for="comments">Comentarios:</label>
      <textarea id="comments"></textarea>
    </div>

    <button type="submit">Añadir</button>
    <button type="reset">Reset</button>
  </form>
  </div>
  <footer>
    <p>© 2024 BatoiBooks José Igual Avila</p>
  </footer>
`

document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller()
  myController.init()
})


