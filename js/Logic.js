class Logic {
    constructor(gallerydata){
        this.gallerydata = gallerydata;
        this.ClickedItemGlobal;
        this.imagesCount;
        this.init();
    }
    
    init(){
        this.generateHtml();
        this.modalImage();
        this.imageSearch();
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
                this.ClickedItemGlobal = ClickedItem;
                this.imageSearch();

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
               myModal.style.display = 'block';
               modalImage.src = `./img/${this.gallerydata[j].photo}`;  
               activeImage = image[j].dataset.image;
            })
            
        }

        const closeBtn = document.querySelector('.close')
        closeBtn.addEventListener('click', ()=>{
            myModal.style.display = 'none';
        }) 

        const right = document.querySelector('.right')
        right.addEventListener('click', ()=>{
            if(this.imagesCount.length < 1 || this.imagesCount == undefined){
                this.ClickedItemGlobal ='all';
                this.imageSearch();
            }
            let index = 0;
            for (let b = 0; b < this.imagesCount.length; b++) {
                if (parseInt(activeImage)===this.imagesCount[b]) {
                index = b;
                }
            }
            index++;
            if ( index < this.imagesCount.length){
                activeImage = this.imagesCount[index];
                modalImage.src = `./img/${this.gallerydata[activeImage].photo}`;
            } else{
                index = 0;
                activeImage = this.imagesCount[index];
                modalImage.src = `./img/${this.gallerydata[activeImage].photo}`
            }

        })

        const left = document.querySelector('.left')
        left.addEventListener('click', ()=>{

            if(this.imagesCount.length < 1 || this.imagesCount == undefined){
                this.ClickedItemGlobal ='all';
                this.imageSearch();
            }
            let index = 0;
            for (let b = 0; b < this.imagesCount.length; b++) {
                if (parseInt(activeImage)===this.imagesCount[b]) {
                index = b;
                }
            }
            index--;
            if ( index > -1){
                activeImage = this.imagesCount[index];
                modalImage.src = `./img/${this.gallerydata[activeImage].photo}`;
            } else{
                index = this.imagesCount.length-1;
                activeImage = this.imagesCount[index];
                modalImage.src = `./img/${this.gallerydata[activeImage].photo}`
            }
        })
        
    }

    imageSearch(){
        this.imagesCount = [];
        for (let t = 0; t < this.gallerydata.length; t++) {
               for (let l = 0; l <this.gallerydata[t].categories.length; l++) {
                if (this.gallerydata[t].categories[l].toLowerCase() === this.ClickedItemGlobal ){
                    this.imagesCount.push(t);
                } 
            }
            if (this.ClickedItemGlobal === 'all'){
                this.imagesCount.push(t);
            }
        }
    }
}
export {Logic}  