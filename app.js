// Selecting the Form Element
const generateForm = document.querySelector(".generate-form")

// Selecting the image Gallery
const imageGallery = document.querySelector(".img-gallery")
// Use openAI API to generate images based on user prompts
const OPENAI_API_KEY = "sk-4Ek0WKhHKQrPoOq-T18nOLWxAZLGb1Und3YbK8cyBET3BlbkFJFNWslSBfWQK2Y6vxtNBGZTkkn7vVq6Jqb2iWfzPtcA";

const generatAiImage = async (userPrompt, userImageQuantity) => {
    try {
        // Send a request to OpenAI API to generate image based on user inputs 
        const response = await fetch ("https://api.openai.com/v1/images/generations" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt : userPrompt ,
                n : userImageQuantity,
                size : "512x512",
                quality : "dall-e-3",
                response_format : "b64_json"

            })
        });
    } catch (error) {
        console.log(error);
        
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