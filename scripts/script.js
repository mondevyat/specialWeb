(function () {
    let flag = true;
    let object1 = {};
    let object2 = {};
    let state =  document.getElementById('container').value;

      var xhr = new XMLHttpRequest();
      
      xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', false);
      
      xhr.send();
      
      if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
      } else {
        
        object1 = JSON.parse(xhr.response);

        for (i = 0; i < object1.length; i++)
        {
          var newDiv = document.createElement("div");
          topDiv = document.createElement("div");
          commDiv = document.createElement("div");
          textDiv = document.createElement("div");
          newButton = document.createElement("button");

          my_div = document.getElementById("container");

          titleP = document.createTextNode(object1[i].id + ". " + object1[i].title);
          bodyP = document.createTextNode(object1[i].body);

          titleP.innerHTML = '<strong></strong>';
          newButton.innerHTML = 'Комментарии';

          newDiv.id = 'post';
          topDiv.id = 'top';
          commDiv.id = 'comms' + parseInt(i+1);
          newButton.id = 'comment ' + parseInt(i+1);
          newButton.setAttribute("onclick", "loadComment("+ parseInt(i+1) +")");

          newDiv.appendChild(topDiv);
          topDiv.appendChild(titleP);
          topDiv.appendChild(bodyP);
          topDiv.appendChild(newButton);
          newDiv.appendChild(commDiv);
          my_div.appendChild(newDiv);
        }
      }
      console.log(object1);
})();

function loadComment(i) {

    console.log((document.getElementById("comms" + i).hasChildNodes()));
    if (!(document.getElementById("comms" + i).hasChildNodes())) {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/' + i + '/comments', false);
      
      xhr.send();
      
      if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
      } else {
        object2 = JSON.parse(xhr.response);
        for (j = 0; j < object2.length; j++)
        {
         
          var comms = document.getElementById("comms" + i);

          nameP = document.createElement("p");
          commP = document.createElement("p");

          nameP.id = 'name';
          commP.id = 'commentary';
          
          comms.appendChild(nameP);
          comms.appendChild(commP);

          nameP.innerHTML = object2[j].name;
          commP.innerHTML = object2[j].body;

        }
      }
      console.log(object2);
    }
    else {
      for (j = 0; j < object2.length; j++)
        {
          var comms = document.getElementById("comms" + i);
          nameP = document.getElementById("name");
          commP = document.getElementById("commentary");
          
          nameP.remove();
          commP.remove();
        }
    }
}