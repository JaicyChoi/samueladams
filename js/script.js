//page scroll animation
const section = document.querySelectorAll('section');
const animation_interval = 1000;
const empty_glass = document.querySelector('#empty_glass');
const full_glass = document.querySelector('#full_glass');
const newsletter = document.querySelector('#newsletter');
const image = document.querySelectorAll('.image');

let last_animation = 0;
let index = 0;
let image_number;
let arr = [];
let time = 0;

// document.querySelectorAll('.image').forEach(image => function(){
//     console.log(time);
//     image.style.opacity = '0';
//     image.style.transition = 'all .5s ' + '.' + time + 's ease-in-out';
//     time++;
// });
document.querySelectorAll('.image').forEach(image => image.style.opacity = '0');

// for( let i = 0 ; i < image.length ; i++ ){
//     image[i].style.transition = 'all .5s ' + '.' + time + 's ease-in-out';
//     time++;
// }

// arr가 0부터 8까지 채워질 때까지 무한 루프
for( let i = 0 ; i < image.length ; i++ ){
    let random_number = Math.floor(Math.random() * image.length );

    if( image_number === random_number ){

    }
    else{
        image[random_number].style.transition = 'all .5s ' + '.' + time + 's ease-in-out';
        time++;
        image_number = random_number;
        arr.push(image_number);
    }
}
    

function toggleText(index, state){
    if( state === 'show' )
        section[index].querySelectorAll('.text').forEach( text => text.classList.add('show'));
    else
        section[index].querySelectorAll('.text').forEach( text => text.classList.remove('show'));
}

toggleText(0, 'show');

document.addEventListener('wheel', event => {
    let delta = event.wheelDelta;
    let realtime = new Date().getTime();

    if( realtime - last_animation < animation_interval ){
        // event.preventDefault();
        return;
    }

    if( delta < 0 ) move_next();
    else move_prev();

    last_animation = realtime;
})

function move_prev(){
    if( index < 1 ) return;
    toggleText(index, 'hide');
    index--;

    full_glass.style.opacity = '1';
    full_glass.style.zIndex = '1';
    empty_glass.style.opacity = '1';
    empty_glass.style.zIndex = '1';

    empty_glass.style.top = '50%';
    empty_glass.style.transform = 'translateY(-50%)';
    full_glass.style.top = '50%';
    full_glass.style.transform = 'translateY(-50%)';

    if( index === 1){
        document.querySelector('#glass').style.opacity = '1';
        document.querySelector('#bottle').style.opacity = '1';
    }
    else{
        document.querySelector('#glass').style.opacity = '0';
        document.querySelector('#bottle').style.opacity = '0';
    }
    if( index < 2 ){
        empty_glass.style.position = 'absolute';
        empty_glass.style.top = '50%';
        empty_glass.style.transform = 'translateY(-50%)';
        empty_glass.style.opacity = '0';

        full_glass.style.position = 'absolute'
        full_glass.style.top = '50%';
        full_glass.style.transform = 'translateY(-50%)';
    }
    if( index === 2 ) full_glass.style.clip = 'rect(100vh 100vw 100vh 0)'; //8.75
    
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
//     if( index === 3 ) full_glass.style.clip = 'rect(50vh 100vw 100vh 0)';
//     if( index === 4 ) full_glass.style.clip = 'rect(30vh 100vw 100vh 0)';
//     if( index === 5 ) full_glass.style.clip = 'rect(15vh 100vw 100vh 0)';

    if( index === 6 ) full_glass.style.clip = 'rect(0vh 100vw 100vh 0)';
    if( index > 6 ){
        full_glass.style.opacity = '0';
        empty_glass.style.opacity = '0';
    }
    if( index === 8 ) document.querySelector('.container').style.filter = 'brightness(50%)';
    else document.querySelector('.container').style.filter = 'brightness(100%)';

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
        document.querySelector('#glass').style.opacity = '1';
        document.querySelector('#bottle').style.opacity = '1';
    }
    else{
        document.querySelector('#glass').style.opacity = '0';
        document.querySelector('#bottle').style.opacity = '0';
    }
    if( index === 2 ){
        empty_glass.style.position = 'fixed';
        empty_glass.style.top = '50%';
        empty_glass.style.transform = 'translateY(-50%)';
        empty_glass.style.opacity = '1';

        full_glass.style.position = 'fixed'
        full_glass.style.top = '50%';
        full_glass.style.transform = 'translateY(-50%)';
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
        document.querySelector('.container').style.filter = 'brightness(50%)';
    }
    else document.querySelector('.container').style.filter = 'brightness(100%)';

    if( index === 9 ) newsletter.style.opacity = '1';
}

//menu controll
const menu_icon = document.querySelector('#menu-icon');
const menu_container = document.querySelector('#menu-container');
const close_btn = document.querySelector('#close_btn');
const menu_content = document.querySelector('#menu-content');
const menu_content_list = document.querySelectorAll('#menu-content li');

