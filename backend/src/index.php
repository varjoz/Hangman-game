<?php
//cors miatt
header('Access-Control-Allow-Origin: *');

$action =  $_GET["action"];

$szavak = [
    "mese karakter" => ["Elza", "Minnie", "Aladdin", "Songoku"],
    "gyumolcs" => ["alma", "korte", "ananasz"],
    "varosok" => ["Szeged", "Budapest", "Birmingham", "Boston"],
];

// - API endpoint,  ami a kategoriak listajat adja vissza
if ($action == "kategorialista") {
    //a tomb kulcsai
    $kategoria_lista = array_keys($szavak);
    $html = "<p>Valaszz kategoriat: </p><br><br><select id=\"kategoria_valaszto\">";
    foreach ($kategoria_lista as $item) {
        $html .= "<option value=\"$item\">$item</option>";
    }
    echo $html . "</select>
    <div id=\"random_kontener\"></div>
    <button id=\"gomb2\" onclick=\"set_random_feladvany()\">Random szo lekeres</button>";
}


// API endpoint, ami a a kategorian belul egy random szot visszaad 
if ($action == "random" && isset($_GET["categ"])) {
    $category =  $_GET["categ"];
    random($szavak, $category);
}

/** Kivalaszt egy tetszoleges szot a megadott kategoiabol*/
function random($tomb, $kateg)
{
    if (array_key_exists($kateg, $tomb)) {
        $set_random_szo = $tomb[$kateg][array_rand($tomb[$kateg])];
        echo $set_random_szo;
    } else {
        echo "HIBA";
    }
}
