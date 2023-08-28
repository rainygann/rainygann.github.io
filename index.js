let notifier = document.querySelector('.notifier')
let canGenerate = true

async function generateImage(prompt, negativePrompt) {
    if (!canGenerate) return
    canGenerate = false
    document.querySelector('.img-generated img').style= 'display: none'
    notifier.textContent = 'Generating, Please wait...'
    const response = await fetch('https://api-inference.huggingface.co/models/Ojimi/anime-kawai-diffusion',
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
    } else if (!response.ok) {
        canGenerate = true
        notifier.textContent = 'Image Failed to Generate.'
    }
}

document.querySelector('.generate-img').addEventListener('click', () => {
    generateImage(document.querySelector('.prompt').value, document.querySelector('.negative-prompt').value)
})
