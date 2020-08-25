'use strict'

let animalObjArr = [];
let keywordOpt = [];




$.ajax('data/page-1.json')
    .then(data => {
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
    animalObjArr.forEach(item => {
        if (event.target.value !== 'default') {
            if (item.keyword === event.target.value) {
                $(`.${item.keyword}`).show();
            } else {
                $(`.${item.keyword}`).hide();
            }
        } else {
            $(`.${item.keyword}`).show();
        }

    })
    console.log(event.target.value);
}