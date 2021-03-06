if(window.NodeList && !NodeList.prototype.forEach)
    NodeList.prototype.forEach = Array.prototype.forEach;

//page scroll animation
const section = document.querySelectorAll('section');
const social = document.querySelector('#social');
const animation_interval = 1000;
const empty_glass = document.querySelector('#empty_glass');
const full_glass = document.querySelector('#full_glass');
const newsletter = document.querySelector('#newsletter');
const search_option = document.querySelector('#search_option');
const image = document.querySelectorAll('.image');
let menu_click = false;

let last_animation = 0;
let index = 0;
let arr = new Array();
let time = 0;

setTimeout(function(){
    document.querySelector('.ie_guide').classList.add('show');
}, 1500);
document.querySelector('.guide_close').addEventListener('click', function(){
    document.querySelector('.ie_guide').classList.remove('show');
});

(function (n){
    let tmp;
    let random_num;
   
    for( let i = 0 ; i < image.length ; i++ )
        arr.push(i);

    for( let i = 0 ; i < arr.length ; i++ )
    {
        random_num = Math.floor(Math.random() * n);
        tmp = arr[i];
        arr[i] = arr[random_num];
        arr[random_num] = tmp;
    }
})(image.length);

for( let i = 0 ; i <  image.length ; i++ ){
    image[arr[i]].style.transition = 'all .5s ' + '.' + time + 's ease-in-out';
    image[arr[i]].style.opacity = '0';
    time +=3;
}

//kakao map
let mapContainer = document.getElementById('map'),
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

//toggle text
function toggleText(index, state){
    if( state === 'show' )
        section[index].querySelectorAll('.text').forEach(function(text){
            text.classList.add('show')
        });
    else
        section[index].querySelectorAll('.text').forEach(function(text){
            text.classList.remove('show')
        });
}

window.onbeforeunload = function(){section[0].scrollIntoView();}

toggleText(0, 'show');

if( navigator.userAgent.indexOf('Firefox') > 0 ){
    document.addEventListener('DOMMouseScroll', function(event){
        if( menu_click === true ) return;
        let delta = -event.detail;
        let realtime = new Date().getTime();

        if( realtime - last_animation < animation_interval ) return
        if( delta < 0 ) move_next();
        else move_prev();
    
        last_animation = realtime;
    });
}
else{
    document.addEventListener('mousewheel', function(event){
        if( menu_click === true ) return;
        let delta = event.wheelDelta;
        let realtime = new Date().getTime();

        if( realtime - last_animation < animation_interval ) return;
        if( delta < 0 ) move_next();
        else move_prev();
    
        last_animation = realtime;
    });
}

