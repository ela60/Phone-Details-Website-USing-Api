

// Load All Phone
const loadAllPhone = (status, searchText) => {
    // console.log(brandName)
    // Spinner stop
    document.getElementById('spinner').style.display="none"

    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText?searchText :"iphone"}`)
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        // condition for show all buttor
        if(status){
            displayAllPhone(data.data)
        }
        else{
            displayAllPhone(data.data.slice(0,6))
        }
    })
    

    
    
}



// Display All Phone
const displayAllPhone = (phones) => {
    // Get All phones container
    const phoneContainer = document.getElementById('phones-container');

    phones.forEach(phone => {
        // Object distructuring
        const {brand,phone_name,slug,image} = phone;

        const div = document.createElement('div')
       
        div.innerHTML = `
            
            <div class="card border-2 w-96 shadow-xl ">
                <figure class=" pt-10">
                    <img src="${image}" alt="Shoes" class="rounded-xl" />
                </figure>

                <div class="card-body items-center text-center">
                    <h2 class="card-title">${brand}</h2>
                    <p>${phone_name}</p>
                    <p>${slug}</p>
                    <div class="card-actions">
                        <button onclick="phoneDetails('${slug}')" class="btn btn-primary w-80">Details</button>
                    </div>
                </div>
            </div>
        `
        phoneContainer.appendChild(div)
    });

}

// Show More button function

const handleShowAll = () => {
    loadAllPhone(true)
}


// Search items
const handleSearch = () => {
    // Add Spinner
    document.getElementById('spinner').style.display="block"

    // get input field
    const searchText =  document.getElementById('search-box').value

    setTimeout(function ()  {
        loadAllPhone(false,searchText)
    }, 2000);
    
}

// Phone details
const phoneDetails = async(slugs) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`)
    const data = await response.json()
    console.log(data.data)

    const {brand, image, slug } = data.data;

    // get modal container
    const modalContainer = document.getElementById('modal-container')
    const div = document.createElement('div')
    div.innerHTML = `

        <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box text-center overflow-x-hidden">
                <div class="w-full ml-36">
                    <img src="${image}" alt="" class=""w-full> 
                </div>
                
                <h3 class="text-lg font-bold">${brand} </h3>
                <p class="py-4">${slug}</p>
                <div class="modal-action">
                    <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog> 

    `
    modalContainer.appendChild(div)
    my_modal_5.showModal()
}


loadAllPhone(false,"iphone")