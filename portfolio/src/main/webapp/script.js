// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//Shows comments left on page
function getComments() {
    var quantity = getQuantity();

    fetch('/comments?quantity='+ quantity).then(response => response.json()).then((comments) => {
        // Build the list of history entries.
        const commentElement = document.getElementById('comment-list');
        commentElement.innerHTML = '';
        for (var i=0; i < comments.length; i++) {
            commentElement.appendChild(createListElement(comments[i]));
        }
    });
}

// Gets amount of comments to display
function getQuantity() {
    var quantity = document.getElementById("quantity");
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("quantity", quantity);
    } else {
        quantity = sessionStorage.getItem("quantity")
    }
    return quantity.options[quantity.selectedIndex].value
}


/** Creates an <li> element containing text. */
function createListElement(comment) {
    // const nameElement = document.createElement('li');
    const commentElement = document.createElement('li');
    commentElement.innerText = comment.userName + ": " + comment.userComment;
    return commentElement;
}

/** Creates an <td> element containing text. */
// function createListElement(comment) {
//     const commentElement = document.createElement('td');
//     commentElement.innerText = comment.userComment;
//     return commentElement;
// }

// Deletes all comments 
function deleteComments() {
    fetch('/delete-data', {method: 'POST'}).then(getComments)
}

/** Creates a map and adds it to the page. */
function createMap() {
    var myLatlng = new google.maps.LatLng(37.788655, -122.449772);
    var mapOptions = {
        zoom: 13,
        center: myLatlng,
    };
    const map = new google.maps.Map(
        document.getElementById('map'),
        mapOptions);

    // Boba Guys 
    const bobaGuysInfoWindow =
        new google.maps.InfoWindow({content: 'This is my favorite boba place.'});

    const bobaGuysMarker = new google.maps.Marker({
        position: {lat: 37.772878, lng: -122.423458},
        map: map,
        title: 'Boba Guys'
    });
    bobaGuysMarker.addListener('click', function() { bobaGuysInfoWindow.open(map, bobaGuysMarker);});

    // Pizzeria Delfina
    const pizzeriaDelfinaInfoWindow =
        new google.maps.InfoWindow({content: 'This is my favorite pizza place.'});

    const pizzeriaDelfinaMarker = new google.maps.Marker({
    position: {lat: 37.761450, lng: -122.424266},
    map: map,
    title: 'Pizzeria Delfina'
    });
    pizzeriaDelfinaMarker.addListener('click', function() { pizzeriaDelfinaInfoWindow.open(map, pizzeriaDelfinaMarker);});

    // Dolores Park
    const doloresParkInfoWindow =
        new google.maps.InfoWindow({content: 'This is a great hang-out spot.'});

    const doloresParkMarker = new google.maps.Marker({
    position: {lat: 37.760180, lng: -122.427123},
    map: map,
    title: 'Dolores Park'
    });
    doloresParkMarker.addListener('click', function() { doloresParkInfoWindow.open(map, doloresParkMarker);});

    // Dolores Park
    const biriteCreameryInfoWindow =
        new google.maps.InfoWindow({content: 'This is a great ice cream shop.'});

    const biriteCreameryMarker = new google.maps.Marker({
    position: {lat: 37.761802, lng: -122.425417},
    map: map,
    title: 'Bi-Rite Creamery'
    });
    biriteCreameryMarker.addListener('click', function() { biriteCreameryInfoWindow.open(map, biriteCreameryMarker);});

    // Kirby Cove Beach
    const kirbyCoveBeachInfoWindow =
        new google.maps.InfoWindow({content: 'This is a fun beach.'});
    const kirbyCoveBeachMarker = new google.maps.Marker({
    position: {lat: 37.827276, lng: -122.489582},
    map: map,
    title: 'Kirby Cove Beach'
    });
    kirbyCoveBeachMarker.addListener('click', function() { kirbyCoveBeachInfoWindow.open(map, kirbyCoveBeachMarker);});

    //Baker Beach
    const bakerBeachInfoWindow =
        new google.maps.InfoWindow({content: 'This is a great beach with of view of the Golden Gate.'});
    const bakerBeachMarker = new google.maps.Marker({
    position: {lat: 37.793653, lng: -122.483663},
    map: map,
    title: 'Baker Beach'
    });
    bakerBeachMarker.addListener('click', function() { bakerBeachInfoWindow.open(map, bakerBeachMarker);});
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/** Creates a chart and adds it to the page. */
function drawChart() {
    // Computer Sciences
    const computerScienceData = new google.visualization.DataTable();
    computerScienceData.addColumn('string', 'Gender');
    computerScienceData.addColumn('number', 'Percentage');
            computerScienceData.addRows([
            ['Female', 19],
            ['Male', 81],

            ]);

    const computerScienceOptions = {
        'title': 'Female vs. Male Students in Computer Science Courses',
        'width':500,
        'height':400
    };

    const computerScienceChart = new google.visualization.PieChart(
        document.getElementById('computer-chart-container'));
    computerScienceChart.draw(computerScienceData, computerScienceOptions);

    // Engineering and Technology 
    const engineeringData = new google.visualization.DataTable();
    engineeringData.addColumn('string', 'Gender');
    engineeringData.addColumn('number', 'Percentage');
            engineeringData.addRows([
            ['Female', 19],
            ['Male', 81],

            ]);

    const engineeringOptions = {
        'title': 'Female vs. Male Students in Engineering and Technology Courses',
        'width':500,
        'height':400
    };

    const engineeringChart = new google.visualization.PieChart(
        document.getElementById('engineering-chart-container'));
    engineeringChart.draw(engineeringData, engineeringOptions);
}

