// Selecting the Form Element
const generateForm = document.querySelector(".generate-form")

// Selecting the image Gallery
const imageGallery = document.querySelector(".img-gallery")
// Use openAI API to generate images based on user prompts
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;


const generatAiImage = async (userPrompt, userImageQuantity) => {
    try {
        // Send a request to OpenAI API to generate image based on user inputs 
        const response = await fetch ("https://api.openai.com/v1/images/generations" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt : userPrompt ,
                n : parseInt(userImageQuantity),
                size : "512x512",
                quality : "dall-e-3",
                response_format : "b64_json"

            })
        });
        if (!response.ok) throw new Error("Failed to generate image ! Please try again.");
        
        // Get data from response
        const {data} = await response.json();
        
        
    } catch (error) {
        alert(error.message);
    }
}



// Defining the Event Handler
const handleFormSubmission = (e) =>{
    e.preventDefault()
    // console.log(e.srcElement);

// Get user input and image quantity values from the form
    const userPrompt = e.srcElement[0].value;
    const userImageQuantity = e.srcElement[1].value;
    // console.log(userPrompt , userImageQuantity);
   
// Create HTML  markup for image card with loading state  
    const imgCardMarkup = Array.from({length:userImageQuantity}, () =>
        `<div class="img-card loading">
                <img src="images/loader.svg" alt="img">
                <a href="#" class="download-btn">
                    <img src="images/download.svg" alt="download-icon">
                </a>
        </div>`
    ).join("");
    // console.log(imgCardMarkup);


// insert HTML markup into image Gallery
    imageGallery.innerHTML = imgCardMarkup;

// generate AI image from user prompt
    generatAiImage(userPrompt, userImageQuantity);
    
}
// Adding the Event Listener
generateForm.addEventListener("submit", handleFormSubmission);