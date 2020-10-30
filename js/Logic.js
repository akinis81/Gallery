class Logic {
    constructor(gallerydata){
        this.gallerydata = gallerydata;
        this.init();
    }
    
    init(){
        this.generateHtml();
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
                                        <img src="./img/${this.gallerydata[i].photo}" alt="Gallery photo">
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
}

export {Logic}