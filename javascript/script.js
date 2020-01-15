let board = document.getElementById('board');
let buttonAdd = document.getElementById('add');
let inputAdd = document.getElementById('novaTarefa');
let listaTarefas = []; //inicio com local storage vazio

//se existe uma tarefa em local storage, pega  o item em json e muda pra array. Se não existe, adiciona a tarefa, convertendo o array em json
if(localStorage.getItem('listaTarefas')){
    listaTarefas = JSON.parse(localStorage.getItem('listaTarefas'));
} else {
    listaTarefas = []; //tem que criar uma chave em local storage
    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas)); //convertendo um array em string json. o parse faz o oposto. localStorage é um objeto pronto. Criou o espaço.
}

mostrarNaTela(listaTarefas); //executando a função

buttonAdd.onclick = function(){

    let valorDigitado = inputAdd.value;
    listaTarefas.push(valorDigitado);
    
    let tarefa = document.createElement('div'); //criando uma div
    tarefa.setAttribute('class', 'tarefa'); //colocando a classe tarefa em tarefa

    let titulo = document.createElement('div');
    titulo.setAttribute('class', 'col-md-8');
    titulo.textContent = valorDigitado;

    let buttonCheck = document.createElement('div');
    buttonCheck.setAttribute('class', 'col-md-2');

    let imgCheck = document.createElement('img');
    imgCheck.setAttribute('class', 'icon');
    imgCheck.setAttribute('src', 'img/botao1.png');

    buttonCheck.appendChild(imgCheck); //colocando dentro de buttonCheck

    tarefa.appendChild(titulo); //colocando dentro de tarefa
    tarefa.appendChild(buttonCheck);

    board.appendChild(tarefa); //colocando dentro de board

    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas)); //atualizar array com as novas informações do push

}

function mostrarNaTela(listaTarefas){
    for (let item of listaTarefas){ //1 item de listaTarefas, é como o foreach
        gerarTarefa(item);
    }
}

function gerarTarefa(valorDigitado) {

    let tarefa = document.createElement('div'); 
    tarefa.setAttribute('class', 'tarefa'); 

    let titulo = document.createElement('div');
    titulo.setAttribute('class', 'col-md-8');
    titulo.textContent = valorDigitado;

    let buttonCheck = document.createElement('div');
    buttonCheck.setAttribute('class', 'col-md-2');

    let imgCheck = document.createElement('img');
    imgCheck.setAttribute('class', 'icon');
    imgCheck.setAttribute('src', 'img/botao1.png');

    buttonCheck.appendChild(imgCheck); 
    tarefa.appendChild(titulo); 
    tarefa.appendChild(buttonCheck);
    board.appendChild(tarefa);

}