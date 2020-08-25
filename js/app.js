'use strict'

let animalObjArr = [];
let keywordOpt = [];
let arrFiltered = [];
let page = "data/page-1.json"
let typeAnimal = $('#typeAnimal');
let typeSorted = ""
let typeSortedpre = $("#typeSorted")
let photoSection = $('#mustache').html();

function Animal(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;

    animalObjArr.push(this);
}

Animal.prototype.renderPhoto = function () {
    let addPhoto = Mustache.render(photoSection, this);
    $('main').append(addPhoto);
}


$("#buttons").on("click", (event) => {
    if (event.target.id === "page1") {
        page = "data/page-1.json"
    } else if (event.target.id === "page2") {
        page = "data/page-2.json"
    }
    $(".photo-template").remove();
    $("#typeAnimal option ").remove()
    $("#typeAnimal").append(`<option value=${"default"}>${"All Animals"}</option>`);
    jax(page);
})

typeAnimal.click(function (event) {
    filter(event.target.value);
    $('main').empty();
    arrFiltered.forEach(item => {
        item.renderPhoto();
    });
})

typeSortedpre.click(function (event) {
    typeSorted = event.target.value;
    sorted(typeSorted);
    $('main').empty();
    arrFiltered.forEach(item => {
        item.renderPhoto();
    });
})

function jax(page) {
    $.ajax(page)
        .then(data => {
            animalObjArr=[];
            keywordOpt=[];
            data.forEach(ele => {
                new Animal(ele.image_url, ele.title, ele.description, ele.keyword, ele.horns);
            });
            $('main').empty();
            animalObjArr.forEach(item => {
                item.renderPhoto();
                filterOptions(item);
            })
        });
}

function sorted(value) {
    if (value == "byNum") {
        arrFiltered.sort((a, b) => {
            if (a.horns > b.horns) {
                return 1;
            } else if (a.horns < b.horns) {
                return -1
            } else {
                return 0
            }
        })
    } else if (value == "byTitle") {
        arrFiltered.sort((a, b) => {
            if (a.title.toUpperCase() > b.title.toUpperCase()) {
                return 1;
            } else if (a.title.toUpperCase() < b.title.toUpperCase()) {
                return -1;
            } else {
                return 0;
            }
        })
    }

}

function filter(value) {
    arrFiltered=[];

    animalObjArr.forEach(item => {
        if (value !== 'default') {
            if (item.keyword === value) {
                $(`.${item.keyword}`).show();
                arrFiltered.push(item)
            } else {
                $(`.${item.keyword}`).hide();
            }
        } else {
            $(`.${item.keyword}`).show();
            arrFiltered.push(item)
        }

    })
}

function filterOptions(item){
    if (keywordOpt.includes(item.keyword) === false) {
        keywordOpt.push(item.keyword);
        typeAnimal.append(`<option value="${item.keyword}">${item.keyword}</option>`);
    }
}

jax(page);
