/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false)
function onBatteryStatus(status) {
    //Battery
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
    var batteryStatus
    if(status.isPlugged == true) {
        batteryStatus = 'En charge'
    }
    else {
        batteryStatus = 'Non branché'
    }
    var batteryDiv = document.getElementById('battery')
    batteryDiv.innerHTML = `Batterie : ${status.level}% | ${batteryStatus}`
    //StatusBar
    console.log(StatusBar)
}

var selectedTopData = ''
if(localStorage.topDatas) {
    var topData = JSON.parse(localStorage.getItem('topDatas'))
    var topListDiv = document.getElementById('topList')
    for(i=0; i<topData.length;i++) {
        var cardHTML = "<div class='card bg-dark text-white' style='width: 18rem;'> <img class='card-img-top' src='"+topData[i].url+"' alt='Card image cap'> <div class='card-body'> <h5 class='card-title my-3' class='selectedTopData'>"+ topData[i].title +"</h5> <p class='card-text'> <a href='#'  value='"+i+"' class='btn btn-primary selectTop'>Voir le top</a> </div> </div>"
        topListDiv.insertAdjacentHTML('beforeend',cardHTML)
    }
}

var topDatas = []
topDatas = JSON.parse(localStorage.getItem('topDatas')) || [];

var topsDiv = document.getElementById('tops')
var creationDiv = document.getElementById('creation')
var topInfos = document.getElementById('top-infos')
var addButton = document.getElementById('add')
var creationBackButton = document.getElementById('creationBackButton')
var topinfosBackButton = document.getElementById('topinfosBackButton')
var formSubmit = document.getElementById('formSubmit')
var selectTop = document.getElementsByClassName('selectTop')

for(i=0;i<selectTop.length;i++) {
    selectTop[i].onclick = (e) => {
        var selectedId = e.target.getAttribute('value')
        selectedTopData = selectedId
        creationDiv.style.display = "none"
        topsDiv.style.display="none"
        topInfos.style.display="block"
        var topData = JSON.parse(localStorage.getItem('topDatas'))
        var titleSelectedTop = document.getElementById('titleSelectedTop')
        titleSelectedTop.innerHTML = topData[selectedId].title
        var topInfosDiv = document.getElementById('top-infos-list')
        topInfosDiv.innerHTML= ''
        var cardTop1 = "<div class='card' style='width: 18rem;'> <img class='card-img-top' src='"+topData[selectedId].url1+"' alt='Top1'> <div class='card-body  bg-dark text-white'> <h5 class='card-title my-3' class='selectedTopData'>Top 1 :" + topData[selectedId].title1 +"</h5> </div> </div>"
        var cardTop2 = "<div class='card' style='width: 18rem;'> <img class='card-img-top' src='"+topData[selectedId].url2+"' alt='Top2'> <div class='card-body  bg-dark text-white'> <h5 class='card-title my-3' class='selectedTopData'>Top 2 :" + topData[selectedId].title2 +"</h5> </div> </div>"
        var cardTop3 = "<div class='card' style='width: 18rem;'> <img class='card-img-top' src='"+topData[selectedId].url3+"' alt='Top3'> <div class='card-body  bg-dark text-white'> <h5 class='card-title my-3' class='selectedTopData'>Top 3 :" + topData[selectedId].title3 +"</h5> </div> </div>"
        var cardTop4 = "<div class='card' style='width: 18rem;'> <img class='card-img-top' src='"+topData[selectedId].url4+"' alt='Top4'> <div class='card-body  bg-dark text-white'> <h5 class='card-title my-3' class='selectedTopData'>Top 4 :" + topData[selectedId].title4 +"</h5> </div> </div>"
        var cardTop5 = "<div class='card' style='width: 18rem;'> <img class='card-img-top' src='"+topData[selectedId].url5+"' alt='Top5'> <div class='card-body  bg-dark text-white'> <h5 class='card-title my-3' class='selectedTopData'>Top 5 :" + topData[selectedId].title5 +"</h5> </div> </div>"
        topInfosDiv.insertAdjacentHTML('beforeend',cardTop1)
        topInfosDiv.insertAdjacentHTML('beforeend',cardTop2)
        topInfosDiv.insertAdjacentHTML('beforeend',cardTop3)
        topInfosDiv.insertAdjacentHTML('beforeend',cardTop4)
        topInfosDiv.insertAdjacentHTML('beforeend',cardTop5)
    }    
}

addButton.onclick = add
creationBackButton.onclick = creationBack
topinfosBackButton.onclick = creationBack

formSubmit.onclick = (e) => {
    e.preventDefault
    var title = document.getElementById("titleInput").value
    var url = document.getElementById("urlInput").value
    var title1 = document.getElementById("titleInput1").value
    var url1 = document.getElementById("urlInput1").value
    var title2 = document.getElementById("titleInput2").value
    var url2 = document.getElementById("urlInput2").value
    var title3 = document.getElementById("titleInput3").value
    var url3 = document.getElementById("urlInput3").value
    var title4 = document.getElementById("titleInput4").value
    var url4 = document.getElementById("urlInput4").value
    var title5 = document.getElementById("titleInput5").value
    var url5 = document.getElementById("urlInput5").value
    var data = {
        title: title,
        url: url,
        title1: title1,
        url1: url1,
        title2: title2,
        url2: url2,
        title3: title3,
        url3: url3,
        title4: title4,
        url4: url4,
        title5: title5,
        url5: url5
    }
    topDatas.push(data)
    localStorage.setItem( 'topDatas',JSON.stringify(topDatas))
    creationBack()
    location.reload()
}

function creationBack() {
    creationDiv.style.display = "none"
    topsDiv.style.display="block"
    topInfos.style.display="none"
}

function add() {
    creationDiv.style.display = "block"
    topsDiv.style.display="none"
    topInfos.style.display="none"
}
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    window.addEventListener("batterystatus", onBatteryStatus, false);
    //document.getElementById('deviceready').classList.add('ready');
}
