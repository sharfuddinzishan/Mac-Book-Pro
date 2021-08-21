document.getElementById('ram-8gb').addEventListener('click', transaction)
document.getElementById('ram-16gb').addEventListener('click', transaction)
document.getElementById('ssd-256gb').addEventListener('click', transaction)
document.getElementById('ssd-512gb').addEventListener('click', transaction)
document.getElementById('ssd-1tb').addEventListener('click', transaction)
document.getElementById('prime').addEventListener('click', transaction)
document.getElementById('express').addEventListener('click', transaction)
document.getElementById('promo').addEventListener('click', transaction)
document.getElementById('image1').addEventListener('click', imageChange)
document.getElementById('image2').addEventListener('click', imageChange)
document.getElementById('image3').addEventListener('click', imageChange)

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
    const trigerPreviousElement = event.previousElementSibling
    const trigerPreviousValue = trigerPreviousElement.value.toLowerCase()
    // Hard Coded Promo COde As Fixed and Specified Per Requirement 
    const promoCode = 'stevekaku'
    // checked 20% Promo Code 'stevekaku' typed or not
    if (trigerPreviousValue === promoCode) {
        // Get Total Price and Price Element 
        const elementTotalPrice = document.getElementById('totalPrice')
        const elementTotalFinal = document.getElementById('totalFinal')

        // Get Total Price as Number type 
        const totalPrice = Number(elementTotalPrice.textContent)
        // Calculate Discount of 20 %
        discountPrice = (totalPrice * 0.2).toFixed(0)
        // Subtracte Discount from total price and applied
        elementTotalFinal.innerText = totalPrice - discountPrice
        // Promo Warning message For Invalid COde 
        document.getElementById('promoWarning').classList.add('d-none')
        document.getElementById('promoWarning').classList.remove('d-block')
        // Clear the Promo Input Field 
        trigerPreviousElement.value = ''
    }
    else {
        // alert('Promo Code Expired or Invalid')
        document.getElementById('promoWarning').classList.add('d-block')
        document.getElementById('promoWarning').classList.remove('d-none')
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
        case 'ssd-512gb':
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
    // Hard Coded As Base Price Fixed
    const basePrice = 1299
    const memoryExtraCost = Number(gets.memoryExtraCost.textContent)
    const storageExtraCost = Number(gets.storageExtraCost.textContent)
    const deliveryExtraCost = Number(gets.deliveryExtraCost.textContent)
    const totalPrice = Number(gets.totalPrice.textContent)

    // Set Total Price Without Coupon
    gets.totalPrice.innerText = basePrice + memoryExtraCost + storageExtraCost + deliveryExtraCost
    // Set Total with discount on valid coupon
    gets.totalFinal.innerText = gets.totalPrice.innerText
}

// Get All Elements 
function getElements() {
    const gets =
    {
        memoryExtraCost: document.getElementById('memoryExtraCost'),
        storageExtraCost: document.getElementById('storageExtraCost'),
        deliveryExtraCost: document.getElementById('deliveryExtraCost'),
        totalPrice: document.getElementById('totalPrice'),
        totalFinal: document.getElementById('totalFinal'),
    }
    return gets
}

// Change Image onclick 
function imageChange(event) {
    const getImageUrl = 'images/' + event.target.id + '.png'
    document.getElementById('macImage').setAttribute('src', getImageUrl)
}
