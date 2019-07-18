import {Sign} from './slideshow.js'

document.addEventListener('DOMContentLoaded', async function() {
    let response = await fetch('http://localhost:59979/kodiak/DigitalSignageMaster/Signage/GetSigns', {})
    let signs = await response.json()
    let slides = []
    signs.forEach((sign, index) => {
        if(sign.Name.split('.').pop() == 'mp4') {
            sign.type = 'video'
        } else {
            sign.type = 'image'
        }
        slides.push({
                media: `http://bvweb01:808/Resources/Videos/${sign.Name}`,
                type: sign.type,
                duration: sign.Duration,
                transition: 'fadeIn'
        })
    })
    
    let sign = new Sign('digital-sign', {transition: 'rollIn', slides: slides})
    sign.start()
})