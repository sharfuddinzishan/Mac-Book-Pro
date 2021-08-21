document.getElementById('ram-8gb').addEventListener('click', transaction)
document.getElementById('ram-16gb').addEventListener('click', transaction)
document.getElementById('ssd-256gb').addEventListener('click', transaction)
document.getElementById('ssd-500gb').addEventListener('click', transaction)
document.getElementById('ssd-1tb').addEventListener('click', transaction)
document.getElementById('prime').addEventListener('click', transaction)
document.getElementById('express').addEventListener('click', transaction)
document.getElementById('promo').addEventListener('click', transaction)

// Transaction Common Function For All Event
function transaction(event) {
    // where was the click
    const triggerElement = event.target
    // find parent of triggered event
    const triggerParent = event.target.parentNode
    // If Promo Code Applied
    if (triggerElement.id === 'promo') {
        applyPromo(triggerElement)
    }
    else {
        changeHoverAndDescription(triggerParent.id, triggerElement.id)
        setExtraCost(triggerParent.id, triggerElement.id)
        updateTotal()
    }
}

// Promo Handling 
function applyPromo(event) {
    // checked 20% Promo Code 'stevekaku' typed or not
    if (event.previousElementSibling.value === 'stevekaku') {
        // Get Total Price and Price Element 
        const elementTotalPrice = document.getElementById('totalPrice')
        const elementTotalFinal = document.getElementById('totalFinal')
        // Get Total Price as Number type 
        const totalPrice = Number(elementTotalPrice.textContent)
        // Calculate Discount of 20 %
        discountPrice = Math.round(totalPrice * 0.2)
        // Subtracte Discount from total price and applied
        elementTotalFinal.innerText = totalPrice - discountPrice
        // Clear the Promo Input Field 
        event.previousElementSibling.value = ''
    }
    else {
        // alert('Promo Code Expired or Invalid')
        // Clear the Promo Input Field 
        event.previousElementSibling.value = ''
    }
}

// Change Button Active State
// Change text of list item in Product Description 
function changeHoverAndDescription(parent, element) {
    // Get All Buttons Under Parent
    const getCustomizeButtons = document.querySelector('#' + parent).getElementsByTagName('button')

    for (let singleNode of getCustomizeButtons) {
        // Add class active when active event element found 
        if (singleNode.id === element) {
            singleNode.classList.toggle('active')
        }
        else {
            singleNode.classList.remove('active')
        }
    }
    /*Checked ParentNode is not delivery, as no list item included
     for delivery section buttons */
    if (parent !== 'delivery') {
        // Set Contents by Convert To Uppercase Letters 
        document.getElementById('list' + parent).innerText = element.toUpperCase()
    }
}

// Set individual price for changed configuration 
function setExtraCost(parent, element) {
    // set default price zero as base price included 8GB Ram and 256gb SSD and Prime Delivery 
    let extraPrice = 0
    switch (element) {
        case 'ram-16gb':
            extraPrice = 180
            break
        case 'ssd-500gb':
            extraPrice = 100
            break
        case 'ssd-1tb':
            extraPrice = 180
            break
        case 'express':
            extraPrice = 20
            break
    }
    // Set Extra Cost
    document.getElementById(parent + 'ExtraCost').innerText = extraPrice
}

// Get All Amount and Update Total 
function updateTotal() {
    // Get All Price/Amount Elements 
    const gets = getElements()
    // Get Input as number type 
    const basePrice = Number(gets.basePrice.textContent)
    const memoryExtraCost = Number(gets.memoryExtraCost.textContent)
    const storageExtraCost = Number(gets.storageExtraCost.textContent)
    const deliveryExtraCost = Number(gets.deliveryExtraCost.textContent)
    const totalPrice = Number(gets.totalPrice.textContent)

    // Set Total Price Without Coupon
    gets.totalPrice.innerText = basePrice + memoryExtraCost + storageExtraCost + deliveryExtraCost
    // Set Total with discount on valid coupon
    gets.totalFinal.innerText = gets.totalPrice.innerText
}

function getElements() {
    const gets =
    {
        basePrice: document.getElementById('basePrice'),
        memoryExtraCost: document.getElementById('memoryExtraCost'),
        storageExtraCost: document.getElementById('storageExtraCost'),
        deliveryExtraCost: document.getElementById('deliveryExtraCost'),
        totalPrice: document.getElementById('totalPrice'),
        totalFinal: document.getElementById('totalFinal'),
    }
    return gets
}
