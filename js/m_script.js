const body = document.body;
const menu_icon = document.querySelector('.menu_icon');
const menu = document.querySelector('.menu');
const menu_li = document.querySelectorAll('.menu>li');
const close_icon = document.querySelector('.close_icon');
const section = document.querySelectorAll('section');
const button = document.querySelectorAll('button');

window.onbeforeunload = () => section[0].scrollIntoView();

menu_icon.addEventListener('click', () => {
    menu.classList.add('show');
    body.classList.add('scroll_lock');
});
close_icon.addEventListener('click', () => {
    menu.classList.remove('show');
    body.classList.remove('scroll_lock');
});

menu_li.forEach(li => li.addEventListener('click', () => {
    menu_click = true;
    let li_text = li.innerText.toLowerCase();

    section.forEach((section) => {
        if( li_text === section.className )
            section.scrollIntoView({behavior:'smooth'});
    });

    menu.classList.remove('show');
    body.classList.remove('scroll_lock');
}));

let section_height = section[0].offsetHeight;
const image = document.querySelectorAll('.image');
let arr = new Array();
let time = 0;
   
for( let i = 0 ; i < image.length ; i++ ) arr.push(i);
for( let i = 0 ; i < arr.length ; i++ ){
    let tmp;
    let random_num = Math.floor(Math.random() * image.length);
    tmp = arr[i];
    arr[i] = arr[random_num];
    arr[random_num] = tmp;
}
for( let i = 0 ; i <  image.length ; i++ ){
    image[arr[i]].style.transition = 'all .5s ' + '.' + time + 's ease-in-out';
    time +=3;
}

window.addEventListener('scroll', () => {
    show_init();

    if( window.pageYOffset > section_height * 8 + section_height * 0.5 ){
        document.querySelector('.newsletter').classList.add('show');
        document.querySelector('.indicator').classList.add('hide');
    }
    else if( window.pageYOffset > section_height * 7 + section_height * 0.5 ){
        image.forEach(image => image.classList.add('show'));
        document.querySelector('.share_text_box').classList.add('show');
    }
    else if( window.pageYOffset > section_height * 6 + section_height * 0.5 ){
        document.querySelector('.find_text_box').classList.add('show');
        document.querySelector('.search').classList.add('show');
    }
    else if( window.pageYOffset > section_height * 5 + section_height * 0.5 ){
        document.querySelector('.detail_3_text_box_1').classList.add('show');
        document.querySelector('.detail_3_text_box_2').classList.add('show');
    }
    else if( window.pageYOffset > section_height * 4 + section_height * 0.5 ){
        document.querySelector('.detail_2_text_box').classList.add('show');
    }
    else if( window.pageYOffset > section_height * 3 + section_height * 0.5 ){
        document.querySelector('.detail_text_box').classList.add('show');
    }
    else if( window.pageYOffset > section_height * 2 + section_height * 0.5 ){
        document.querySelector('.about_3_text_box').classList.add('show');
    }
    else if( window.pageYOffset > section_height + section_height * 0.5 ){
        document.querySelector('.about_2_text_box').classList.add('show');
    }
    else if( window.pageYOffset > section_height * 0.5 ){
        document.querySelector('.text_box').classList.add('show');
        document.querySelector('.glass_img').classList.add('show');
        document.querySelector('.bottle_img').classList.add('show');
    }
});

function show_init(){
    document.querySelector('.newsletter').classList.remove('show');
    document.querySelector('.indicator').classList.remove('hide');
    image.forEach(image => image.classList.remove('show'));
    document.querySelector('.share_text_box').classList.remove('show');
    document.querySelector('.find_text_box').classList.remove('show');
    document.querySelector('.search').classList.remove('show');
    document.querySelector('.detail_3_text_box_1').classList.remove('show');
    document.querySelector('.detail_3_text_box_2').classList.remove('show');
    document.querySelector('.detail_2_text_box').classList.remove('show');
    document.querySelector('.detail_text_box').classList.remove('show');
    document.querySelector('.about_3_text_box').classList.remove('show');
    document.querySelector('.about_2_text_box').classList.remove('show');
    document.querySelector('.text_box').classList.remove('show');
    document.querySelector('.glass_img').classList.remove('show');
    document.querySelector('.bottle_img').classList.remove('show');
}

button.forEach(btn => btn.addEventListener('click', () => {
    btn.classList.add('click');
    setTimeout(() => {btn.classList.remove('click')}, 500);
}));

//map
let mapContainer = document.querySelector('.map'),
    mapOption = { 
        center: new kakao.maps.LatLng(37.551499, 126.993151),
        level: 5 
    };

let map = new kakao.maps.Map(mapContainer, mapOption);
map.setZoomable(false);

let mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

let zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);