

// student id:2408972 
// Nishant_Jaiswal

// button fuction for weather forecast functions 
function showdis() {
  var content = document.querySelector(".hiddencontent");
  var otherContent = document.querySelector(".hiddencontent_1");
  var active = document.querySelector(".active")
  active.style.background = "transparent";
  content.style.display = "none";
  otherContent.style.display = "flex";
}

function days4() {
  var content = document.querySelector(".hiddencontent");
  var otherContent = document.querySelector(".hiddencontent_1");
  content.style.display = "flex";
  otherContent.style.display = "none";
  var active = document.querySelector(".active")
  active.style.background = "";

}
function days30() {
  var content = document.querySelector(".hiddencontent");
  var otherContent = document.querySelector(".hiddencontent_1");
  var main = document.querySelector(".hiddencontent_2")
  var active = document.querySelector(".active")
  active.style.background = "transparent";
  content.style.display = "none";
  otherContent.style.display = "none";
  main.style.display = "flex"
}


// <---- Fetching current weather data from the sql database using php--- >
insert_data('bhatpara')
document.querySelector(".search_bar").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      var x = document.querySelector(".search_bar").value;
        
  
      if (x.length === 0) {
        alert("please type city name");
      } else {
  
        insert_data(x);
        sick();
      }
    }
  });

  function search() {
    var x = document.querySelector(".search_bar").value;
    if (x.length === 0) {
      alert("please type city name");
    } else {
      insert_data(x);
      sick();
    }
  }

  //getting weather history of the city from the database

  document.querySelector(".view_previous").addEventListener("click", () => {
    var city_name = document.querySelector(".search_bar").value || 'bhatpara';
    fetch('https://nishant-jswl.serv00.net/history.php?city_name='+city_name)
    .then(Response => {
        if (Response.ok) {
            return Response.json();
        } else {
            throw new Error('Something went wrong');
        }
    } )

    .then(data => {
      console.log(data);

      const dayDivs = document.getElementsByClassName("day");
      const pressure = document.getElementsByClassName("pressure");
      const dateDivs = document.getElementsByClassName("date");
      const tempDivs = document.getElementsByClassName("temp");
      const imgElements = document.querySelectorAll(".popup-content img");

      for (let i = 0; i < 7; i++) {
        if (data[i]) {
          const dateString = data[i].dt;
          const dateParts = dateString.split("-");
          const year = parseInt(dateParts[0]);
          const month = parseInt(dateParts[1]) - 1;
          const day = parseInt(dateParts[2]);
          const date = new Date(year, month, day);
          const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
          dayDivs[i].textContent = dayOfWeek;
          dateDivs[i].innerHTML = '<i class="fa-solid fa-calendar fa-1x"></i> ' +data[i].dt;
          pressure[i].innerHTML = '<i class="fa-solid fa-gauge fa-1x"></i> ' + data[i].pressure+ " pa";
          tempDivs[i].innerHTML = '<i class="fa-solid fa-temperature-three-quarters fa-1x"> </i> ' + data[i].temp + "°C";

          var weat = imgElements[i];
          switch (data[i].main) {
            case "Clouds":
              weat.src = "https://media.discordapp.net/attachments/1191972726974459954/1191973288751136870/clouds.png?ex=65a762a1&is=6594eda1&hm=9f5012df006a78ced403e8f931649abbc27485792c94ba97dac592bd888b270a&=&format=webp&quality=lossless&width=280&height=280";
              break;
            case "Clear":
              weat.src = "https://media.discordapp.net/attachments/1191972726974459954/1191973288386252870/clear.png?ex=65a762a1&is=6594eda1&hm=ceeec857f76a635c2e9879f16e1612848d3e377b590421d058d63fb87f059bae&=&format=webp&quality=lossless&width=280&height=280";
              break;
            case "Haze":
              weat.src = "https://media.discordapp.net/attachments/1191972726974459954/1191973288973447248/drizzle.png?ex=65a762a1&is=6594eda1&hm=08605ca3cfe938de01cafcdf4abc7cda9338433cc8fa30e12cfba17426bef5fb&=&format=webp&quality=lossless&width=280&height=280";
              break;
            case "Mist":
              weat.src = "https://media.discordapp.net/attachments/1191972726974459954/1191973289195753472/humidity.png?ex=65a762a1&is=6594eda1&hm=bbc5337f23e9eeb4258fcdfe8512992aa2d66df07256bc1bccf7305ad72d0b8b&=&format=webp&quality=lossless&width=98&height=82";
              break;
            case "Rain":
              weat.src = "https://media.discordapp.net/attachments/1191972726974459954/1191973344254361712/rain.png?ex=65a762af&is=6594edaf&hm=8a582eae616132585dd53041a79a1f9563edcc12dac893a605633e93403df28d&=&format=webp&quality=lossless&width=280&height=280";
              break;
            case "Snow":
              weat.src = "https://media.discordapp.net/attachments/1191972726974459954/1191973344833191996/snow.png?ex=65a762af&is=6594edaf&hm=f64a2fa55e9d0b0c759c5672a39e11cec6c1c6cf9c1e0bfb52c166b80e24db08&=&format=webp&quality=lossless&width=280&height=280";
              break;
            default:
              weat.src = "no-data-available.png"; // default image if no data is available
              break;
          }
        } else {
          dayDivs[i].textContent = "No Data Available";
          dateDivs[i].textContent = "";
          tempDivs[i].textContent = "";
          pressure[i].textContent = "";
          imgElements[i].src = "https://media.discordapp.net/attachments/759245674549346364/1199695949279277066/no-connection.png?ex=65c37aeb&is=65b105eb&hm=3be2713e6960bededa060233bf9ad338e6b3bc1d783f24b68f83a049b6873810&=&format=webp&quality=lossless&width=565&height=565";
        }
      }
    })

    document.querySelector(".popup").style.display = "flex";
    document.querySelector(".container").style.visibility = "hidden";
    
  })

  function closePopup() {
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".container").style.visibility = "visible";
  }


