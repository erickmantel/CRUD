import {readClient} from './model.js'

export const openModal = () => {
    document.getElementById('modal').classList.add('active')
}

export const closeModal = () => {
    document.querySelector('.modal-header > h2').innerHTML = "Novo Cliente"
    document.getElementById('modal').classList.remove('active')
    clearFields()
}

export const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(creatRow)
}

const clearFields = () => {
    const form = document.getElementById('form')
    document.getElementById('nome').dataset.index = "new"
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

export const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

export const editNameModal = (nameClient) => {
    document.querySelector('.modal-header > h2').innerHTML = `Editando ${nameClient}`
}