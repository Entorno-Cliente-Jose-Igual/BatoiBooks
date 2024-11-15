export default class Router {
    constructor() {
        // Enlazar el contexto del método
        this.handleHashChange = this.handleHashChange.bind(this);
        // Agregar el escuchador del evento 'hashchange'
        window.addEventListener('hashchange', this.handleHashChange);
        // Llamar al método inicialmente para manejar el hash actual
        this.handleHashChange();
    }

    handleHashChange(){
        const hash = window.location.hash.substring(1);
    
        switch(hash){
            case 'form':
                console.log('Mostrar vista de inicio');
                document.getElementById("list").style.display = 'none';
                document.getElementById("form").style.removeProperty('display');

                break;
            case 'list':
                console.log('Mostrar vista de libros');
                document.getElementById("list").style.display = 'flex';
                document.getElementById("form").style.display = 'none';
                break;
            default:
                console.log('Mostrar vista por defecto');
                document.getElementById("list").style.display = 'flex';
                document.getElementById("form").style.display = 'none';
                break;
        }
    }

}