async function insert_data(city_name) {
    await fetch(`https://nishant-jswl.serv00.net/insert.php?city_name=${city_name}`); 
    get_weather(city_name)
}

function get_weather(city_name){
    fetch('https://nishant-jswl.serv00.net/json.php?city_name='+city_name)
    .then(Response => {
        if (Response.ok) {
            return Response.json();
        } else {
            throw new Error('Something went wrong');
        }
    } )

    .then(data => {
        console.log(data)
        if(data && data.length >0){

          //getting data our API and displaying it in the html
            document.querySelector(".city").innerHTML = data[0].name
            document.querySelector(".temps").innerHTML = Math.ceil(data[0].temp) + '°C' 
            document.querySelector("#humi").innerHTML = data[0].humidity + ' %'
            // document.querySelector(".winds").innerHTML = data[0].wind.speed + ' km/h'
            // document.querySelector(".feels").innerHTML = data.list[0].main.feels_like + '°C'
            // document.querySelector("#gust").innerHTML = data.list[0].wind.gust + ' m/s'
            // document.querySelector("#sea").innerHTML = data.list[0].main.sea_level + ' m'
           
            // document.querySelector("#pressure").innerHTML = data.list[0].main.pressure + ' pa'

            //changing weather icon according to the weather
            var weat = document.querySelector(".weat")
            if (data[0].main == "Clouds") {
            weat.src = "https://media.discordapp.net/attachments/1191972726974459954/1191973288751136870/clouds.png?ex=65a762a1&is=6594eda1&hm=9f5012df006a78ced403e8f931649abbc27485792c94ba97dac592bd888b270a&=&format=webp&quality=lossless&width=280&height=280";
            }
            else if (data[0].main == "Clear") {
            weat.src = "https://media.discordapp.net/attachments/1191972726974459954/1191973288386252870/clear.png?ex=65a762a1&is=6594eda1&hm=ceeec857f76a635c2e9879f16e1612848d3e377b590421d058d63fb87f059bae&=&format=webp&quality=lossless&width=280&height=280";
            }
            else if (data[0].main == "Haze") {
            weat.src = "https://media.discordapp.net/attachments/1191972726974459954/1191973288973447248/drizzle.png?ex=65a762a1&is=6594eda1&hm=08605ca3cfe938de01cafcdf4abc7cda9338433cc8fa30e12cfba17426bef5fb&=&format=webp&quality=lossless&width=280&height=280";
            }
            else if (data[0].main == "Mist") {
            weat.src = "https://media.discordapp.net/attachments/1191972726974459954/1191973289195753472/humidity.png?ex=65a762a1&is=6594eda1&hm=bbc5337f23e9eeb4258fcdfe8512992aa2d66df07256bc1bccf7305ad72d0b8b&=&format=webp&quality=lossless&width=98&height=82";
            }
            else if (data[0].main == "Rain") {
            weat.src = "https://media.discordapp.net/attachments/1191972726974459954/1191973344254361712/rain.png?ex=65a762af&is=6594edaf&hm=8a582eae616132585dd53041a79a1f9563edcc12dac893a605633e93403df28d&=&format=webp&quality=lossless&width=280&height=280";
            }
            else if (data[0].main == "Snow") {
            weat.src = "https://media.discordapp.net/attachments/1191972726974459954/1191973344833191996/snow.png?ex=65a762af&is=6594edaf&hm=f64a2fa55e9d0b0c759c5672a39e11cec6c1c6cf9c1e0bfb52c166b80e24db08&=&format=webp&quality=lossless&width=280&height=280";
            }



            // getting day date time 
            const dateObject = new Date();
            const day = dateObject.toLocaleString('en-US', { weekday: 'long' });
            const numericDate = dateObject.toLocaleString('en-US', { day: 'numeric' });
            const month = dateObject.toLocaleString('en-US', { month: 'long' });
            const time = dateObject.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            console.log(day, time);
            document.querySelector(".day").innerHTML = day
            document.querySelector(".month").innerHTML = numericDate + ' ' + month
            document.querySelector(".time").innerHTML = time

             // description ko lagi yo 
            document.querySelector(".datass h1").innerHTML = `${capitalize(data[0].description)} with humidity ${data[0].humidity}%`

            //first letter capital banauna
            function capitalize(str) {
              return str.charAt(0).toUpperCase() + str.slice(1);
            }

            console.log(data[0].icon.includes('n'))
            //changing background image according to the day and night 
            if ((data[0].icon).includes('n')) {

              document.body.style.backgroundImage = 'url("https://yuriajones.com/cdn/shop/articles/Grand-Bay-Milky-Way.jpg?v=1623852101")'
              document.querySelector(".container").style.backgroundImage = 'url("https://yuriajones.com/cdn/shop/articles/Grand-Bay-Milky-Way.jpg?v=1623852101")';
        
            } else {
              document.body.style.backgroundImage = 'url("https://wallpapercave.com/wp/wp2010592.jpg")'
              document.querySelector(".container").style.backgroundImage = 'url("https://wallpapercave.com/wp/wp2010592.jpg")'
        
            }



        }else{
            alert("city not found")
        }
    })

    .catch(error => console.error('Error fetching data[0]:', error));
}



