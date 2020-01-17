let board = document.getElementById('board');
let buttonAdd = document.getElementById('add');
let inputAdd = document.getElementById('novaTarefa');
let listaTarefas = []; //inicio com local storage vazio

//se existe uma tarefa em local storage, pega  o item em json e muda pra array. Se não existe, adiciona a tarefa, convertendo o array em json
if(localStorage.getItem('listaTarefas')){
    listaTarefas = JSON.parse(localStorage.getItem('listaTarefas')); //passa um json e converte em array ou objeto do js
} else {
    listaTarefas = []; //tem que criar uma chave em local storage
    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas)); //convertendo um array em string json. o parse faz o oposto. localStorage é um objeto pronto. Criou o espaço.
}

mostrarNaTela(listaTarefas); //executando a função que recebe uma lista de tarefas

buttonAdd.onclick = function(){

    let valorDigitado = inputAdd.value;
    listaTarefas.push(valorDigitado);
    gerarTarefa(valorDigitado, listaTarefas.length -1); //executando a função, criando uma tarefa nova com a posição dela dentro do array - na hora do push, vai sempre pra última posição, por isso o lenght -1.

    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas)); //atualizar array com as novas informações do push

}

function mostrarNaTela(listaTarefas){

    board.innerHTML = ""; // o innerHTML substitui o que está no html pelo valor que declaramos depois, nesse caso, " " = vazio

    listaTarefas.forEach(function(valor, posicao){ //função anônima dentro do foreach - para cada item do array, vou executar uma função específica. Primeiro parâmetro é sempre o valor e segundo é sempre a posição no array. Valor é o valorDigitado
        gerarTarefa(valor, posicao);
    })


    // opção de foreach do js
    // for (let item of listaTarefas){ 1 item de listaTarefas, é como o foreach
    //     gerarTarefa(item);
    // }
}

function gerarTarefa(valorDigitado, posicao) { //tenho que dizer, alem do valor digitado, a posicao da tarefa criada para ela poder ser localizada no array

    let tarefa = document.createElement('div'); //criando uma div
    tarefa.setAttribute('class', 'tarefa'); //colocando a classe tarefa em tarefa
    tarefa.setAttribute('posicao', posicao); //criando um atributo novo para a tarefa com o valor posicao para definir uma posição no array listaTarefas.

    let titulo = document.createElement('div');
    titulo.setAttribute('class', 'col-md-8');
    titulo.textContent = valorDigitado;

    let buttonCheck = document.createElement('div');
    buttonCheck.setAttribute('class', 'col-md-2');

    let imgCheck = document.createElement('img');
    imgCheck.setAttribute('class', 'icon');
    imgCheck.setAttribute('src', 'img/botao1.png');

    buttonCheck.appendChild(imgCheck); //colocando dentro de buttonCheck

    imgCheck.onclick = function(event){ //clicando na imagem. Qual botão foi usado? - event.target. É um evento dentro de  outro. Quando cria o evento novo de tarefa, ele cria junto o evento de clicar na imagem e sumir a tarefa.
        
        let posicaoTarefa = tarefa.getAttribute('posicao'); //pegando o atributo posicao
        // listaTarefas.splice(posicaoTarefa); splice remove uma posição no array e te devolve ele mesmo. Não é o que queremos. Queremos excluir um item do array.
        listaTarefas = listaTarefas.filter(function(valor, posicao){
            return posicao != posicaoTarefa; //só vai ficar aquilo que não foi clicado para ser apagado

        });

        mostrarNaTela(listaTarefas);
        localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas)); //salvando no array
        tarefa.remove();

        // let tarefaSelecionada = event.target.parentNode.parentNode;
        //parentNode - seleciona o pai do botão que foi clicado. Poderia ser direto na tarefa.remove().
        // tarefaSelecionada.remove();

        //console.log(event.target.parentNode.parentNode); 
    } 

    tarefa.appendChild(titulo); //colocando dentro de tarefa
    tarefa.appendChild(buttonCheck);
    board.appendChild(tarefa); //colocando dentro de board

}


