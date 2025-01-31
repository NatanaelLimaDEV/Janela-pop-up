const jan = document.getElementById('janela')
const buttonAdd = document.querySelector('button.add-cart')
const menu = document.getElementById('menu')
const itens = document.getElementById('itens')
const totalDiv = document.getElementById('total')
const totalBtCarrinho = document.getElementById('total-carrinho')
const contCart = document.getElementById('quant-cart')
const endereco = document.getElementById('end')
const endNum = document.getElementById('num')
const endComp = document.getElementById('comp')
const endRef = document.getElementById('ref')
const endBairro = document.getElementById('bairro')
const formEnd = document.getElementById('formEndereco')
const erroEnd = document.querySelector('p.erro')
const formPag = document.getElementById('formPag')
const spanHora = document.getElementById('data-span')
const janInfoNegocio = document.getElementById('janela-info-negocio')

const aberto = veriRestoHora()

let cart = []

function abrirInfoNegocio() {
    janInfoNegocio.style.display = 'flex'
}

function abrirJanela() {

    if (cart.length === 0) {
        Toastify({
            text: "Ops o carrinho está vazio!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
        }).showToast()
    } else {
        updateCart()
        jan.style.display = 'flex'
    }
}

function fecharJanela() {
    jan.style.display = 'none'
    janInfoNegocio.style.display = 'none'
}

// fechando janela ao clicar na parte transparente
jan.addEventListener('click', (event) => {
    if (event.target === jan) {
        jan.style.display = 'none'
    }
})

janInfoNegocio.addEventListener('click', (event) => {
    if (event.target === janInfoNegocio) {
        janInfoNegocio.style.display = 'none'
    }
})

// Evento click para adicionar ao carrinho, pegando nome e preço
menu.addEventListener('click', (event) => {
    const parentButton = event.target.closest('.add-cart')

    if (parentButton) {
        const nome = parentButton.getAttribute('data-name')
        const preco = Number.parseFloat(parentButton.getAttribute('data-preco'))
        addCard(nome, preco)
    }
})

// Adicionar ao carrinho
function addCard(nome, preco) {
    const verifiItem = cart.find(item => item.nome === nome)

    // Se o item já existe, aumenta apenas a quantidade + 1
    if (verifiItem) {
        verifiItem.quantidade++
    } else {
        cart.push({
            nome,
            preco,
            quantidade: 1,
        })
    }

    Toastify({
        text: "Item adicionado ao carrinho!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "rgb(48, 51, 60)",
        },
    }).showToast()

    updateCart()
}

// Atualiza o carrinho
function updateCart() {
    itens.innerHTML = ''

    let total = 0

    // biome-ignore lint/complexity/noForEach: <explanation>
    cart.forEach(item => {
        const cartItens = document.createElement('div')

        cartItens.innerHTML = `
        <div class="cardItensList">
            <div class="itensList">
                <img src="imagens/hamb-1.png" alt="Smash" class="burguer-listCard">
                <div>
                    <p>${item.nome}</p>
                    <p class="desc-hamb">Quantidade: ${item.quantidade}</p>
                    <p>R$ ${item.preco.toFixed(2)}</p>
                </div>
            </div>

            <div class="btn-itensList">
                <button class="button-rem" data-name="${item.nome}">
                    <span class="material-symbols-outlined">
                    remove
                    </span>
                </button>
                <button class="button-add"  data-name="${item.nome}" data-preco="${item.preco}">
                    <span class="material-symbols-outlined">
                    add
                    </span>
                </button>
            </div>
        </div>
        `

        itens.appendChild(cartItens)

        total += item.preco * item.quantidade

        totalDiv.textContent = total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        totalBtCarrinho.textContent = total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        contCart.style.display = 'flex'
        contCart.innerHTML = cart.length
    })
}

//Evento click para remover item do carrinho
itens.addEventListener('click', () => {
    const parentButton = event.target.closest('.button-rem')

    if (parentButton) {
        const nome = parentButton.getAttribute('data-name')

        removeItemCart(nome)
    }
})

//adicinar mais um item do carrinho
itens.addEventListener('click', () => {
    const parentButton = event.target.closest('.button-add')

    if (parentButton) {
        const nome = parentButton.getAttribute('data-name')
        const preco = parentButton.getAttribute('data-preco')

        addCard(nome, preco)
    }
})