// <---- Getting 7 days , 14 days , and 30days forecast from the api --- >

async function sick() {

  var city_name = document.querySelector(".search_bar").value || 'bhatpara'
  if (city_name !== 'bhatpara' && city_name.trim() === '') {
    alert("please type city name!!")
  } else {
    var res = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city_name + '&appid=dae51a22a0a53f5d951028bbe72a6e3c&units=metric').catch(err => {
      console.error('Error:', err.message);
    })
    if (res.status == "404") {
      alert("city not found!")
    }
    var data = await res.json();

    
    document.querySelector(".winds").innerHTML = data.list[0].wind.speed + ' km/h'
    document.querySelector(".feels").innerHTML = data.list[0].main.feels_like + '°C'
    document.querySelector("#gust").innerHTML = data.list[0].wind.gust + ' m/s'
    document.querySelector("#sea").innerHTML = data.list[0].main.sea_level + ' m'
    document.querySelector("#pressure").innerHTML = data.list[0].main.pressure + ' pa'
    // console.log(data)

    

    // day check garna
    const d = new Date();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    function CheckDay(day) {
      const newDayValue = (day + d.getDay()) % 7;
      return newDayValue >= 0 ? newDayValue : newDayValue + 7;
    }

    // 4 days weather forecast 
    for (i = 0; i < 4; i++) {
      document.querySelector(".day" + (i + 1)).innerHTML = weekday[CheckDay(i)] + ', ' + '|Temp:' + data.list[i].main.temp_min + '°C'
    }

    //for 14 days forecast 
    for (i = 4; i <= 13; i++) {
      document.querySelector(".day" + (i + 1)).innerHTML = weekday[CheckDay(i)] + ',' + '|Temp:' + data.list[i].main.temp_min + '°C'

      document.querySelector("#day1").className = "fa-solid fa-cloud-moon"
      // if(weekday[CheckDay(i)] === undefined){
      //   console.log(`kuch toh gadbad he daya .. `,i)
      // }
    }

    // for 30 days forecast
    for (i = 14; i <= 30; i++) {
      document.querySelector(".day" + (i + 1)).innerHTML = weekday[CheckDay(i)] + ',' + '|Temp:'+ data.list[i].main.temp + '°C'
    }


  }
}






// default value suru mai dekhauna 
window.onload = function () {
  sick();
};