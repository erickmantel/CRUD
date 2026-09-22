'use strict'

//VIEW
const openModal = () => document.getElementById('modal').classList.add('active');
const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    clearFields()
}


//MODEL
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient))

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

//VIEW
const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const form = document.getElementById('form')
    form.reset()
}

const creatRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button btn-save" id="edit-${index}" >Editar</button>
        <button type="button" class="button btn-cancel" id="delete-${index}" >Excluir</button>
    </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.remove())
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(creatRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}


//CONTROLER
const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
    updateTable()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Têm certeza que deseja excluir o cliente ${client.nome}?`)
            if (response){
                deleteClient(index)
            }
        }
    }
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index === 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

updateTable()

//Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)
document.getElementById('close-modal')
    .addEventListener('click', closeModal)
document.getElementById('cancelar')
    .addEventListener('click', closeModal)
document.getElementById('salvar')
    .addEventListener('click', saveClient)
document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)

