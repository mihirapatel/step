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
    var value = quantity.options[quantity.selectedIndex].value
    return value
}

/** Creates an <li> element containing text. */
function createListElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.innerText = comment.userComment;
  return commentElement;
}

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

  const bobaGuys = new google.maps.Marker({
    position: {lat: 37.772878, lng: -122.423458},
    map: map,
    title: 'Boba Guys'
  });
  
  const pizzeriaDelfina = new google.maps.Marker({
    position: {lat: 37.761450, lng: -122.424266},
    map: map,
    title: 'Pizzeria Delfina'
  });

  const doloresPark = new google.maps.Marker({
    position: {lat: 37.760180, lng: -122.427123},
    map: map,
    title: 'Dolores Park'
  });

  const biriteCreamery = new google.maps.Marker({
    position: {lat: 37.761802, lng: -122.425417},
    map: map,
    title: 'Bi-Rite Creamery'
  });

  const kirbyCoveBeach = new google.maps.Marker({
    position: {lat: 37.827276, lng: -122.489582},
    map: map,
    title: 'Kirby Cove Beach'
  });

  const bakerBeach = new google.maps.Marker({
    position: {lat: 37.793653, lng: -122.483663},
    map: map,
    title: 'Baker Beach'
  });
}

