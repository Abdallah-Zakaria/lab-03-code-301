'use strict'

let animalObjArr = [];
let keywordOpt = [];
let arrFeltier=[];
let page="data/page-1.json"
jax(page)
$("#buttons").on("click",(event)=>{
    // console.log(event.target.id);
 
   if (event.target.id==="page1") {
    page="data/page-1.json"
   } else if(event.target.id==="page2") {
    page="data/page-2.json" 
   }
   $(".photo-template").remove()
   
   $("#typeAnimal option ").remove()
   jax(page)
})



function jax(page) {
    $.ajax(page)
    .then(data => {
       animalObjArr = [];
       keywordOpt = [];
        // let arrFeltier=[];
        console.log(page);
        let typeAnimal = $('#typeAnimal');
        let typeSorted = ""
        let typeSortedpre = $("#typeSorted")

        typeSortedpre.click(function (event) {
            console.log(event.target.value)
            typeSorted = event.target.value
            sortedNum(typeSorted)
            //delete image all
            $("main").empty()
            animalObjArr.forEach(item => {
                item.renderPhoto();
                
            })

        })

        data.forEach(ele => {
            new Animal(ele.image_url, ele.title, ele.description, ele.keyword, ele.horns);
        });
        console.log(animalObjArr);


        animalObjArr.forEach(item => {
            item.renderPhoto();
            if (keywordOpt.includes(item.keyword) === false) {
                keywordOpt.push(item.keyword);
                typeAnimal.append(`<option value="${item.keyword}">${item.keyword}</option>`);

            }
        })
        $('.photo-template').first().hide();
        console.log(keywordOpt);
        typeAnimal.click(function(){
            filter(event)
        })

    });
    
}

function Animal(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;

    animalObjArr.push(this);
}


Animal.prototype.renderPhoto = function () {
    let photoSection = $('#mustache').html();
    let addPhoto = Mustache.render(photoSection, this);
    $('main').append(addPhoto);
}


function sortedNum(typeSorted) {

    if (typeSorted == "byNum") {
   animalObjArr.sort((a, b) => {
            if (a.horns > b.horns) {
                return 1;
            } else if (a.horns < b.horns) {
                return -1
            } else {
                return 0
            }
        })
    } else if (typeSorted == "byTitle") {
       animalObjArr.sort((a, b) => {
            if (a.title.toUpperCase() > b.title.toUpperCase()) {
                return 1;
            } else if (a.title.toUpperCase() < b.title.toUpperCase()) {
                return -1
            } else {
                return 0
            }
        })
    }

}

function filter(event) {
    // arrFeltier=[]
    animalObjArr.forEach(item => {
        if (event.target.value !== 'default') {
            if (item.keyword === event.target.value) {
                $(`.${item.keyword}`).show();
                arrFeltier.push(item)
            } else {
                $(`.${item.keyword}`).hide();
            }
        } else {
            $(`.${item.keyword}`).show();
            arrFeltier.push(item)
        }

    })
    console.log(event.target.value);
}