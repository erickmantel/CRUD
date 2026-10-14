import {createClient, readClient, updateClient, deleteClient} from './model.js'
import {openModal, closeModal, updateTable} from './view.js'
import {editDelete, saveClient} from './controller.js'

updateTable()

document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('close-modal').addEventListener('click', closeModal)
document.getElementById('cancelar').addEventListener('click', closeModal)
document.getElementById('salvar').addEventListener('click', saveClient)
document.querySelector('#tableClient>tbody').addEventListener('click', editDelete)
