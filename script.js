let songsList = [];
let rock = [];
let hip_hop = [];
let indie = [];
let jazz = [];
let reggae = [];
let top10 = [];
let biggest = [];


class Song {
    group;
    url;
    title;
    genere;
    listeners;
    rank;
    constructor(object){
        this.group = object.artist.name;
        this.url = object.artist.url;
        this.title = object.name;
        this.listeners = object.listeners;
        this.genere = object.genre;
        this.rank = object["@attr"].rank;
    }

    setItemLi(){

    }
    setItemGroupName(group,url){
    }
    setItemSongTitle(title){
    }
    setListeners(listeners){
    }
    getNewElement(){
    let lista=
        `<li class="far fa-play-circle">
            <a class="group-name" title="Ir al Grupo" href=${this.url}>${this.group}</a>
            <a class="song-title">${this.title}</a>
            <div class="listeners">${this.listeners}</div>
        </li>`
    return lista;
    }

}

async function loadJSON (url) {
    const res = await fetch(url);
    return await res.json();
  }
  
  

const loadSongs = (song, ulElement)=>{
    switch(song.genere){
        case "rock":
            rock.push(song);
            break;
        case "indie":
            indie.push(song);
            break;
        case "jazz":
            jazz.push(song);
            break;
        case "reggae":
            reggae.push(song);
            break;
        case "hip-hop":
            hip_hop.push(song);
            break;
    }
    ulElement.innerHTML += song.getNewElement();
    songsList.push(song);
}

const loadOverview = () =>{

}

const loadTenListened = (elementList)=>{
    elementList.innerHTML='';
    top10 = songsList;
    console.log(top10);
    top10.sort((a,b)=>{
        return parseInt(b.listeners) - parseInt(a.listeners);
    })
    for(let i = 0 ; i<10; i++){
        let obj = top10[i];
       elementList.innerHTML += obj.getNewElement();
    }
}

const loadBiggest = (e, elemList)=>{
    let maxList = 0;
    let actualMax = 0;
    let actualMaxname ='';
    let nombreAnt = '';
    
    e.sort(function(a, b) {
        var nameA = a.group.toUpperCase();
        var nameB = b.group.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    nombreAnt = e[0].group;
    e.forEach(el=>{
        if(el.group == nombreAnt){
            maxList += parseInt(el.listeners);
        }
        else if(el.group != nombreAnt){
            if(actualMax<maxList){ actualMax = maxList; actualMaxname = nombreAnt}
            maxList=parseInt(el.listeners);
            nombreAnt = el.group;
        }
        console.log(actualMax);console.log(nombreAnt);
    });
    let finalArray = e.filter(function(el){
        return el.group === actualMaxname;
    })
    elemList.innerHTML = '';
    finalArray.forEach(element =>{
        elemList.innerHTML += element.getNewElement();
    })
}

const init = ()=>{
    let ul = document.getElementById("seccionLista");
    let rockEl = document.getElementById("rock");
    let hip_hopEl = document.getElementById("hip-hop");
    let indieEl = document.getElementById("indie");
    let jazzEl = document.getElementById("jazz");
    let reggaeEl = document.getElementById("reggae");
    let overRank = document.getElementById("OverRank");
    let titulo = document.getElementById("seccion");

    loadJSON('https://github.com/armand-carreras/clone-lastfm/blob/master/music.json').then(data => {
        data.forEach(element =>{
            let song = new Song(element);
            loadSongs(song,ul);
        })
      });
    document.getElementById("10Rank").addEventListener('click',()=>{
        titulo.innerHTML = "Top 10 Listened";
        loadTenListened(ul);
    })
    document.getElementById('bigRank').addEventListener('click',()=>{
        titulo.innerHTML = 'The Biggest';
        loadBiggest(songsList,ul);
    })
    overRank.addEventListener('click', ()=>{
        titulo.innerHTML = "Overview"
        ul.innerHTML = '';
        songsList.forEach(el => {
            ul.innerHTML += el.getNewElement();
        })
    })
    rockEl.addEventListener('click',()=>{
        ul.innerHTML = '';
        titulo.innerHTML = "Rock";
        rock.forEach(el =>{
            ul.innerHTML += el.getNewElement();
        })
    })
    hip_hopEl.addEventListener('click',()=>{
        ul.innerHTML = '';
        titulo.innerHTML = "Hip-hop";
        hip_hop.forEach(el =>{
            ul.innerHTML += el.getNewElement();
        })
    })
    indieEl.addEventListener('click',()=>{
        ul.innerHTML = '';
        titulo.innerHTML = "Indie";
        indie.forEach(el =>{
            ul.innerHTML += el.getNewElement();
        })
    })
    jazzEl.addEventListener('click',()=>{
        ul.innerHTML = '';
        titulo.innerHTML = "Jazz";
        jazz.forEach(el =>{
            ul.innerHTML += el.getNewElement();
        })
    })
    reggaeEl.addEventListener('click',()=>{
        ul.innerHTML = '';
        titulo.innerHTML = "Reagge";
        reggae.forEach(el =>{
            ul.innerHTML += el.getNewElement();
        })
    })
    }


window.onload = init; //onload window init function

