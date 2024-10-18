const SERVER = import.meta.env.VITE_URL_API;

async function getDBModules() {
    const response = await fetch(SERVER + '/modules')
    if(!response.ok){
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`)
    }
    return response.json()
}

export default{
    getDBModules
}