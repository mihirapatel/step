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

