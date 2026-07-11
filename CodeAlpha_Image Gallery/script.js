
// ELEMENTS

const albumGrid = document.getElementById("albumGrid");
const imageGrid = document.getElementById("imageGrid");

const pageTitle = document.getElementById("pageTitle");
const backBtn = document.getElementById("backBtn");

const allAlbums = document.getElementById("allAlbums");
const deletedAlbum = document.getElementById("deletedAlbum");

// ALBUM DATA

const albums = [

{
    name:"Camera",

    thumbnail:"https://picsum.photos/id/1015/500/400",

    images:[
        "https://picsum.photos/id/1015/700/500",
        "https://picsum.photos/id/1016/700/500",
        "https://picsum.photos/id/1018/700/500",
        "https://picsum.photos/id/1020/700/500"
    ]
},

{
    name:"Screenshots",

    thumbnail:"https://picsum.photos/id/1035/500/400",

    images:[
        "https://picsum.photos/id/1035/700/500",
        "https://picsum.photos/id/1037/700/500",
        "https://picsum.photos/id/1040/700/500"
    ]
},

{
    name:"WhatsApp",

    thumbnail:"https://picsum.photos/id/1060/500/400",

    images:[
        "https://picsum.photos/id/1060/700/500",
        "https://picsum.photos/id/1062/700/500",
        "https://picsum.photos/id/1063/700/500"
    ]
},

{
    name:"College",

    thumbnail:"https://picsum.photos/id/1050/500/400",

    images:[
        "https://picsum.photos/id/1050/700/500",
        "https://picsum.photos/id/1052/700/500",
        "https://picsum.photos/id/1053/700/500"
    ]
},

{
    name:"Pictures",

    thumbnail:"https://picsum.photos/id/1070/500/400",

    images:[
        "https://picsum.photos/id/1070/700/500",
        "https://picsum.photos/id/1072/700/500",
        "https://picsum.photos/id/1074/700/500"
    ]
},

{
    name:"Downloads",

    thumbnail:"https://picsum.photos/id/1080/500/400",

    images:[
        "https://picsum.photos/id/1080/700/500",
        "https://picsum.photos/id/1081/700/500",
        "https://picsum.photos/id/1082/700/500"
    ]
},

{
    name:"Favorites",

    thumbnail:"https://picsum.photos/id/1069/500/400",

    images:[
        "https://picsum.photos/id/1069/700/500",
        "https://picsum.photos/id/1071/700/500"
    ]
}

];


// RECENTLY DELETED

let deletedImages = [];


// DISPLAY ALBUMS

function showAlbums(){

    pageTitle.textContent = "All Albums";

    albumGrid.style.display = "grid";

    imageGrid.style.display = "none";

    backBtn.style.display = "none";

    albumGrid.innerHTML = "";

    albums.forEach((album,index)=>{

        albumGrid.innerHTML += `

        <div class="album-card" onclick="openAlbum(${index})">

            <img src="${album.thumbnail}">

            <div class="image-count">

                ${album.images.length}

            </div>

            <div class="album-overlay">

                <i class="fa-solid fa-images"></i>

            </div>

            <div class="album-info">

                <h3>${album.name}</h3>

                <p>${album.images.length} Photos</p>

            </div>

        </div>

        `;

    });

}

showAlbums();

// PART 3B
// OPEN ALBUM
// DISPLAY IMAGES
// BACK BUTTON
// SIDEBAR NAVIGATION

let currentAlbum = null;
let currentImages = [];

function openAlbum(index){

    currentAlbum = index;
    currentImages = albums[index].images;

    pageTitle.textContent = albums[index].name;

    albumGrid.style.display = "none";
    imageGrid.style.display = "grid";

    backBtn.style.display = "inline-flex";

    imageGrid.innerHTML = "";

    currentImages.forEach((image, imageIndex)=>{

        imageGrid.innerHTML += `

            <div class="image-card" onclick="openLightbox(${imageIndex})">

                <img src="${image}" alt="Image">

                <div class="image-overlay">

                    <i class="fa-solid fa-expand"></i>

                </div>

                <div class="image-title">

                    Image ${imageIndex + 1}

                </div>

            </div>

        `;

    });

}


// BACK BUTTON