function move_prev(){
    if( index < 1 ){social.style.zIndex = '3'; return; }
    toggleText(index, 'hide');
    index--;
    
    document.querySelector('#indicator').style.display = 'block';
    full_glass.style.opacity = '1';
    full_glass.style.zIndex = '1';
    empty_glass.style.opacity = '1';
    empty_glass.style.zIndex = '1';

    empty_glass.style.top = '50%';
    empty_glass.style.left = '50%';
    empty_glass.style.transform = 'translate(-50%, -50%)';
    // empty_glass.style.transform = 'translateY(-50%)';

    full_glass.style.top = '50%';
    full_glass.style.left = '50%';
    full_glass.style.transform = 'translate(-50%, -50%)';
    // full_glass.style.transform = 'translateY(-50%)';

    if( index === 1){
        social.style.opacity = '0';
        document.querySelector('#glass').style.opacity = '1';
        document.querySelector('#bottle').style.opacity = '1';
    }
    else{
        social.style.opacity = '0.9';
        social.style.zIndex = '0';
        document.querySelector('#glass').style.opacity = '0';
        document.querySelector('#bottle').style.opacity = '0';
    }
    if( index === 0 ) social.style.zIndex = 3;
    if( index < 2 ){
        empty_glass.style.position = 'absolute';
        empty_glass.style.top = '50%';
        empty_glass.style.left = '50%';
        empty_glass.style.transform = 'translate(-50%, -50%)';
        // empty_glass.style.transform = 'translateY(-50%)';
        empty_glass.style.opacity = '0';

        full_glass.style.position = 'absolute'
        full_glass.style.top = '50%';
        full_glass.style.left = '50%';
        full_glass.style.transform = 'translate(-50%, -50%)';
        // full_glass.style.transform = 'translateY(-50%)';
    }
    if( index === 2 ) full_glass.style.clip = 'rect(100vh 100vw 100vh 0)'; //8.75
    
    window.addEventListener('resize', function(){
        if( window.innerWidth <= 768 ){
            if( index === 3 ) full_glass.style.clip = 'rect(35vh 100vw 100vh 0)';
            if( index === 4 ) full_glass.style.clip = 'rect(20vh 100vw 100vh 0)';
            if( index === 5 ) full_glass.style.clip = 'rect(10vh 100vw 100vh 0)';
        }
        else if( window.innerWidth <= 1000 ){
            if( index === 3 ) full_glass.style.clip = 'rect(37vh 100vw 100vh 0)';
            if( index === 4 ) full_glass.style.clip = 'rect(26vh 100vw 100vh 0)';
            if( index === 5 ) full_glass.style.clip = 'rect(11vh 100vw 100vh 0)';
        }
        else if( window.innerWidth <= 1200 ){
            if( index === 3 ) full_glass.style.clip = 'rect(40vh 100vw 100vh 0)';
            if( index === 4 ) full_glass.style.clip = 'rect(26vh 100vw 100vh 0)';
            if( index === 5 ) full_glass.style.clip = 'rect(11vh 100vw 100vh 0)';
        }
        else if( window.innerWidth <= 1400 ){
            if( index === 3 ) full_glass.style.clip = 'rect(45vh 100vw 100vh 0)';
            if( index === 4 ) full_glass.style.clip = 'rect(27vh 100vw 100vh 0)';
            if( index === 5 ) full_glass.style.clip = 'rect(13vh 100vw 100vh 0)';
        }
        else{
            if( index === 3 ) full_glass.style.clip = 'rect(50vh 100vw 100vh 0)';
            if( index === 4 ) full_glass.style.clip = 'rect(30vh 100vw 100vh 0)';
            if( index === 5 ) full_glass.style.clip = 'rect(15vh 100vw 100vh 0)';
        }
    });
    
    if( window.innerWidth <= 768 ){
        if( index === 3 ) full_glass.style.clip = 'rect(35vh 100vw 100vh 0)';
        if( index === 4 ) full_glass.style.clip = 'rect(20vh 100vw 100vh 0)';
        if( index === 5 ) full_glass.style.clip = 'rect(10vh 100vw 100vh 0)';
    }
    else if( window.innerWidth <= 1000 ){
        if( index === 3 ) full_glass.style.clip = 'rect(37vh 100vw 100vh 0)';
        if( index === 4 ) full_glass.style.clip = 'rect(26vh 100vw 100vh 0)';
        if( index === 5 ) full_glass.style.clip = 'rect(11vh 100vw 100vh 0)';
    }
    else if( window.innerWidth <= 1200 ){
        if( index === 3 ) full_glass.style.clip = 'rect(40vh 100vw 100vh 0)';
        if( index === 4 ) full_glass.style.clip = 'rect(26vh 100vw 100vh 0)';
        if( index === 5 ) full_glass.style.clip = 'rect(11vh 100vw 100vh 0)';
    }
    else if( window.innerWidth <= 1400 ){
        if( index === 3 ) full_glass.style.clip = 'rect(45vh 100vw 100vh 0)';
        if( index === 4 ) full_glass.style.clip = 'rect(27vh 100vw 100vh 0)';
        if( index === 5 ) full_glass.style.clip = 'rect(13vh 100vw 100vh 0)';
    }
    else{
        if( index === 3 ) full_glass.style.clip = 'rect(50vh 100vw 100vh 0)';
        if( index === 4 ) full_glass.style.clip = 'rect(30vh 100vw 100vh 0)';
        if( index === 5 ) full_glass.style.clip = 'rect(15vh 100vw 100vh 0)';
    }

    if( index === 6 ) full_glass.style.clip = 'rect(0vh 100vw 100vh 0)';
    if( index > 6 ){
        full_glass.style.opacity = '0';
        empty_glass.style.opacity = '0';
    }
    if( index === 7 ){
        full_glass.style.zIndex = '-1';
        empty_glass.style.zIndex = '-1';
    }
    if( index === 8 ){
        image.forEach(function(image){image.style.opacity = '1'});
        document.querySelector('.container').style.filter = 'brightness(50%)';
        section[8].style.zIndex = '1';
        if( filter.indexOf(navigator.platform.toLowerCase()) < 0 ) document.querySelector('#down').style.display = 'inline-block';
    }
    else{
        image.forEach(function(image){image.style.opacity = '0'});
        document.querySelector('.container').style.filter = 'brightness(100%)';
        section[8].style.zIndex = '0';
    }
    newsletter.style.opacity = '0';

    section.forEach(function(section, i){
        if( i === index ){
            toggleText(i, 'show');
            section.scrollIntoView({behavior: 'smooth'});
        }
    });
}

