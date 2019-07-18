export class Sign {
    constructor(elementId, options) {
        this.signElement = elementId;
        this.slideElements = [];
        this.options = {};

        options.hasOwnProperty('transition') ? this.options.transition = options.transition : this.options.transition = 'fadeIn';
        options.hasOwnProperty('slides') ? this.options.slides = options.slides.map(a => Object.assign({}, a)) : this.options.slides = []; // use Object.assign to deep copy each object in the array

        this.currentSlide = 0; // set it to the last slide, so that start() doesn't skip the first sign

        document.getElementById(this.signElement).classList.add('signage-wrapper');

        this.options.slides.forEach((slide, slideIndex) => {
            let newSlide = document.createElement('div');
            newSlide.classList.add('sign', `${this.signElement}${slideIndex}`);

            slide.partitions.forEach((partition, partitionIndex) => {
                let newPartition = document.createElement('div');
                newPartition.classList.add('partition'), `s${slideIndex}p${partitionIndex}`
                
                let partitionMedia;
                if (partition.media.split('.').pop() !== 'mp4') {
                    partitionMedia = document.createElement('img');
                    partitionMedia.src = partition.media;
                } else {
                    partitionMedia = document.createElement('video');
                    partitionMedia.setAttribute('muted', 'muted');
                    let source = document.createElement('source');
                    source.src = partition.media;
                    source.type = `video/${partition.media.split('.').pop()}`;
                    partitionMedia.appendChild(source);
                }
                partitionMedia.setAttribute('style', `position:absolute;left:${(partition.startPoint.x*12)-12}px;top:${(partition.startPoint.y*12)-12}px;width:${partition.size.width*12}px;height:${partition.size.height*12}px;`);
                newSlide.appendChild(partitionMedia);
            })
            
            slide.element = newSlide;
            document.getElementById(this.signElement).appendChild(newSlide);
            this.start();
        })
    }
    async start() {
        let newIndex = this.currentSlide;
        let newSlide = this.options.slides[newIndex];

        let transition = newSlide.hasOwnProperty('transition') ? newSlide.transition : this.options.transition;
        animateCSS(newSlide.element, transition, () => {

        });
        newSlide.partitions.forEach((partition, index) => {
            setTimeout(() => {
                this.rotate();
            }, newSlide.duration*1000)
            if(partition.media.split('.').pop() == 'mp4') {
                let videos = [...newSlide.element.getElementsByTagName('video')];
                videos.forEach((video) => {
                    video.oncanplay = () => {
                        video.play();
                    }
                })
            }
        }) 
    }
    rotate() {
        let oldIndex = this.currentSlide++;
        if(this.currentSlide > this.options.slides.length-1) this.currentSlide = 0;
        let newIndex = this.currentSlide;

        let oldSlide = this.options.slides[oldIndex];
        let newSlide = this.options.slides[newIndex];

        let transition = newSlide.hasOwnProperty('transition') ? newSlide.transition : this.options.transition;
        if(oldIndex !== newIndex) {
            animateCSS(newSlide.element, transition, () => {
                oldSlide.element.classList.remove('show');
            });
        }
        newSlide.partitions.forEach((partition, index) => {
            setTimeout(() => {
                if(partition.media.split('.').pop() == 'mp4') {
                    let videos = [...newSlide.element.getElementsByTagName('video')];
                    videos.forEach((video) => {
                        video.pause();
                        video.currentTime = 0;
                    })
                }
                this.rotate();
            }, newSlide.duration*1000)
            
            if(partition.media.split('.').pop() == 'mp4') {
                let videos = [...newSlide.element.getElementsByTagName('video')];
                videos.forEach((video) => {
                    video.oncanplay = () => {
                        video.play();
                    }
                })
            }
        }) 
    }
}

function animateCSS(element, animationName, callback) {
    element.classList.add('animated', 'show', animationName)

    function handleAnimationEnd() {
        element.classList.remove('animated', animationName)
        element.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    element.addEventListener('animationend', handleAnimationEnd)
}