backBtn.addEventListener("click",()=>{

    showAlbums();

    allAlbums.classList.add("active");
    deletedAlbum.classList.remove("active");

});


// SIDEBAR NAVIGATION

allAlbums.addEventListener("click",()=>{

    allAlbums.classList.add("active");
    deletedAlbum.classList.remove("active");

    showAlbums();

});


deletedAlbum.addEventListener("click",()=>{

    deletedAlbum.classList.add("active");
    allAlbums.classList.remove("active");

    showDeletedImages();

});


// SHOW RECENTLY DELETED

function showDeletedImages(){

    pageTitle.textContent = "Recently Deleted";

    albumGrid.style.display = "none";
    imageGrid.style.display = "grid";

    backBtn.style.display = "inline-flex";

    imageGrid.innerHTML = "";

    if(deletedImages.length === 0){

        imageGrid.innerHTML = `

            <div style="
                width:100%;
                display:flex;
                justify-content:center;
                align-items:center;
                height:300px;
                font-size:25px;
                color:#ccc;
            ">

                <div>

                    <i class="fa-solid fa-trash-can"
                    style="
                    font-size:70px;
                    display:block;
                    text-align:center;
                    margin-bottom:20px;
                    color:#888;
                    ">
                    </i>

                    No Deleted Images

                </div>

            </div>

        `;

        return;

    }

    deletedImages.forEach((image,index)=>{

        imageGrid.innerHTML += `

            <div class="image-card" onclick="openDeletedPopup(${index})">

                <img src="${image}" alt="Deleted Image">

                <div class="image-overlay">

                    <i class="fa-solid fa-trash"></i>

                </div>

                <div class="image-title">

                    Deleted Image

                </div>

            </div>

        `;

    });

}

// PART 3C
// LIGHTBOX
// NEXT / PREVIOUS
// KEYBOARD SUPPORT

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentImageIndex = 0;


// OPEN LIGHTBOX

function openLightbox(index){

    currentImageIndex = index;

    lightbox.style.display = "flex";

    lightboxImage.src = currentImages[currentImageIndex];

}


// CLOSE LIGHTBOX

function closeLightbox(){

    lightbox.style.display = "none";

}


// NEXT IMAGE

function nextImage(){

    currentImageIndex++;

    if(currentImageIndex >= currentImages.length){

        currentImageIndex = 0;

    }

    lightboxImage.src = currentImages[currentImageIndex];

}


// PREVIOUS IMAGE

function previousImage(){

    currentImageIndex--;

    if(currentImageIndex < 0){

        currentImageIndex = currentImages.length - 1;

    }

    lightboxImage.src = currentImages[currentImageIndex];

}


// BUTTON EVENTS

closeBtn.addEventListener("click", closeLightbox);

nextBtn.addEventListener("click", nextImage);

prevBtn.addEventListener("click", previousImage);


// CLOSE WHEN CLICKING OUTSIDE

lightbox.addEventListener("click", function(e){

    if(e.target === lightbox){

        closeLightbox();

    }

});


// KEYBOARD SUPPORT

document.addEventListener("keydown", function(event){

    if(lightbox.style.display !== "flex") return;

    if(event.key === "ArrowRight"){

        nextImage();

    }

    else if(event.key === "ArrowLeft"){

        previousImage();

    }

    else if(event.key === "Escape"){

        closeLightbox();

    }

});


// OPTIONAL TOUCH SUPPORT

let startX = 0;

lightbox.addEventListener("touchstart", function(e){

    startX = e.touches[0].clientX;

});

lightbox.addEventListener("touchend", function(e){

    let endX = e.changedTouches[0].clientX;

    if(startX - endX > 60){

        nextImage();

    }

    else if(endX - startX > 60){

        previousImage();

    }

});

// PART 3D
// DELETE
// RESTORE
// DELETE FOREVER

const popup = document.querySelector(".popup");

const deleteBtn = document.getElementById("deleteImage");
const restoreBtn = document.getElementById("restoreBtn");
const deleteForeverBtn = document.getElementById("deleteForeverBtn");
const cancelBtn = document.getElementById("cancelBtn");

let selectedDeletedIndex = null;


// DELETE IMAGE

