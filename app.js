async function loadVideos() {
  const res = await fetch("videos.json");
  const list = await res.json();
  render(list);
}

function render(list) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  list.forEach((v, i) => {

    if (i % 5 === 0 && i !== 0) {
      const ad = document.createElement("div");
      ad.className = "ad-box";
      ad.innerHTML =
        "<script type='text/javascript'>atOptions={key:'30921df49dc35be6701cc3d7f8ca8108',format:'iframe',height:50,width:320,params:{}};<\/script>" +
        "<script src='//www.highperformanceformat.com/30921df49dc35be6701cc3d7f8ca8108/invoke.js'><\/script>";
      grid.appendChild(ad);
    }

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML =
      "<img src='" + v.thumb + "'>" +
      "<div class='card-title'>" + v.title + "</div>" +
      "<div class='card-desc'>" + v.desc + "</div>" +
      "<a href='" + v.url + "' target='_blank'>Watch</a>";

    grid.appendChild(card);
  });
}

function filter(cat) {
  fetch("videos.json")
    .then(r => r.json())
    .then(data => render(data.filter(v => v.cat === cat)));
}

document.getElementById("showCats").onclick = function () {
  const bar = document.getElementById("catBar");
  bar.style.display = bar.style.display === "none" ? "flex" : "none";
};

document.getElementById("search").oninput = function () {
  const q = this.value.toLowerCase();
  if (!q) return loadVideos();

  const cats = ["bangladeshi","indian","foreign","hardscore","movie"];
  const match = cats.filter(c => c.includes(q));
  if (!match.length) return (document.getElementById("grid").innerHTML = "No match");

  const c = match[0][0].toUpperCase() + match[0].slice(1);
  filter(c);
};

document.getElementById("catBar").onclick = function(e){
  if(e.target.dataset.cat){
    filter(e.target.dataset.cat);
  }
};

loadVideos();
