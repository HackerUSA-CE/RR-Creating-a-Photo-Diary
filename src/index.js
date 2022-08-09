import koalas from "./koalas";

let activeKoala = null

// Changes the active koala, then re-renders the page to display that koala
let selectKoala = koala => {
    activeKoala = koala
    render()
}

// Called once when the page loads, and again every time a koala is selected
let render = () => {
    let oldPage=  document.querySelector('.koala-container')
    let newPage;
    if(activeKoala){
        newPage = renderActiveKoala(activeKoala)
    } else {
        newPage = renderKoalaList(koalas)
    }
    newPage.classList.add('koala-container')
    oldPage.replaceWith(newPage)
}


// Renders a list of koalas
let renderKoalaList = koalas => {
    let koalaContainer = document.createElement('div')

    koalaContainer.setAttribute('class', 'ui items')

    koalas.forEach( koala => {
        let koalaCard = renderKoalaCard(koala)
        koalaContainer.append(koalaCard)
    })

    return koalaContainer
}

// Renders a card to display a single koala
let renderKoalaCard = koala => {
    let koalaCard = document.createElement('div')
    koalaCard.setAttribute('class', 'item')
    koalaCard.style.cursor = 'pointer';
    koalaCard.addEventListener('click', () => {
        selectKoala(koala)
    })

    let koalaImage = renderKoalaCardImage(koala)
    let koalaContent = renderKoalaCardContent(koala)

    koalaCard.append(
        koalaImage,
        koalaContent
    )

    return koalaCard
}

// Renders the image of a koala card
let renderKoalaCardImage = koala => {
    let imageContainer = document.createElement('div')
    let koalaImage = document.createElement('img')

    imageContainer.setAttribute('class', 'image')

    koalaImage.setAttribute('src', koala.imageURL)

    imageContainer.append(koalaImage)

    return imageContainer
}

// Renders the content of a koala card (their name and description)
let renderKoalaCardContent = koala => {
    let koalaContent = document.createElement('div')
    koalaContent.setAttribute('class', 'content')

    let header = document.createElement('div')
    header.setAttribute('class', 'header')
    header.append(koala.name)

    let descriptionParagraph = document.createElement('p')
    descriptionParagraph.append(koala.description)

    let descriptionContainer = document.createElement('div')
    descriptionContainer.setAttribute('class', 'description')
    descriptionContainer.append(descriptionParagraph)

    koalaContent.append(
        header,
        descriptionContainer
    )

    return koalaContent
}

// Renders a big image of a selected koala
let renderActiveKoala = koala => {
    let activeKoalaContainer = document.createElement('div')
    let backButton = document.createElement('button')
    let backIcon = document.createElement('i')
    let activeKoalaImage = document.createElement('img')

    backButton.setAttribute('class', 'ui left labeled icon button')

    backIcon.setAttribute('class', 'left arrow icon')

    activeKoalaImage.setAttribute('class', 'ui rounded fluid image')

    activeKoalaImage.setAttribute('src', koala.imageURL)

    backButton.append(
        backIcon,
        'Back'
    )

    backButton.addEventListener('click', () => {
        selectKoala(null)
    })

    activeKoalaContainer.append(
        backButton,
        activeKoalaImage
    )

    return activeKoalaContainer
}

// Render the page after all functions are defined
render()