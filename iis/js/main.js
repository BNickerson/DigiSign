import {Sign} from './slideshow.js'

document.addEventListener('DOMContentLoaded', async function() {
    let response = await fetch('http://bvwebtest01:8888/api/kodiak/DigitalSignageMaster/Signage/GetSigns', {});
    let signs = await response.json();
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
                transition: 'rollIn'
        })
    });
    
    let sign = new Sign('digital-sign', {transition: 'rollIn', slides: slides})
    // sign.start()

    // let slides2 = [
    //     {
    //         media: 'http://localhost:3000/media/menu.mp4',
    //         type: 'video',
    //         transition: 'fadeIn'
    //     }
    // ]

    // let sign2 = new Sign('digital-sign2', {transition: 'flipInX', slides: slides2})
    // sign2.start()
})