let jan = document.getElementById('janela')
let buttonAdd = document.querySelector('button.add-cart')
let menu = document.getElementById('menu')
let itens = document.getElementById('itens')
let totalDiv = document.getElementById('total')
let totalBtCarrinho = document.getElementById('total-carrinho')
let contCart = document.getElementById('quant-cart')
let endereco = document.getElementById('end')
let erroEnd = document.querySelector('p.erro')
let spanHora = document.getElementById('data-span')
let janInfoNegocio = document.getElementById('janela-info-negocio')

let aberto = veriRestoHora()

let cart = []

function abrirInfoNegocio(){
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
jan.addEventListener('click', function (event) {
    if (event.target === jan) {
        jan.style.display = 'none'
    }
})

janInfoNegocio.addEventListener('click', function (event) {
    if (event.target === janInfoNegocio) {
        janInfoNegocio.style.display = 'none'
    }
})

// Evento click para adicionar ao carrinho, pegando nome e preço
menu.addEventListener('click', function (event) {
    let parentButton = event.target.closest('.add-cart')

    if (parentButton) {
        let nome = parentButton.getAttribute('data-name')
        let preco = parseFloat(parentButton.getAttribute('data-preco'))
        addCard(nome, preco)
    }
})

// Adicionar ao carrinho
function addCard(nome, preco) {
    let verifiItem = cart.find(item => item.nome === nome)

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

    cart.forEach(item => {
        let cartItens = document.createElement('div')

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
itens.addEventListener('click', function () {
    let parentButton = event.target.closest('.button-rem')

    if (parentButton) {
        let nome = parentButton.getAttribute('data-name')

        removeItemCart(nome)
    }
})

//adicinar mais um item do carrinho
itens.addEventListener('click', function () {
    let parentButton = event.target.closest('.button-add')

    if (parentButton) {
        let nome = parentButton.getAttribute('data-name')
        let preco = parentButton.getAttribute('data-preco')

        addCard(nome, preco)
    }
})

// Remover item do carrinho
function removeItemCart(nome) {
    let index = cart.findIndex(item => item.nome === nome)

    if (index !== -1) {
        let item = cart[index]

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


// Finalizar pedido
endereco.addEventListener('input', function (event) {
    let endValor = event.target.value

    if (endValor !== "") {
        erroEnd.style.display = 'none'
        endereco.style.borderColor = '#b8b8b8'
    }
})

function finalizarPedido() {

    let aberto = veriRestoHora()
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

    if (endereco.value === "") {
        erroEnd.style.display = 'flex'
        endereco.style.borderColor = '#a50000'
        return
    }

    // Enviar o pedido api WhatsApp
    let cartList = cart.map((item) => {
        return (
            ` ${item.nome}, Quantidade: (${item.quantidade}) Preço: R$ ${item.preco} /`
        )
    }).join('')

    let mensagem = encodeURIComponent(cartList)
    let fone = "88997458919"

    window.open(`https://wa.me/${fone}?text=${mensagem} Endereço: ${endereco.value}`, '_blank')

    cart = []
    updateCart()

    fecharJanela()
    contCart.innerHTML = cart.length
    endereco.value = ""
}

// Verificar horário
function veriRestoHora() {
    let data = new Date()
    let hora = data.getHours()
    return hora >= 18 && hora < 22

    // True = aberto
}

if (aberto) {
    spanHora.style.color = '#005f00'
    spanHora.innerHTML += 'Aberto'
} else {
    spanHora.style.color = '#5f0000'
    spanHora.innerHTML += 'Fechado'
}