deleteBtn.addEventListener("click", function(){

    const deletedItem = {

        image: currentImages[currentImageIndex],

        albumIndex: currentAlbum

    };

    deletedImages.push(deletedItem);

    albums[currentAlbum].images.splice(currentImageIndex,1);

    closeLightbox();

    openAlbum(currentAlbum);

});


// OPEN POPUP

function openDeletedPopup(index){

    selectedDeletedIndex = index;

    popup.style.display = "flex";

}


// RESTORE IMAGE

restoreBtn.addEventListener("click", function(){

    const item = deletedImages[selectedDeletedIndex];

    albums[item.albumIndex].images.push(item.image);

    deletedImages.splice(selectedDeletedIndex,1);

    popup.style.display = "none";

    showDeletedImages();

});


// DELETE FOREVER

deleteForeverBtn.addEventListener("click", function(){

    deletedImages.splice(selectedDeletedIndex,1);

    popup.style.display = "none";

    showDeletedImages();

});


// CANCEL

cancelBtn.addEventListener("click", function(){

    popup.style.display = "none";

});


// CLOSE POPUP ON OUTSIDE CLICK

popup.addEventListener("click", function(e){

    if(e.target === popup){

        popup.style.display = "none";

    }

});


// UPDATED SHOW DELETED IMAGES

function showDeletedImages(){

    pageTitle.textContent = "Recently Deleted";

    albumGrid.style.display = "none";

    imageGrid.style.display = "grid";

    backBtn.style.display = "inline-flex";

    imageGrid.innerHTML = "";

    if(deletedImages.length === 0){

        imageGrid.innerHTML = `

        <div style="
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        height:300px;
        color:#ccc;
        font-size:24px;
        ">

            <div>

                <i class="fa-solid fa-trash-can"
                style="
                font-size:70px;
                display:block;
                text-align:center;
                margin-bottom:20px;
                color:#888;
                "></i>

                No Deleted Images

            </div>

        </div>

        `;

        return;

    }

    deletedImages.forEach((item,index)=>{

        imageGrid.innerHTML += `

        <div class="image-card" onclick="openDeletedPopup(${index})">

            <img src="${item.image}">

            <div class="image-overlay">

                <i class="fa-solid fa-trash"></i>

            </div>

            <div class="image-title">

                Deleted from ${albums[item.albumIndex].name}

            </div>

        </div>

        `;

    });

}
// PART 3E
// THEME + LOCAL STORAGE

// ---------- THEME ----------

const themeBtn = document.getElementById("themeBtn");

function loadTheme(){

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "light"){

        document.body.classList.add("light");

        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    }

}

loadTheme();

themeBtn.addEventListener("click",function(){

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        localStorage.setItem("theme","light");

        themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }

    else{

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML =
        '<i class="fa-regular fa-moon"></i>';

    }

});

// LOCAL STORAGE

function saveGallery(){

    localStorage.setItem(

        "albums",

        JSON.stringify(albums)

    );

    localStorage.setItem(

        "deletedImages",

        JSON.stringify(deletedImages)

    );

}

function loadGallery(){

    const savedAlbums = localStorage.getItem("albums");

    const savedDeleted = localStorage.getItem("deletedImages");

    if(savedAlbums){

        const parsedAlbums = JSON.parse(savedAlbums);

        albums.length = 0;

        parsedAlbums.forEach(album=>{

            albums.push(album);

        });

    }

    if(savedDeleted){

        const parsedDeleted = JSON.parse(savedDeleted);

        deletedImages.length = 0;

        parsedDeleted.forEach(item=>{

            deletedImages.push(item);

        });

    }

}

loadGallery();

showAlbums();

// AUTO SAVE

const originalOpenAlbum = openAlbum;

openAlbum = function(index){

    originalOpenAlbum(index);

    saveGallery();

};

const originalShowDeleted = showDeletedImages;

showDeletedImages = function(){

    originalShowDeleted();

    saveGallery();

};

// SAVE AFTER DELETE

deleteBtn.addEventListener("click",saveGallery);

// SAVE AFTER RESTORE

restoreBtn.addEventListener("click",saveGallery);

// SAVE AFTER DELETE FOREVER

deleteForeverBtn.addEventListener("click",saveGallery);

// SAVE BEFORE EXIT

window.addEventListener("beforeunload",saveGallery);
