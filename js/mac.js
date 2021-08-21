document.getElementById('ram8gb').addEventListener('click', transaction)
document.getElementById('ram16gb').addEventListener('click', transaction)
document.getElementById('ssd256gb').addEventListener('click', transaction)
document.getElementById('ssd500gb').addEventListener('click', transaction)
document.getElementById('ssd1tb').addEventListener('click', transaction)
document.getElementById('prime').addEventListener('click', transaction)
document.getElementById('express').addEventListener('click', transaction)
document.getElementById('promo').addEventListener('click', transaction)

function transaction(event) {
    if (event.target.id === 'promo') {
        applyPromo(event)
    }
    else {
        changeHoverAndDescription(event.target.id)
        setExtraCost(event.target.parentNode.id, event.target.id)
        updateTotal()
    }
}

function changeHoverAndDescription(element) {
    switch (element) {
        case 'ram8gb':
            document.getElementById('ram8gb').setAttribute('class', 'btn btn-sm btn-outline-dark active')
            document.getElementById('ram16gb').setAttribute('class', 'btn btn-sm btn-outline-dark')
            document.getElementById('listItemRam').textContent = '8GB'
            break
        case 'ram16gb':
            document.getElementById('ram8gb').setAttribute('class', 'btn btn-sm btn-outline-dark')
            document.getElementById('ram16gb').setAttribute('class', 'btn btn-sm btn-outline-dark active')
            document.getElementById('listItemRam').textContent = '16GB'
            break
        case 'ssd256gb':
            document.getElementById('ssd256gb').setAttribute('class', 'btn btn-sm btn-outline-dark active')
            document.getElementById('ssd500gb').setAttribute('class', 'btn btn-sm btn-outline-dark')
            document.getElementById('ssd1tb').setAttribute('class', 'btn btn-sm btn-outline-dark')
            document.getElementById('listItemSsd').textContent = '256GB'
            break
        case 'ssd500gb':
            document.getElementById('ssd256gb').setAttribute('class', 'btn btn-sm btn-outline-dark')
            document.getElementById('ssd500gb').setAttribute('class', 'btn btn-sm btn-outline-dark active')
            document.getElementById('ssd1tb').setAttribute('class', 'btn btn-sm btn-outline-dark')
            document.getElementById('listItemSsd').textContent = '500GB'
            break
        case 'ssd1tb':
            document.getElementById('ssd256gb').setAttribute('class', 'btn btn-sm btn-outline-dark')
            document.getElementById('ssd500gb').setAttribute('class', 'btn btn-sm btn-outline-dark')
            document.getElementById('ssd1tb').setAttribute('class', 'btn btn-sm btn-outline-dark active')
            document.getElementById('listItemSsd').textContent = '1Tera Byte'
            break
        case 'prime':
            document.getElementById('prime').setAttribute('class', 'btn btn-sm btn-outline-dark active')
            document.getElementById('express').setAttribute('class', 'btn btn-sm btn-outline-dark ')
            break
        case 'express':
            document.getElementById('prime').setAttribute('class', 'btn btn-sm btn-outline-dark')
            document.getElementById('express').setAttribute('class', 'btn btn-sm btn-outline-dark active')
            break
    }
}

function setExtraCost(parent, element) {
    let extraPrice = 0
    switch (element) {
        case 'ram16gb':
            extraPrice = 180
            break
        case 'ssd500gb':
            extraPrice = 100
            break
        case 'ssd1tb':
            extraPrice = 180
            break
        case 'express':
            extraPrice = 20
            break
    }
    document.getElementById(parent + 'ExtraCost').innerText = extraPrice
}

function updateTotal() {
    const elementBasePrice = document.getElementById('basePrice')
    const elementMemoryExtraCost = document.getElementById('memoryExtraCost')
    const elementStorageExtraCost = document.getElementById('storageExtraCost')
    const elementDeliveryExtraCost = document.getElementById('deliveryExtraCost')
    const elementTotalPrice = document.getElementById('totalPrice')
    const elementTotalFinal = document.getElementById('totalFinal')

    const basePrice = Number(elementBasePrice.textContent)
    const memoryExtraCost = Number(elementMemoryExtraCost.textContent)
    const storageExtraCost = Number(elementStorageExtraCost.textContent)
    const deliveryExtraCost = Number(elementDeliveryExtraCost.textContent)
    const totalPrice = Number(elementTotalPrice.textContent)
    let totalFinal = Number(elementTotalFinal.textContent)

    elementTotalPrice.innerText = basePrice + memoryExtraCost + storageExtraCost + deliveryExtraCost
    elementTotalFinal.innerText = elementTotalPrice.innerText
}

function applyPromo(e) {
    if (e.target.previousElementSibling.value === 'stevekaku') {
        const elementTotalPrice = document.getElementById('totalPrice')
        const elementTotalFinal = document.getElementById('totalFinal')
        const totalPrice = Number(elementTotalPrice.textContent)

        discountPrice = Math.round(totalPrice * 0.2)
        elementTotalFinal.innerText = totalPrice - discountPrice
        e.target.previousElementSibling.value = ''
    }
    else {
        alert('Promo Code Expired or Invalid')
        e.target.previousElementSibling.value = ''
    }
}