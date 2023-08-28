let notifier = document.querySelector('.notifier')
let canGenerate = true

async function generateImage(prompt, negativePrompt) {
    if (!canGenerate) return
    if (document.querySelector('a')) document.querySelector('a').remove()
    canGenerate = false
    document.querySelector('.img-generated img').style= 'display: none'
    notifier.textContent = 'Generating, Please wait...'
    const response = await fetch('https://api-inference.huggingface.co/models/dreamlike-art/dreamlike-anime-1.0',
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer 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"
            },
            body: JSON.stringify({ inputs: prompt, negative_prompt: negativePrompt})
        })

    if (response.ok) {
        canGenerate = true
        const blob = await response.blob()
        const imgUrl = URL.createObjectURL(blob)

        const img = document.createElement('img')
        img.src = imgUrl
        document.querySelector('.img-generated img').src = imgUrl
        document.querySelector('.img-generated img').style= 'display: block'
        notifier.textContent = ''

        const downloadImage = document.querySelector(".img-generated img");
        const downloadButton = document.querySelector(".download-button");
        const downloadLink = document.createElement("a");

        downloadLink.setAttribute("id", "downloadLink");
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadButton.addEventListener("click", () => {
            const imageURL = downloadImage.src;
            const fileName = "ai_generated.jpg";

            downloadLink.href = imageURL;
            downloadLink.download = fileName;

            downloadLink.click();
        });

    } else if (!response.ok) {
        canGenerate = true
        notifier.textContent = 'Image Failed to Generate.'
    }
}

document.querySelector('.generate-img').addEventListener('click', () => {
    generateImage(document.querySelector('.prompt').value, document.querySelector('.negative-prompt').value)
})