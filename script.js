const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')


function adicionarNovaTarefa() {
    if(input.value.trim() === ''){
        alert("Por favor, insira uma tarefa antes de adicionar!");
        return;//Retorna para evitar adicionar uma tarefa vazia à lista.
    }
    // Adicionar nova tarefa à lista
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    })
    
    input.value = ''//Limpar o campo de entrada
    
    mostrarTarefas() //Atualizar a exibição de tarefas da lista
}

let minhaListaDeItens = []

function mostrarTarefas() {

    let novaLi = ''

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi = novaLi + `
            <li class="task ${item.concluida && "done"}" style="margin-top:30px">
                <img src="img/checked.png" alt="check-item" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="img/trash.png" alt="trash-icon" onclick="deletarItem(${posicao})">
            </li>`
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
    
}

button.addEventListener('click', adicionarNovaTarefa)

function deletarItem(posicao){
    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefas()
}

function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()
}

function recarregarTarefas(){
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if(tarefasDoLocalStorage){
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    

    mostrarTarefas()
}

recarregarTarefas()


input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionarNovaTarefa(); // Chama a função para adicionar a nova tarefa
    }
});