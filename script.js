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
    let data = await Lekerdzes("https://api.imgflip.com/get_memes");
    let adat = data.data.memes;
    for(let i = 0; i < adat.length; i++)
    {
        let kepD = document.createElement("div");
        kepD.classList.add("kepDiv");
        kepD.dataset.index = i;

            let kep = document.createElement("img");
            kep.classList.add("kep")
            kep.src = adat[i].url;
            //avgPXL = get_average_rgb(kep.src);
            //console.log(avgPXL);
            kepD.dataset.r = 

            kep.alt = adat[i].name;

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
            var k = get_average_rgb(adat[this.dataset.index].url);
            let oink = "0px 0px 30px 20px rgba("+k[0]+", "+k[1]+", "+k[2]+", 1)";
            kepD.style.boxShadow = oink
            console.log(k[0]+ "," + k[1]+ "," + k[2]);
        })

        kepD.addEventListener("mouseleave", function()
        {
            var k = get_average_rgb(adat[this.dataset.index].url);
            let oink = "0px 0px 0px 0px rgba("+k[0]+", "+k[1]+", "+k[2]+", 1)";
            kepD.style.boxShadow = oink;
            console.log(k[0]+ "," + k[1]+ "," + k[2]);
        });
    }
}

function get_average_rgb(img) {
    var context = document.createElement('canvas').getContext('2d');
    if (typeof img == 'string') {
        var src = img;
        img = new Image;
        img.setAttribute('crossOrigin', ''); 
        img.src = src;
    }
    context.imageSmoothingEnabled = true;
    context.drawImage(img, 0, 0, 1, 1);
    return context.getImageData(0, 0, 1, 1).data.slice(0,3);
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