document.addEventListener("DOMContentLoaded", function()
{
    let target = document.getElementById("mainDiv")
    Build(target);

    let iksz = document.getElementById("closeModal")
    
    iksz.addEventListener("mousedown", function(event)
    {
        event.preventDefault();
        document.getElementById("myModal").style.display = "none";
    });
});

async function Lekerdzes(url)
{
    let response = fetch(url,{method: "GET"});
    return (await response).json();
}

async function Build(target)
{
    let data = await Lekerdzes("https://api.imgflip.com/get_memes")
    let adat = data.data.memes;
    for(let i = 0; i < adat.length; i++)
    {
        let kepD = document.createElement("div");
        kepD.classList.add("kepDiv");
        kepD.dataset.index = i;

            let kep = document.createElement("img");
            kep.classList.add("kep")
            kep.src = adat[i].url;
            kep.alt = adat[i].name;
            kep.onmouseover = adat[i].name;    

            kepD.appendChild(kep)


        
        kepD.addEventListener("mousedown", function(event)
        {
            event.preventDefault();
            //console.log(this.dataset.index)
            mData(adat[this.dataset.index]);
            document.getElementById("myModal").style.display = "block";
        });
        target.appendChild(kepD);

        kepD.addEventListener("mouseover", function()
        {
            target.style.boxShadow = getAverageRGB(kep);
            console.log("kaki");
        })
    }
}

function mData(data)
{
    let m = document.getElementById("elem");
    m.innerHTML = null;
    let n = document.getElementById("nevHely");
    n.innerHTML = data.name;

    let _kepD = document.createElement("div");
    _kepD.classList.add("kd");
    m.appendChild(_kepD);

    let _kep = document.createElement("img");
    _kep.src = data.url
    _kep.style.width = data.width;
    _kep.style.height = data.height;
    _kepD.appendChild(_kep);
}

function getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

}