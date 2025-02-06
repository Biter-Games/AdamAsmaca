const canvas = document.getElementById("canvastablo");
const ctx = canvas.getContext("2d");
const kelimeTuru = document.getElementById("kelimeTuru");
const yanlisSayisi = document.getElementById("yanlisSayisi");
const skorText = document.getElementById("skor");
const klavye = document.getElementById("klavye");

let kelimeler = [];
let secilenKelime = "";
let gosterilenKelime = [];
let yanlisTahmin = 0;
let skor = 0;

let secilenIslemler;


//Rastgele sayı üretme fonksiyonu
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//İçeriği değiştirme fonksiyonu
function innerHTML(girdi, girilen) {
    document.getElementById(girdi).innerHTML = girilen;
  
}


//İşlem seçme butonları ve class eklemek
function ToggleOperation(Element,ClassNName) {
    
    if (Element.classList.contains(ClassNName)) {
      Element.classList.remove(ClassNName);
    } else {
      Element.classList.add(ClassNName);
    }
}
  
//Menüye gitme fonksiyonu
function GoToFunction(Open){

    setTimeout(function () {
      const elements = document.getElementsByClassName("menu");
  
      // Döngüyle elemanlara erişme
      for (let i = 0; i < elements.length; i++) {
          elements[i].classList.add("close");
  
      }
  
      document.getElementById(Open).classList.remove("close");
  
    }, 100);
  
    
  }

function ApplySettings() {

    // İşlem ayarlarını al
    secilenIslemler = [];
    
    let islemler = document.querySelectorAll(".islemButton");
    
    for(let i = 0; i < secilenIslemler.length; i++){
      if (islemler[i].classList.contains("selected")) {
        
        secilenIslemler.push(buton.name);
      }
    }
    
    islemler.forEach(function(buton) {
      
      if (buton.classList.contains("selected")) {
        secilenIslemler.push(buton.name);

      }
    });
  
    if (secilenIslemler.length === 0) {
      innerHTML('Uyar',"En az bir tema seçmelisiniz.");
  
      setTimeout(function () {
        innerHTML('Uyar',"");
      }, 2000);
      return;
    }

    GoToFunction("GameMenu");
    yeniKelime();
}

// Asma Adamı Çiz
function drawHangman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Temizle
    ctx.fillStyle = 'white';   // Doldurma rengi
    ctx.strokeStyle = 'white'; // Çizgi rengi

    // Direk
    ctx.beginPath();
    ctx.moveTo(30, 50);
    ctx.lineTo(30, 300);
    ctx.stroke();

    // Üst Çizgi
    ctx.beginPath();
    ctx.moveTo(30, 50);
    ctx.lineTo(130, 50);
    ctx.stroke();

    // İp
    ctx.beginPath();
    ctx.moveTo(130, 50);
    ctx.lineTo(130, 100);
    ctx.stroke();

    // Kafa (Daire)
    if (yanlisTahmin >= 1) {
        ctx.beginPath();
        ctx.arc(130, 130, 30, 0, 2 * Math.PI); // x, y, yarıçap, başlatma açısı, bitiş açısı
        ctx.stroke();
    }

    // Vücut
    if (yanlisTahmin >= 2) {
        ctx.beginPath();
        ctx.moveTo(130, 160);
        ctx.lineTo(130, 230);
        ctx.stroke();
    }

    // Kol1
    if (yanlisTahmin >= 3) {
        ctx.beginPath();
        ctx.moveTo(130, 170);
        ctx.lineTo(80, 200);
        ctx.stroke();
    }

    // Kol2
    if (yanlisTahmin >= 4) {
        ctx.beginPath();
        ctx.moveTo(130, 170);
        ctx.lineTo(180, 200);
        ctx.stroke();
    }

    // Bacak1
    if (yanlisTahmin >= 5) {
        ctx.beginPath();
        ctx.moveTo(130, 230);
        ctx.lineTo(80, 300);
        ctx.stroke();
    }

    // Bacak2
    if (yanlisTahmin >= 6) {
        ctx.beginPath();
        ctx.moveTo(130, 230);
        ctx.lineTo(180, 300);
        ctx.stroke();
    }
}

// Kelimelerden birini seç ve oynamaya başla
function yeniKelime() {
    fetch('kelimeler.json')
        .then(response => response.json())
        .then(data => {


            let Konu = secilenIslemler[getRndInteger(0, secilenIslemler.length-1)];

            console.log(Konu);


            kelimeler = data[Konu]; // Meyveler kategorisinden kelimeler
            secilenKelime = kelimeler[getRndInteger(0, kelimeler.length-1)].toLowerCase();

            gosterilenKelime = Array(secilenKelime.length).fill('_');

            for (let i = 0; i < secilenKelime.length; i++) {
                

                if (secilenKelime[i] == " ") {
                    gosterilenKelime[i] = ",";
                }
            }

            console.log(secilenKelime);

            kelimeTuru.innerText = Konu; // Kelime türünü belirt

            yanlisTahmin = 0;
            skor = 0;
            skorText.innerText = skor;
            yanlisSayisi.innerText = yanlisTahmin;

            // Klavye oluştur
            olusturKlavye();
            drawHangman();
            gosterKelime();
        });
}

// Kelimeyi ekrana yazdır
function gosterKelime() {
    let kelimeStr = gosterilenKelime.join(' ');
    document.getElementById("kelime").innerText = kelimeStr;
}

// Klavye butonlarını oluştur
function olusturKlavye() {
    let harfler = "abcçdefgğhıijklmnoöprsştuüvyz".split('');
    klavye.innerHTML = "";  // Klavyeyi sıfırla

    harfler.forEach(harf => {
        let buton = document.createElement("button");
        buton.innerText = harf;
        buton.onclick = () => tahminYap(harf,buton);
        klavye.appendChild(buton);
    });
}


function GameOver(){

    for (let i = 0; i < gosterilenKelime.length; i++) {
        if (gosterilenKelime[i] == '_') {
            console.log(gosterilenKelime);
            console.log(gosterilenKelime[i]);
            console.log(secilenKelime[i]);
            gosterilenKelime[i] = secilenKelime[i]
            gosterilenKelime[i].style.setProperty("background-color", "rgb(130, 0, 0)", "important");
        }else{
            gosterilenKelime[i].style.setProperty("background-color", "rgb(0, 130, 0)", "important");
        }
        
    }
}

// Harf tahmin et
function tahminYap(harf,buton) {
    let dogru = false;
    
    // Tahmin edilen harfi kontrol et
    for (let i = 0; i < secilenKelime.length; i++) {
        if (secilenKelime[i] === harf) {
            gosterilenKelime[i] = harf;

            buton.classList.add = "true";
            dogru = true;
        }else{


        }
    }

    if(buton.classList.add != "true"){
        buton.style.setProperty("background-color", "rgb(130, 0, 0)", "important");
    }else{
        buton.style.setProperty("background-color", "rgb(0, 130, 0)", "important");
    }

    if (dogru) {
        skor++;
        skorText.innerText = skor;
        gosterKelime();
    } else {
        yanlisTahmin++;
        yanlisSayisi.innerText = yanlisTahmin;
        drawHangman();
    }

    // Oyun bitti mi?
    if (yanlisTahmin >= 6) {
        alert("Oyun Bitti! Kaybettiniz!");
        console.log("AAAA");
        GameOver();
        yeniKelime();
    } else if (!gosterilenKelime.includes('_')) {
        alert("Oyun Bitti! Kazandınız!");
        yeniKelime();
    }
}


