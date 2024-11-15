export default class Router {
    constructor() {
        this.handleHashChange = this.handleHashChange.bind(this);
        window.addEventListener('hashchange', this.handleHashChange);
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