// Remover item do carrinho
function removeItemCart(nome) {
    const index = cart.findIndex(item => item.nome === nome)

    if (index !== -1) {
        const item = cart[index]

        if (item.quantidade > 1) {
            Toastify({
                text: "Item removido do carrinho!",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#ef4444",
                },
            }).showToast()

            item.quantidade--

            updateCart()
            return
        }

        cart.splice(index, 1)

        updateCart()
    }

    if (cart.length === 0) {
        fecharJanela()
        contCart.style.display = 'none'
        totalBtCarrinho.textContent = ''
    }

    Toastify({
        text: "Item removido do carrinho!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#ef4444",
        },
    }).showToast()
}

// Abrir formulario de endereço
function addEndereco(){
    if(formEnd.style.display === 'flex'){
        formEnd.style.display = 'none'
    } else{
        formEnd.style.display = 'flex'
    }
}

// Validar campos obrigatórios
endereco.addEventListener('input', (event) => {
    const endValor = event.target.value

    if (endValor !== "") {
        erroEnd.style.display = 'none'
        endereco.style.borderColor = '#b8b8b8'
    }
})
endNum.addEventListener('input', (event) => {
    const endValor = event.target.value

    if (endValor !== "") {
        erroEnd.style.display = 'none'
        endNum.style.borderColor = '#b8b8b8'
    }
})
endBairro.addEventListener('input', (event) => {
    const endValor = event.target.value

    if (endValor !== "") {
        erroEnd.style.display = 'none'
        endBairro.style.borderColor = '#b8b8b8'
    }
})

// Finalizar pedido
function finalizarPedido() {

    const aberto = veriRestoHora()
    if (!aberto) {
        Toastify({
            text: "Ops o restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
        }).showToast()
        return
    }

    if (cart.length === 0) return

    if (endereco.value === "" && endNum.value === "" && endBairro.value === ""){
        Toastify({
            text: "Adicione um endereço!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
        }).showToast()

        if(formEnd.style.display !== 'flex'){
            formEnd.style.display = 'flex'
        }

        return
    }

    if (endereco.value === "" || endNum.value === "" || endBairro.value === "" || formPag.value === "") {

        if (endereco.value === "") {
            erroEnd.style.display = 'flex'
            endereco.style.borderColor = '#a50000'
        }
        if (endNum.value === "") {
            erroEnd.style.display = 'flex'
            endNum.style.borderColor = '#a50000'
        }
        if (endBairro.value === "") {
            erroEnd.style.display = 'flex'
            endBairro.style.borderColor = '#a50000'
        }
        if (formPag.value === "") {
            Toastify({
                text: "Selecione uma forma de pagamento!",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#ef4444",
                },
            }).showToast()
        }

        return
    }

    // Enviar o pedido api WhatsApp
    const itemNomeQuant = cart.map((item) => {
        return (
            ` -> ${item.nome}, Quantidade: ${item.quantidade}`
        )
    }).join('')
    const itemPreco = cart.map((item) => {
        return (
            `Preço: R$ ${item.preco}`
        )
    }).join('')

    const mensagemNomeQuant = encodeURIComponent(itemNomeQuant)
    const mensagemPreco = encodeURIComponent(itemPreco)
    const fone = "+5588997458919"

    window.open(`https://wa.me/${fone}?text=${mensagemNomeQuant}%0A ${mensagemPreco}%0A %0A Rua: ${endereco.value}%0A Número: ${endNum.value}%0A Complemento: ${endComp.value}%0A Ponto de referência: ${endRef.value}%0A Bairro: ${endBairro.value} %0A %0A Forma de pagamento: ${formPag.value}`, '_blank')

    cart = []
    updateCart()

    if(formEnd.style.display === 'flex'){
        formEnd.style.display = 'none'
    }
    fecharJanela()
    contCart.innerHTML = cart.length
    endereco.value = ""
    endNum.value = ""
    endComp.value = ""
    endRef.value = ""
    endBairro.value = ""
    formPag.value = ""
    contCart.style.display = 'none'
    totalBtCarrinho.textContent = ''
}

// Verificar horário
function veriRestoHora() {
    const data = new Date()
    const hora = data.getHours()
    return hora >= 1 && hora < 22

    // True = aberto
}

if (aberto) {
    spanHora.style.color = '#005f00'
    spanHora.innerHTML += 'Aberto'
} else {
    spanHora.style.color = '#5f0000'
    spanHora.innerHTML += 'Fechado'
}