function move_next(){
    if( index > 8 )
        return;

    toggleText(index, 'hide');
    index++;

    section.forEach(function(section, i){
        if( i === index ){
            toggleText(i, 'show');
            section.scrollIntoView({behavior: 'smooth'});
        }
    });

    if( index === 1){
        social.style.opacity = 0;
        document.querySelector('#glass').style.opacity = '1';
        document.querySelector('#bottle').style.opacity = '1';
    }
    else{
        social.style.opacity = 0.9;
        social.style.zIndex = 0;
        document.querySelector('#glass').style.opacity = '0';
        document.querySelector('#bottle').style.opacity = '0';
    }
    if( index === 2 ){
        empty_glass.style.position = 'fixed';
        empty_glass.style.top = '50%';
        empty_glass.style.left = '50%';
        empty_glass.style.transform = 'translate(-50%, -50%)';
        // empty_glass.style.transform = 'translateY(-50%)';
        empty_glass.style.opacity = '1';

        full_glass.style.position = 'fixed'
        full_glass.style.top = '50%';
        full_glass.style.left = '50%';
        full_glass.style.transform = 'translate(-50%, -50%)';
        // full_glass.style.transform = 'translateY(-50%)';
        full_glass.style.clip = 'rect(100vh 100vw 100vh 0)'; //8.75
    }
    
    if( window.innerWidth <= 768 ){
        if( index === 3 ) full_glass.style.clip = 'rect(35vh 100vw 100vh 0)';
        if( index === 4 ) full_glass.style.clip = 'rect(20vh 100vw 100vh 0)';
        if( index === 5 ) full_glass.style.clip = 'rect(10vh 100vw 100vh 0)';
    }
    else if( window.innerWidth <= 1000 ){
        if( index === 3 ) full_glass.style.clip = 'rect(37vh 100vw 100vh 0)';
        if( index === 4 ) full_glass.style.clip = 'rect(26vh 100vw 100vh 0)';
        if( index === 5 ) full_glass.style.clip = 'rect(11vh 100vw 100vh 0)';
    }
    else if( window.innerWidth <= 1200 ){
            if( index === 3 ) full_glass.style.clip = 'rect(40vh 100vw 100vh 0)';
            if( index === 4 ) full_glass.style.clip = 'rect(26vh 100vw 100vh 0)';
            if( index === 5 ) full_glass.style.clip = 'rect(11vh 100vw 100vh 0)';
        }
    else if( window.innerWidth <= 1400 ){
        if( index === 3 ) full_glass.style.clip = 'rect(45vh 100vw 100vh 0)';
        if( index === 4 ) full_glass.style.clip = 'rect(27vh 100vw 100vh 0)';
        if( index === 5 ) full_glass.style.clip = 'rect(13vh 100vw 100vh 0)';
    }
    else{
        if( index === 3 ) full_glass.style.clip = 'rect(50vh 100vw 100vh 0)';
        if( index === 4 ) full_glass.style.clip = 'rect(30vh 100vw 100vh 0)';
        if( index === 5 ) full_glass.style.clip = 'rect(15vh 100vw 100vh 0)';
    }

    window.addEventListener('resize', function(){
        if( window.innerWidth <= 768 ){
            if( index === 3 ) full_glass.style.clip = 'rect(35vh 100vw 100vh 0)';
            if( index === 4 ) full_glass.style.clip = 'rect(20vh 100vw 100vh 0)';
            if( index === 5 ) full_glass.style.clip = 'rect(10vh 100vw 100vh 0)';
        }
        else if( window.innerWidth <= 1000 ){
            if( index === 3 ) full_glass.style.clip = 'rect(37vh 100vw 100vh 0)';
            if( index === 4 ) full_glass.style.clip = 'rect(26vh 100vw 100vh 0)';
            if( index === 5 ) full_glass.style.clip = 'rect(11vh 100vw 100vh 0)';
        }
        else if( window.innerWidth <= 1200 ){
            if( index === 3 ) full_glass.style.clip = 'rect(40vh 100vw 100vh 0)';
            if( index === 4 ) full_glass.style.clip = 'rect(26vh 100vw 100vh 0)';
            if( index === 5 ) full_glass.style.clip = 'rect(11vh 100vw 100vh 0)';
        }
        else if( window.innerWidth <= 1400 ){
            if( index === 3 ) full_glass.style.clip = 'rect(45vh 100vw 100vh 0)';
            if( index === 4 ) full_glass.style.clip = 'rect(27vh 100vw 100vh 0)';
            if( index === 5 ) full_glass.style.clip = 'rect(13vh 100vw 100vh 0)';
        }
        else{
            if( index === 3 ) full_glass.style.clip = 'rect(50vh 100vw 100vh 0)';
            if( index === 4 ) full_glass.style.clip = 'rect(30vh 100vw 100vh 0)';
            if( index === 5 ) full_glass.style.clip = 'rect(15vh 100vw 100vh 0)';
        }
    });

//     if( index === 3 ) full_glass.style.clip = 'rect(50vh 100vw 100vh 0)';
//     if( index === 4 ) full_glass.style.clip = 'rect(30vh 100vw 100vh 0)';
//     if( index === 5 ) full_glass.style.clip = 'rect(15vh 100vw 100vh 0)';

    if( index === 6 ) full_glass.style.clip = 'rect(0vh 100vw 100vh 0)';
    if( index === 7 ){
        full_glass.style.opacity = '0';
        full_glass.style.top = '-50%';
        empty_glass.style.opacity = '0';
        empty_glass.style.top = '-50%';
    }
    if( index === 8 ){
        image.forEach(function(image){image.style.opacity = '1'});
        document.querySelector('.container').style.filter = 'brightness(50%)';
        section[8].style.zIndex = '1';
    }
    else{
        image.forEach(function(image){image.style.opacity = '0'});
        document.querySelector('.container').style.filter = 'brightness(100%)';
        section[8].style.zIndex = '0';
    }

    if( index === 9 ){
        document.querySelector('#indicator').style.display = 'none';
        newsletter.style.opacity = '1';
    }
}

