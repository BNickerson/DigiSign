import {Sign} from './slideshow.js'

document.addEventListener('DOMContentLoaded', async function() {
    // let response = await fetch('http://bvwebtest01:8888/api/kodiak/DigitalSignageMaster/Signage/GetSigns', {})
    // let signs = await response.json()
    // let slides = []
    // signs.forEach((sign, index) => {
    //     if(sign.Name.split('.').pop() == 'mp4') {
    //         sign.type = 'video'
    //     } else {
    //         sign.type = 'image'
    //     }
    //     slides.push({
    //             media: `http://bvweb01:808/Resources/Videos/${sign.Name}`,
    //             type: sign.type,
    //             duration: sign.Duration,
    //             transition: 'rollIn'
    //     })
    // })

    let slides = [
        {
            duration: 10,
            transition: 'rollIn',
            partitions: [
                {
                    layer: 1,
                    media: 'http://localhost:3000/media/menu.mp4',
                    startPoint: { x: 1, y: 1 },
                    size: { height: 90, width: 50.63 },
                    transition: 'fadeIn'
                },
                {
                    layer: 1,
                    media: 'http://localhost:3000/media/menu.mp4',
                    startPoint: { x: 50.64, y: 1 },
                    size: { height: 90, width: 50.63 },
                    transition: 'fadeIn'
                }
            ]
        }
    ]
    
    let sign = new Sign('digital-sign', {transition: 'rollIn', slides: slides})
})