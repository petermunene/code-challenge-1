
const ramens = [
    { id: 1, name: "Shoyu Ramen", restaurant: "Ichiran", image: "../images/shoyu.jpg", rating: 5, comment: "Delicious!" },
    { id: 2, name: "Miso Ramen", restaurant: "Menya", image: "../images/miso.jpg", rating: 4, comment: "Very flavorful!" },
    { id: 3, name: "Tonkotsu Ramen", restaurant: "Ramen-ya", image: "../images/tonkotsu.jpg", rating: 3, comment: "Rich broth!" }
];
//initiates display ramens  function and setuoform function when dom loads
document.addEventListener("DOMContentLoaded", function () {
    displayRamens(); // Load ramen images
    setupForm(); // Add event listener for form submission
    setupCreateButton(); // Handle "Create New Ramen" button
});

// Function to display ramen images in #ramen-menu
function displayRamens() {
    const ramenMenu = document.getElementById("ramen-menu");
    ramenMenu.innerHTML = ""; // Clear menu before adding  the images form the ramen array
                              //it helps prevent duplication of ramen images when we reload the page 
    ramens.forEach(ramen => {
        const img = document.createElement("img");//creates an image tag for each ramen
        img.src = ramen.image;
        img.alt = ramen.name;
        img.style.width = "100px"
        img.style.height="100px"

        img.addEventListener("click", function () {
            displayRamenDetails(ramen);
        });

        ramenMenu.appendChild(img);//adds the tag into the division for the ramen-menu
    });

    if (ramens.length > 0) {
        displayRamenDetails(ramens[0]); // Show first ramen details by default
    }
}

// Function to display ramen details when clicked
function displayRamenDetails(ramen) {
    document.getElementById("ramen-name-display").textContent = ramen.name;
    document.getElementById("ramen-restaurant-display").textContent = ramen.restaurant;
    document.getElementById("ramen-rating-display").textContent = ramen.rating || "No rating";//displays no rating when no rating is passed
    document.getElementById("ramen-comment-display").textContent = ramen.comment || "No comment";//displays no comment when no comment is added

    // Update ramen image
    const detailImage = document.querySelector("#ramen-detail img");
    detailImage.src = ramen.image;
    detailImage.alt = ramen.name;
    detailImage.style.width="150px"
    detailImage.style.height="150px"

    // Populate the form fields
    document.getElementById("form-ramen-name").value = ramen.name;
    document.getElementById("form-ramen-restaurant").value = ramen.restaurant;
    document.getElementById("form-ramen-image").value = ramen.image;
    document.getElementById("form-ramen-rating").value = ramen.rating;
    document.getElementById("form-ramen-comment").value = ramen.comment;
}

// Function to handle form submission and add a new ramen
function setupForm() {
    const form = document.getElementById("ramen-form");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        const name = document.getElementById("form-ramen-name").value;
        const restaurant = document.getElementById("form-ramen-restaurant").value;
        const image = document.getElementById("form-ramen-image").value;
        const rating = document.getElementById("form-ramen-rating").value;
        const comment = document.getElementById("form-ramen-comment").value;


        // Create a new ramen object
        const newRamen = {
            id: ramens.length + 1,
            name,
            restaurant,
            image,
            rating,
            comment
        };

        // Add the new ramen to the array
        ramens.push(newRamen);

        // Updating after submision
        displayRamens();
        displayRamenDetails(newRamen);

        // Update datalists to also have the added content
        updateDatalist("ramen-options", name);
        updateDatalist("restaurant-options", restaurant);

        // Clear form
        form.reset();
    });
}

// Function to update the datalist dynamically
function updateDatalist(datalistId, newValue) {
    const datalist = document.getElementById(datalistId);
    
    // Check if the value already exists
    const options = Array.from(datalist.options).map(option => option.value);
    if (!options.includes(newValue)) {
        const newOption = document.createElement("option");
        newOption.value = newValue;
        datalist.appendChild(newOption);
    }
}



// Function to handle "Create New Ramen" button
function setupCreateButton() {
    const createButton = document.getElementById("create-new-ramen");

    createButton.addEventListener("click", function () {
        document.getElementById("ramen-form").reset(); // Clear form
    });
}