//menu controll
const menu_icon = document.querySelector('#menu-icon');
const menu_container = document.querySelector('#menu-container');
const close_btn = document.querySelector('#close_btn');
const menu_content = document.querySelector('#menu-content');
const menu_content_list = document.querySelectorAll('#menu-content li');
let menu_index, selected_menu;
function get_index(elm){
    let c = elm.parentNode.children;
    for( let i = 0 ; i < c.length ; i++ )
        if( c[i] === elm ) return i;
}

menu_content_list.forEach(function(li){
    li.addEventListener('click', function(){
        menu_index = get_index(li);
        menu_click = false;
        document.body.classList.remove('scroll_fix');
        if( selected_menu === menu_index ){
            section[index].scrollIntoView({behavior: 'auto'});
            section[9].style.top = '-35.6vh';
        }     
    });
});

menu_icon.addEventListener('click', function(){
    // if(  menu_container.style.left !== '100vw' )
    //     menu_container.style.left = '100vw';
    menu_click = true;
    document.body.classList.add('scroll_fix');
    document.body.style.top = -(index * 100) + 'vh';

    section[9].style.top = 0;

    menu_container.style.opacity = '1';
    menu_container.style.left = '0';
    menu_content.style.top = '50%';
    menu_content.style.opacity = '1'
    // menu_container.style.transition = 'none';
    window.addEventListener('resize', function(){
        menu_container.style.transition = 'none';
    });
});
close_btn.addEventListener('click', function(){
    menu_click = false;
    document.body.style.removeProperty('top');
    document.body.classList.remove('scroll_fix');
    section[index].scrollIntoView({behavior: 'auto'});

    menu_container.style.left = '100vw';
    menu_container.style.opacity = '0';
    menu_content.style.top = '60%';
    menu_content.style.opacity = '0';
    menu_container.style.transition = 'all .5s ease-in-out';
});

