const songName = () => {
    const searchText = document.getElementById('searchText').value;

    if (searchText == '') {
        alert('please enter valid name')
    } else {

        SearchSong(searchText)
    }
}

const SearchSong = async (searchText) => {
    document.getElementById('songName').innerHTML = '';
    try {
        const res = await fetch('https://api.lyrics.ovh/suggest/' + searchText + '');
        const data = await res.json();
        displaySong(data.data);
    } catch (error) {
        DisplayErr('something Went Wrong!! please try again');
    }

}
const displaySong = songs => {
    songs.forEach(song => {
        const songCard = document.getElementById('songName');

        const songDiv = document.createElement('div');
        songDiv.style.backgroundImage = `url(${song.album.cover})`;
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songCard.appendChild(songDiv);
    });
}

const getLyric = (artist, title) => {

    const url = (`https://api.lyrics.ovh/v1/${artist}/${title}`)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayLyrics(data.lyrics);
        })
        .catch(err => DisplayErr('something Wrong'))


}
// const getLyric = async (artist, title) => {
//     document.getElementById('showLyrics').innerHTML = '';
//     const url = (`https://api.lyrics.ovh/v1/${artist}/${title}`)
//     const res = await fetch(url);
//     const data = await res.json();
//     displayLyrics(data.lyrics);


// }
const displayLyrics = (lyrics) => {

    const Modal = document.getElementById('showLyrics');
    Modal.innerHTML = `
        <p >${lyrics}</p>
    `;
    const p = document.createElement('p');
    p.innerText = lyrics;

    hide(Modal)
}
const hide = (Modal) => {
    document.getElementById('hideSong').style.display = "none";
    Modal.style.display = "block"
}

const DisplayErr = error => {
    const Err = document.getElementById('errMsg')
    Err.innerText = error;
}