menu_icon.addEventListener('click', function(){
    menu_container.style.opacity = '1';
    menu_container.style.left = '0';
    menu_content.style.top = '50%';
    menu_content.style.opacity = '1';
    // menu_container.style.transition = 'none';
    window.addEventListener('resize', function(){
        menu_container.style.transition = 'none';
    });
});
close_btn.addEventListener('click', function(){
    menu_container.style.left = '100vw';
    menu_container.style.opacity = '0';
    menu_content.style.top = '60%';
    menu_content.style.opacity = '0';
    menu_container.style.transition = 'all .5s ease-in-out';
});

menu_content_list[0].addEventListener('click', function(){
    document.querySelector('#glass').style.opacity = '0';
    document.querySelector('#bottle').style.opacity = '0';

    document.querySelector('.container').style.filter = 'brightness(100%)';

    newsletter.style.opacity = '0';

    empty_glass.style.position = 'absolute';
    empty_glass.style.top = '50%';
    empty_glass.style.transform = 'translateY(-50%)';
    empty_glass.style.opacity = '0';

    full_glass.style.position = 'absolute'
    full_glass.style.top = '50%';
    full_glass.style.transform = 'translateY(-50%)';
    full_glass.style.clip = 'rect(100vh 100vw 100vh 0)';
    
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
});
menu_content_list[1].addEventListener('click', function(){
    document.querySelector('.container').style.filter = 'brightness(100%)';

    newsletter.style.opacity = '0';

    empty_glass.style.position = 'absolute';
    empty_glass.style.top = '50%';
    empty_glass.style.transform = 'translateY(-50%)';
    empty_glass.style.opacity = '0';

    full_glass.style.position = 'absolute'
    full_glass.style.top = '50%';
    full_glass.style.transform = 'translateY(-50%)';
    full_glass.style.clip = 'rect(100vh 100vw 100vh 0)';

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
});
menu_content_list[2].addEventListener('click', function(){
    document.querySelector('#glass').style.opacity = '0';
    document.querySelector('#bottle').style.opacity = '0';

    document.querySelector('.container').style.filter = 'brightness(100%)';

    newsletter.style.opacity = '0';

    empty_glass.style.position = 'fixed';
    empty_glass.style.top = '50%';
    empty_glass.style.transform = 'translateY(-50%)';
    empty_glass.style.opacity = '1';

    full_glass.style.position = 'fixed'
    full_glass.style.top = '50%';
    full_glass.style.transform = 'translateY(-50%)';
    full_glass.style.clip = 'rect(30vh 100vw 100vh 0)';
    full_glass.style.opacity = '1';

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
});
menu_content_list[3].addEventListener('click', function(){
    document.querySelector('#glass').style.opacity = '0';
    document.querySelector('#bottle').style.opacity = '0';

    document.querySelector('.container').style.filter = 'brightness(100%)';

    newsletter.style.opacity = '0';

    empty_glass.style.position = 'fixed';
    empty_glass.style.top = '-50%';
    empty_glass.style.transform = 'translateY(-50%)';
    empty_glass.style.opacity = '0';

    full_glass.style.position = 'fixed'
    full_glass.style.top = '-50%';
    full_glass.style.transform = 'translateY(-50%)';
    full_glass.style.clip = 'rect(0vh 100vw 100vh 0)';
    full_glass.style.opacity = '0';

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
});
menu_content_list[4].addEventListener('click', function(){
    document.querySelector('#glass').style.opacity = '0';
    document.querySelector('#bottle').style.opacity = '0';

    newsletter.style.opacity = '0';

    empty_glass.style.position = 'fixed';
    empty_glass.style.top = '-50%';
    empty_glass.style.transform = 'translateY(-50%)';
    empty_glass.style.opacity = '0';

    full_glass.style.position = 'fixed'
    full_glass.style.top = '-50%';
    full_glass.style.transform = 'translateY(-50%)';
    full_glass.style.clip = 'rect(0vh 100vw 100vh 0)';
    full_glass.style.opacity = '0';

    if( index !== 8 ){
        toggleText(index, 'hide');
        index = 8;
        section.forEach(function(section, i){
            if( i === index ){
                toggleText(i, 'show');
                section.scrollIntoView({behavior: 'smooth'});
            }
        });
        document.querySelectorAll('.image').forEach(image => image.style.opacity = '1');
        document.querySelector('.container').style.filter = 'brightness(50%)';      
    }
});
menu_content_list[5].addEventListener('click', function(){
    document.querySelector('#glass').style.opacity = '0';
    document.querySelector('#bottle').style.opacity = '0';

    document.querySelector('.container').style.filter = 'brightness(100%)';

    empty_glass.style.position = 'fixed';
    empty_glass.style.top = '-50%';
    empty_glass.style.transform = 'translateY(-50%)';
    empty_glass.style.opacity = '0';

    full_glass.style.position = 'fixed'
    full_glass.style.top = '-50%';
    full_glass.style.transform = 'translateY(-50%)';
    full_glass.style.clip = 'rect(0vh 100vw 100vh 0)';
    full_glass.style.opacity = '0';

    if( index !== 9 ){
        toggleText(index, 'hide');
        index = 9;
        section.forEach(function(section, i){
            if( i === index ){
                toggleText(i, 'show');
            section.scrollIntoView({behavior: 'smooth'});
            }
        });
        newsletter.style.opacity = '1';
    }
});