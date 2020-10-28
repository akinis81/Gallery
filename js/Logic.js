class Logic {
    constructor(){
    this.init();

}

    init(){
        this.generateHtml();

        }
    
    generateHtml(){
        let html ='';
        console.log('spausdina');
            for (let i = 1; i < 7; i++) {
                html +=  `<div class="primary">
                            <div class="single"><img src="./img/${i}.jpg" alt=""></div>
                        </div>`
            }
        const pointHTML = document.querySelector('.list');
        pointHTML.insertAdjacentHTML('afterbegin',html);
        console.log(pointHTML);    
    }
}

export {Logic}