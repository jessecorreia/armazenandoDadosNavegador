// Operador lógico que retorna com dados salvos, ou string vazia, utilizando localStorage.getItem, modificando o valor de `string` com JSON.parse()


const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página

itens.forEach ( (elemento) => {
criaElemento (elemento)
} )

// Refatoração do addEventListener para receber as funções extras da função criaElemento
    
    //aguarda o usuario clicar no botao para cadastrar
    form.addEventListener("submit", (evento) => {
        // linha abaixo para nao recarregar a pagina instantaneamente
        evento.preventDefault()
    
        const nome =  evento.target.elements['nome']
        const quantidade = evento.target.elements['quantidade']

//  Const para conferir elemento nome no array itens 

        const existe = itens.find( elemento => elemento.nome === nome.value )

        const itemAtual = {
            "nome": nome.value,
            "quantidade": quantidade.value
        }

// Condicional para conferir se o elemento tem no array
        
        if (existe) {
            itemAtual.id = existe.id
            
            atualizaElemento(itemAtual)
    
            itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual 

        } else {
            itemAtual.id = itens[itens.length -1] ? (itens[itens.length - 1]).id + 1 : 0
    
            criaElemento(itemAtual)
            // para adicionar objeto no array
            itens.push(itemAtual)
        }

        
    
        // salvar no localstorage (transformando em string )
        localStorage.setItem("itens", JSON.stringify(itens))

        nome.value = ""
        quantidade.value = ""
    })

// Refatoração da função `criaElemento` para que possua apenas a função que faça sentido ao nome.

    function criaElemento(item) {

    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta())

    lista.appendChild(novoItem)

}

// atualizando itens já existentes
    function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

// adicionando o botao de delete e fazendo a remoção do item 
    function botaoDeleta(){
        const elementoBotao = document.createElement("button")
        elementoBotao.innerHTML = "X"    

        elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode)
        })

        return elementoBotao
    }

    function deletaElemento(tag, id) {
        tag.remove()

        itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

        localStorage.setItem("itens", JSON.stringify(itens))

    }