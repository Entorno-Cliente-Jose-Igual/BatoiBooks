const SERVER = import.meta.env.VITE_URL_API;

async function getDBBooks() {
    const response = await fetch(SERVER + '/books')
    if(!response.ok){
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`)
    }
    return await response.json()
}

async function getDBBook(idBook) {
    const response = await fetch(SERVER + `/books/${idBook}`)
    if(!response.ok){
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`)
    }
    return await response.json()
}

async function addDBBook(book) {
    const response = await fetch(SERVER + '/books', {
        method: 'POST',
        body: JSON.stringify(book),
        headers:{
            'Content-Type' : 'application/json'
        },
    })
    if(!response.ok){
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`)
    }
    return await response.json()
}

async function removeDBBook(idBook) {
    const response = await fetch(SERVER + `/books/${idBook}`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    if(!response.ok){
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`)
    }
    return response.json()
}

async function changeDBBook(book) {
    const response = await fetch(SERVER + `/books/${book.id}`,{
        method: 'PUT',
        body: JSON.stringify(book),
        headers:{
            'Content-Type': 'application/json'
        },
    })
    if(!response.ok){
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`)
    }
    return response.json()
}

async function bookDBExists(userId, moduleCode) {
    const response = await fetch(SERVER + `/books?userId=${userId}&moduleCode=${moduleCode}`)
    if(!response.ok){
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`)
    }
    return await response.json()
}

export default{
    getDBBooks,
    getDBBook,
    addDBBook,
    removeDBBook,
    changeDBBook
}