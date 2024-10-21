const SERVER = import.meta.env.VITE_URL_API;

async function getDBUsers() {
    const response = await fetch(SERVER + '/users')
    if(!response.ok){
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`)
    }
    return await response.json()
}

async function getDBUser(idUser) {
    const response = await fetch(SERVER + `/users/${idUser}`)
    if(!response.ok){
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`)
    }
    return await response.json()
}

async function addDBUser(user) {
    const response = await fetch(SERVER + `/users`,{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(!response.ok){
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`)
    }
    return response.json()
}

async function removeDBUser(idUser) {
    const response = await fetch(SERVER + `/users/${idUser}`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    if(!response.ok){
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`)
    }
    return response.json()
}

async function changeDBUser(user) {
    const response = await fetch(SERVER + `/users/${user.id}`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    if(!response.ok){
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`)
    }
    return response.json()
}

async function changeDBUserPassword(idUser,newPassword) {
    const response = await fetch(SERVER + `/users/${idUser}`,{
        method: 'PATCH',
        body: JSON.stringify({password: newPassword}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    if(!response.ok){
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`)
    }
    return await response.json()
}

export default{
    getDBUsers,
    getDBUser,
    addDBUser,
    removeDBUser,
    changeDBUser,
    changeDBUserPassword
}