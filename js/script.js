import "../sass/main.scss"
document.addEventListener("DOMContentLoaded", function() {

  //getting slides
  var slides = document.querySelectorAll(".navbgr .slide-unit")
  //counter
  var currentSlide = 0;
  //turning slider on
  var slider = setInterval(nextSlide, 1500);

  function nextSlide(){
    changeSlide(currentSlide+1);
  }

  function previousSlide() {
    changeSlide(currentSlide-1);
  }

  function changeSlide(x){
    //hiding first slide
    slides[currentSlide].className = "slide-unit";
    //adding one to counter and using modulo to cycle back to zero
    //e.g: (1+3)%3 =1; (2+3)%3 = 2, (3+3)%3 =0
    currentSlide = (x+slides.length)%slides.length;
    slides[currentSlide].className = "slide-unit active";
  }

  var sliderOn = true;
  var img_pause = document.querySelector(".circleholder div:nth-child(2)");

  function pause(){
    sliderOn = false;
    clearInterval(slider)
  }
  function play(){
    sliderOn = true;
    slider = setInterval(nextSlide, 1500);
  }

  img_pause.addEventListener("click", function(){
    if(sliderOn){
      pause();
    } else{
      play();
    }
  })

  var img_previous = document.querySelector(".circleholder div:first-child");
  var img_next = document.querySelector(".circleholder div:nth-child(3)");

  img_previous.addEventListener("click", function(){
    pause();
    nextSlide();
  })

  img_next.addEventListener("click", function(){
    pause();
    previousSlide();
  })

  var helper = document.getElementById("helper");


  helper.addEventListener("click", function(event){
    var eggVal = document.getElementById("inputEggs").value
    var productToConvTo = document.getElementById("replacer").value
    var result = document.getElementById("result")
    var tip=document.querySelectorAll(".tip");

    if (eggVal>0){
      var val=eggVal;
      var toConvert = parseFloat(val);
      var hint="";
      var banan = "Podaną ilość bananów należy zmiksować na puree. Nadają lekko wyczuwalny posmak"
      var jablko = "Polecane szczególnie do wilgotnych i puszystych ciast"
      var siemie = "Świeżo zmielone siemię zmieszać z wodą. Nadaje lekko orzechowy posmak"
      var sTofu = "Podaną ilość zmiksować lub rozgnieść widelcem"
      var chia = "Zmieszać chia z wodą w podanych proporcjach i odczekać, aż nabiorą żelowej konsystencji"
      var tahi = "Daje mocno wyczuwalny smak."
      var dynia = "Dobrze komponuje się z korzennymi przyprawami"

      switch(productToConvTo){
        case "banana": result = `${toConvert} (w sztukach)`; hint =banan;
        break;
        case "applesauce": result=`${toConvert*0.5} (w szklankach)`; hint=jablko;
        break;
        case "flaxseed": result=`${toConvert*1.5} (w łyżkach) + woda (w łyżkach): ${(toConvert*1.5)*3}`; hint=siemie;
        break;
        case "pumpkin": result=`${toConvert*0.5} (w szklankach)`; hint=dynia;
        break;
        case "potatoFlour": result=`${toConvert*2} (w łyżkach) + woda (w łyżkach: ${(toConvert*2)*3})`;
        break;
        case "silkenTofu": result=`${toConvert*0.5} (w szklankach)`; hint=sTofu;
        break;
        case "soyYoghurt": result=`${toConvert*0.5} (w szklankach)`;
        break;
        case "chia": result=`${toConvert}(w łyżkach) + woda (w łyżkach: ${(toConvert*3)})`; hint=chia;
        break;
        case "tahini": result=`${toConvert*3} (w łyżkach)`; hint=tahi;
        break;
        case "cornstarch": result=`${toConvert*2} + woda (w łyżkach: ${(toConvert*3)})`;
      }
      }
      else if((eggVal<=0) || (eggVal = NaN)){
        result = "Podaj prawidłową wartość";
        hint = " ";
      }

      document.getElementById("result").innerText = result;
      document.getElementById("hint").innerText = hint;



    })

  })
