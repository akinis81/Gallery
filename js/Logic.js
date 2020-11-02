class Logic {
    constructor(gallerydata){
        this.gallerydata = gallerydata;
        // this.objImageModal = new ImageModal(this.gallerydata);
        this.init();
    }
    
    init(){
        this.generateHtml();
        this.modalImage();
    }

    generateHtml(){
        
        let items = [];
        let count = 0;
        for (const iterator of this.gallerydata) {
            for (const item of iterator.categories) {
                items[count++]= item.toLowerCase(); 
            }
        }
        let unique = [...new Set(items)];
        unique = unique.sort(); 
        
        let filterHtml = '<div class="filterItem active"  data-categories="all">All</div>';
            filterHtml += `<div class="dot">*</div>`
        // for (const iterator of unique) {
        for (let iterator = 0; iterator < unique.length; iterator++) {
            filterHtml +=  `<div class="filterItem"  data-categories="${unique[iterator]}">${unique[iterator].charAt(0).toUpperCase() + unique[iterator].slice(1)}</div>` 
            if (iterator < unique.length-1){
                filterHtml += `<div class="dot">*</div>`
            }

        }
        document.querySelector('.filter').insertAdjacentHTML('afterbegin',filterHtml);


        let imagehtml ='';
            for (let i = 0; i < this.gallerydata.length ; i++) {
                imagehtml +=   `<div class="primary">
                                    <div class="single">
                                        <img class="image" src="./img/${this.gallerydata[i].photo}" alt="Gallery photo" data-image="${i}">
                                    </div>
                                    <div class="text">
                                        <h5>${this.gallerydata[i].add}
                                            <div class="onTop"></div>
                                        </h5>
                                        <ul>${this.gallerydata[i].categories[0]} 
                                        <div class="onTopLine"></div>
                                        </ul>
                                    </div>
                                </div>`
            }



        document.querySelector('.list').insertAdjacentHTML('afterbegin',imagehtml);
        const singlePhoto = document.querySelectorAll('.primary');
        const categoriesFilter = document.querySelectorAll('.filterItem');

        for (let j = 0; j < categoriesFilter.length; j++) {
            categoriesFilter[j].addEventListener('click', () =>{
                const ClickedItem = categoriesFilter[j].dataset.categories;

                const activeFilterItem = document.querySelector(".filterItem.active");
                activeFilterItem.classList.remove('active');
                categoriesFilter[j].classList.add('active');

                    for (let x = 0; x < this.gallerydata.length; x++) {
                        if (ClickedItem === 'all') {
                            singlePhoto[x].classList.remove('hidden')    
                        } else {
                        singlePhoto[x].classList.add('hidden')
                            for (let index = 0; index < this.gallerydata[x].categories.length; index++) {
                                if ( this.gallerydata[x].categories[index].toLowerCase() === ClickedItem) {
                                    singlePhoto[x].classList.remove('hidden');
                                }
                            }
                        }
                    }   
            });
        }
       
    }
    modalImage(){
        const image = document.querySelectorAll('.image')
        const text = document.querySelectorAll('.text')
        const myModal = document.getElementById('myModal'); 
        let modalImage = document.getElementById('modalImage');
        let activeImage = 0;
        for (let j = 0; j < image.length; j++) {
            text[j].addEventListener('click', ()=>{
                console.log('spausdina');
               myModal.style.display = 'block';
            //    modalImage.src = image[j].src;  
               modalImage.src = `./img/${this.gallerydata[j].photo}`;  
               activeImage = image[j].dataset.image;
            //    console.log(image[j].dataset.image);
            })
            
        }

        const closeBtn = document.querySelector('.close')
        closeBtn.addEventListener('click', ()=>{
            myModal.style.display = 'none';
        }) 

        const right = document.querySelector('.right')
        right.addEventListener('click', ()=>{
            activeImage = parseInt(activeImage) + 1;
            if (activeImage < image.length){ 
                modalImage.src = `./img/${this.gallerydata[activeImage].photo}`
            } else{
                activeImage=0;
                modalImage.src = `./img/${this.gallerydata[activeImage].photo}`
            }
        })

        const left = document.querySelector('.left')
        left.addEventListener('click', ()=>{
            console.log(`pries salyga ${activeImage}`);
            activeImage = parseInt(activeImage) - 1;
            
            if (activeImage > -1){ 
                modalImage.src = `./img/${this.gallerydata[activeImage].photo}`
                console.log(`kai true ${activeImage}`);
            } else{
                activeImage= image.length-1;
                modalImage.src = `./img/${this.gallerydata[activeImage].photo}`
                console.log(`kai false ${activeImage}`);
            }
        })
        
    }
}

export {Logic}