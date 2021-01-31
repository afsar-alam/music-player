
 const music = document.querySelector("audio");
 const play = document.getElementById("play");
 const prev = document.getElementById("previous");
 const next = document.getElementById("forword");
 const artist=document.getElementById("artist");
 const title=document.getElementById("title");
 const minus=document.querySelector(".minus-btn");
 const pluse=document.querySelector(".plus-btn");
 const songno=document.querySelector(".songs-no");
 const seeks=document.querySelector(".seeks");


 const soundWave = document.querySelector('.sound-wave-container');

 const songs =[{
    
     name:"1",
     title:"lili",
     artist:"Arabica",
    

 },
 {
   name:"2",
     title:"Ertugrul",
     artist:"Anas chabarek",
     
 },
 {
    name:"3",
      title:"Jana Gana Mana",
      artist:"Rabindranath Tagore",
     
  },
  {
    name:"4",
      title:"Rangya",
      artist:"Remsha",
      
  },
];
 let isplaying=false;

 const playmusic =()=>{
     isplaying=true;
     music.play();
     play.classList.remove('fa-play');
     play.classList.add('fa-pause');
    
     
    soundWave.classList.remove('when-music-paused')

 }
 const pausemusic =()=>{
     isplaying=false;
     music.pause();
    
    soundWave.classList.add('when-music-paused');

    play.classList.remove('fa-pause');
    play.classList.add('fa-play');

 }
 
 play.addEventListener('click',()=>{
   
    isplaying ? pausemusic() : playmusic();

 });
 const loadsong =(songs)=>{
    title.textContent = songs.title;
     artist.textContent = songs. artist;
    
     music.src="music/"+songs.name+".mp3";
     songno.textContent=songs.name;

 };
 
 songindex=0;
 const nextsong =()=>{
     songindex=(songindex+1)%songs.length;
    loadsong(songs[songindex]);
    playmusic();
         

 }
 const prevsong =()=>{
    songindex=(songindex-1+songs.length) %songs.length;
    loadsong(songs[songindex]);
    playmusic();

 }
  
  

 next.addEventListener("click",nextsong);
 prev.addEventListener("click",prevsong);
 
 const fillbar=document.querySelector(".fill");
 let dur_time=document.querySelector(".duration_time");
 let cr_time=document.querySelector(".current_time");

  music.addEventListener("timeupdate",function(){
       
      
     let position=music.currentTime/music.duration;
     
     fillbar.style.width=position *100 + "%";
    //  music duration update
    converTime(Math.round(music.currentTime));
   

 });
 function converTime(seconds){
     let min=Math.floor(seconds/60);
     let sec=seconds % 60;
     min=min < 10 ? "0"+min : min;
     sec=sec< 10 ? "0" +sec:sec;
    cr_time.textContent=min+":"+sec;
     totalTime(Math.round(music.duration));

 }
 function totalTime(seconds){
    let min=Math.floor(seconds/60);
    let sec= seconds % 60;
    min=min < 10 ? "0"+min : min;
    sec=sec < 10 ? "0" +sec : sec;
    if( min){
    
    dur_time.textContent=min+":"+sec;
    }
    

 }
 function volumedecrment(){
     music.volume+=0.25;
 }
 function volumeincrement(){
     music.volume-=0.25;
 }

 const volumeUp=document.querySelector(".volume-up");
 const volumeIcon=document.querySelector(".volume-up i");

 volumeUp.addEventListener("click",function(){
     if(music.volume===1){
         music.volume=0;
         volumeIcon.classList.add('fa-volume-off');
         volumeIcon.classList.remove('fa-volume-up');
     }
     else{
         music.volume=1;
         volumeIcon.classList.add('fa-volume-up');
         volumeIcon.classList.remove('fa-volume-off');
     }

 });
 music.addEventListener("ended",nextsong);
 seeks.addEventListener("click",(Event)=>{
     const{ duration }=music;
     let move_progress=(Event.offsetX / Event.srcElement.clientWidth) *duration;
     console.log(move_progress);
     music.currentTime(move_progress);
 });