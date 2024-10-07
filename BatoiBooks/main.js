import './style.css'
import batoiLogo from './public/logoBatoi.png'


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
