const billentyuzetbetuk = [
  "A",  "Á",  "B",  "C",  "D",  "E",  "É",  "F",  "G",  "H",  "I",  "Í",  "J",  "K",  "L",  "M",  "N",  "O",  "Ó",  "Ö",  "Ő",
  "P",  "Q",  "R",  "S",  "T",  "U",  "Ú",  "Ü",  "Ű",  "V",  "W",  "X",  "Y",  "Z",];

var feladvany = "";
var feladvany_betuk = [];
var hasznalt_betuk = [];
var hibak_szama = 0;

get_kategoria();
billentyuzetRajzol();

/**AJAX keres
 * - Bekeri a kategoriak listajat, majd kirajzolja */
function get_kategoria() {
  $.get(`http://localhost/?action=kategorialista`, function (response) {
    $("#tartalom").html(response);
  });
}

/**AJAX keres
 * - Bekeri a kategoriak listajat
 *  - megkeresi a feladvanyt
 * - kirajzolja a feladvanyt*/
function set_random_feladvany() {
  var kateg = $("#kategoria_valaszto").val();
  $.get(`http://localhost/?action=random&categ=${kateg}`, function (response) {
    //ha nem == HIBA, akkor megvan a szavunk
    if (response !== "HIBA") {
      feladvany = response.toUpperCase();
      szoRajzol();
      $("#random_kontener").html(response);
    }
  });
}

/** Kattintas fuggveny
 * - Berakja a hasznalt betuk koze a leutott billenyut
 * - Ha nincs talalat, akkor rogziti a hibat es akasztofat kezd rajzolni
 * - Kirajzolja a billentyuzetet
 * - Kirajzolja a feladvanyt
 * @param key - a leutott billentyu
 */
function gomkKattint(key) {
  hasznalt_betuk.push(key);
  hiba(key);
  billentyuzetRajzol();
  szoRajzol();
}

/** Kirajzolja a feladvanyt
 * - Eldonti, hogy volt-e talalat az adott beture, eszerint modositja a CSS-t
 *  - Ellenorzi, hogy gyozott-e a jatekos
 */
function szoRajzol() {
  feladvany_betuk = feladvany.split("");
  let html = "";
  let addon_class = "";
  let osszesBetuMegvolt = true;

  feladvany_betuk.forEach((element) => {
    if (hasznalt_betuk.includes(element)) {
      addon_class = "karakter";
    } else {
      addon_class = "karakter hidden";
      osszesBetuMegvolt = false; 
    }
    html += `<div class="${addon_class}">${element}</div>`;
  });
  $("#tartalom").html(html);

  if (osszesBetuMegvolt) {
    $(".uzenet").html("Gratulálok! Nyertel!");
    document.getElementById("billentyuzet").style.display = "none";
  }
}

/**Kirajzolja a billentyuzetet */
function billentyuzetRajzol() {
  let html = "";
  let addon_class = "";
  let addon_event = "";
  billentyuzetbetuk.forEach((karakter) => {
    if (hasznalt_betuk.includes(karakter)) {
      addon_class = "billentyu gray";
      addon_event = "";
    } else {
      addon_class = "billentyu";
      addon_event = `gomkKattint('${karakter}')`;
    }
    html += `<div class=" ${addon_class}" id="${karakter}" onclick=${addon_event}>${karakter}</div>`;
  });
  $("#billentyuzet").html(html);
}

/** Hibak ellenorzese
 * @param key - leutott billentyu 
 */
function hiba(key) {
  if (!feladvany.includes(key)) {
    hibak_szama += 1;
    $(".kep").html(`<img src="img/akasztofa_${hibak_szama}.png" alt="">`);
  } 
  
  if (hibak_szama == 11) {
    $(".uzenet").html("Vesztettel! A helyes megoldas:" + feladvany);
    $(".kep").html(`<img src="img/akasztofa_11.png" alt="">`);
    document.getElementById("billentyuzet").style.display = "none";
  }
}