menu_content_list[0].addEventListener('click', function(){
    document.querySelector('#indicator').style.display = 'block';
    social.style.opacity = '0.9';
    menu_container.style.left = '100vw';
    menu_container.style.opacity = '0';
    menu_content.style.top = '60%';
    menu_content.style.opacity = '0';
    menu_container.style.transition = 'all .5s ease-in-out';

    document.querySelector('#glass').style.opacity = '0';
    document.querySelector('#bottle').style.opacity = '0';

    document.querySelector('.container').style.filter = 'brightness(100%)';

    newsletter.style.opacity = '0';

    empty_glass.style.position = 'absolute';
    empty_glass.style.top = '50%';
    empty_glass.style.left = '50%';
    empty_glass.style.transform = 'translate(-50%, -50%)';
    // empty_glass.style.transform = 'translateY(-50%)';
    empty_glass.style.opacity = '0';

    full_glass.style.position = 'absolute'
    full_glass.style.top = '50%';
    full_glass.style.left = '50%';
    full_glass.style.transform = 'translate(-50%, -50%)';
    // full_glass.style.transform = 'translateY(-50%)';
    full_glass.style.clip = 'rect(100vh 100vw 100vh 0)';

    section[9].style.top = '-35.6vh';
    image.forEach(function(image){image.style.opacity = '0'});

    if( index !== 0 ){
        toggleText(index, 'hide');
        index = 0;
        section.forEach(function(section, i){
            if( i === index ){
                toggleText(i, 'show');
                section.scrollIntoView({behavior: 'smooth'});
            }
        });
    }
    selected_menu = menu_index;
});
menu_content_list[1].addEventListener('click', function(){
    document.querySelector('#indicator').style.display = 'block';
    social.style.opacity = '0';
    menu_container.style.left = '100vw';
    menu_container.style.opacity = '0';
    menu_content.style.top = '60%';
    menu_content.style.opacity = '0';
    menu_container.style.transition = 'all .5s ease-in-out';

    document.querySelector('.container').style.filter = 'brightness(100%)';

    newsletter.style.opacity = '0';

    empty_glass.style.position = 'absolute';
    empty_glass.style.top = '50%';
    empty_glass.style.left = '50%';
    empty_glass.style.transform = 'translate(-50%, -50%)';
    // empty_glass.style.transform = 'translateY(-50%)';
    empty_glass.style.opacity = '0';

    full_glass.style.position = 'absolute'
    full_glass.style.top = '50%';
    full_glass.style.left = '50%';
    full_glass.style.transform = 'translate(-50%, -50%)';
    // full_glass.style.transform = 'translateY(-50%)';
    full_glass.style.clip = 'rect(100vh 100vw 100vh 0)';
    image.forEach(function(image){image.style.opacity = '0'});
    
    section[9].style.top = '-35.6vh';
    if( index !== 1 ){
        toggleText(index, 'hide');
        index = 1;
        section.forEach(function(section, i){
            if( i === index ){
                toggleText(i, 'show');
                section.scrollIntoView({behavior: 'smooth'});
            }
        });
        document.querySelector('#glass').style.opacity = '1';
        document.querySelector('#bottle').style.opacity = '1';
    }
    selected_menu = menu_index;
});
menu_content_list[2].addEventListener('click', function(){
    if( selected_menu === menu_index ) section[index].scrollIntoView({behavior: 'auto'});
    document.querySelector('#indicator').style.display = 'block';
    menu_container.style.left = '100vw';
    menu_container.style.opacity = '0';
    menu_content.style.top = '60%';
    menu_content.style.opacity = '0';
    menu_container.style.transition = 'all .5s ease-in-out';

    document.querySelector('#glass').style.opacity = '0';
    document.querySelector('#bottle').style.opacity = '0';

    document.querySelector('.container').style.filter = 'brightness(100%)';

    newsletter.style.opacity = '0';

    empty_glass.style.position = 'fixed';
    empty_glass.style.top = '50%';
    empty_glass.style.left = '50%';
    empty_glass.style.transform = 'translate(-50%, -50%)';
    // empty_glass.style.transform = 'translateY(-50%)';
    empty_glass.style.opacity = '1';

    full_glass.style.position = 'fixed';
    full_glass.style.top = '50%';
    full_glass.style.left = '50%';
    full_glass.style.transform = 'translate(-50%, -50%)';
    // full_glass.style.transform = 'translateY(-50%)';
    full_glass.style.clip = 'rect(30vh 100vw 100vh 0)';
    full_glass.style.opacity = '1';
    image.forEach(function(image){image.style.opacity = '0'});

    section[9].style.top = '-35.6vh';
    if( index !== 4 ){
        toggleText(index, 'hide');
        index = 4;
        section.forEach(function(section, i){
            if( i === index ){
                toggleText(i, 'show');
                section.scrollIntoView({behavior: 'smooth'});
            }
        });
    }
    selected_menu = menu_index;
});
menu_content_list[3].addEventListener('click', function(){
    if( selected_menu === menu_index ) section[index].scrollIntoView({behavior: 'auto'});
    document.querySelector('#indicator').style.display = 'block';
    menu_container.style.left = '100vw';
    menu_container.style.opacity = '0';
    menu_content.style.top = '60%';
    menu_content.style.opacity = '0';
    menu_container.style.transition = 'all .5s ease-in-out';

    document.querySelector('#glass').style.opacity = '0';
    document.querySelector('#bottle').style.opacity = '0';

    document.querySelector('.container').style.filter = 'brightness(100%)';

    newsletter.style.opacity = '0';

    empty_glass.style.position = 'fixed';
    empty_glass.style.top = '-50%';
    empty_glass.style.left = '50%';
    empty_glass.style.transform = 'translate(-50%, -50%)';
    // empty_glass.style.transform = 'translateY(-50%)';
    empty_glass.style.opacity = '0';

    full_glass.style.position = 'fixed'
    full_glass.style.top = '-50%';
    full_glass.style.left = '50%';
    full_glass.style.transform = 'translate(-50%, -50%)';
    // full_glass.style.transform = 'translateY(-50%)';
    full_glass.style.clip = 'rect(0vh 100vw 100vh 0)';
    full_glass.style.opacity = '0';
    image.forEach(function(image){image.style.opacity = '0'});

    section[9].style.top = '-35.6vh';
    if( index !== 7 ){
        toggleText(index, 'hide');
        index = 7;
        section.forEach(function(section, i){
            if( i === index ){
                toggleText(i, 'show');
                section.scrollIntoView({behavior: 'smooth'});
            }
        });
    }
    selected_menu = menu_index;
});
menu_content_list[4].addEventListener('click', function(){
    if( selected_menu === menu_index ) section[index].scrollIntoView({behavior: 'auto'});
    document.querySelector('#indicator').style.display = 'block';
    menu_container.style.left = '100vw';
    menu_container.style.opacity = '0';
    menu_content.style.top = '60%';
    menu_content.style.opacity = '0';
    menu_container.style.transition = 'all .5s ease-in-out';

    document.querySelector('#glass').style.opacity = '0';
    document.querySelector('#bottle').style.opacity = '0';

    newsletter.style.opacity = '0';

    empty_glass.style.position = 'fixed';
    empty_glass.style.top = '-50%';
    empty_glass.style.left = '50%';
    empty_glass.style.transform = 'translate(-50%, -50%)';
    // empty_glass.style.transform = 'translateY(-50%)';
    empty_glass.style.opacity = '0';

    full_glass.style.position = 'fixed'
    full_glass.style.top = '-50%';
    full_glass.style.left = '50%';
    full_glass.style.transform = 'translate(-50%, -50%)';
    // full_glass.style.transform = 'translateY(-50%)';
    full_glass.style.clip = 'rect(0vh 100vw 100vh 0)';
    full_glass.style.opacity = '0';

    section[9].style.top = '-35.6vh';

    if( index !== 8 ){
        toggleText(index, 'hide');
        index = 8;
        section.forEach(function(section, i){
            if( i === index ){
                toggleText(i, 'show');
                section.scrollIntoView({behavior: 'smooth'});
                section.style.zIndex = '1';
            }
        });
        image.forEach(function(image){image.style.opacity = '1'});
        document.querySelector('.container').style.filter = 'brightness(50%)';
    }
    selected_menu = menu_index;
});
menu_content_list[5].addEventListener('click', function(){
    if( selected_menu === menu_index ) section[index].scrollIntoView({behavior: 'auto'});
    document.querySelector('#indicator').style.display = 'none';
    menu_container.style.left = '100vw';
    menu_container.style.opacity = '0';
    menu_content.style.top = '60%';
    menu_content.style.opacity = '0';
    menu_container.style.transition = 'all .5s ease-in-out';

    document.querySelector('#glass').style.opacity = '0';
    document.querySelector('#bottle').style.opacity = '0';

    document.querySelector('.container').style.filter = 'brightness(100%)';

    empty_glass.style.position = 'fixed';
    empty_glass.style.top = '-50%';
    empty_glass.style.left = '50%';
    empty_glass.style.transform = 'translate(-50%, -50%)';
    // empty_glass.style.transform = 'translateY(-50%)';
    empty_glass.style.opacity = '0';

    full_glass.style.position = 'fixed'
    full_glass.style.top = '-50%';
    full_glass.style.left = '50%';
    full_glass.style.transform = 'translate(-50%, -50%)';
    // full_glass.style.transform = 'translateY(-50%)';
    full_glass.style.clip = 'rect(0vh 100vw 100vh 0)';
    full_glass.style.opacity = '0';
    image.forEach(function(image){image.style.opacity = '0'});

    section[9].style.top = '-35.6vh';

    if( index !== 9 ){
        toggleText(index, 'hide');
        index = 9;
        section.forEach(function(section, i){
            if( i === index ){
                toggleText(i, 'show');
            section.scrollIntoView({behavior: 'smooth'});
            }
        });
        section[8].style.zIndex = '0';
        newsletter.style.opacity = '1';
    }
    selected_menu = menu_index;
});