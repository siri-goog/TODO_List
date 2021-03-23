//Get to-do list from database
$(document).ready(function(){
  let link = '/todo/loadTodo'
  $.getJSON(link)
  .then(data => {
    if(data.data !== "") {
      console.log(data)
      for (let i=0; i<data.data.length; i++) {
        var listTodo = $('body').find('#listTodo')
        var itemTodo = $('<li>')
        itemTodo.prop('id', data.data[i].todo_id)
        itemTodo.text(data.data[i].description)
        listTodo.append(itemTodo)

        var iconClose = $('<span>')
        iconClose.prop('class', "close")
        iconClose.text("\u00D7")
        itemTodo.append(iconClose)

        /*var li = document.createElement("li")
        var inputValue = data.data[i].description
        var title = document.createTextNode(inputValue)
        li.appendChild(title)
        document.getElementById("listTodo").appendChild(li)

        var span = document.createElement("SPAN")
        var txt = document.createTextNode("\u00D7")
        span.className = "close"
        span.appendChild(txt)
        li.appendChild(span)*/
      }

      for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
          var item = this.parentElement;
          //item.style.display = "none";
          console.log(item)
          fetch('/todo/deleteTodo/'+item.id, {method: 'POST'})
          .then(function(response) {
            if(response.ok) {
              console.log('Item was deleted');
              return;
            }
            throw new Error('Request failed');
          })
          .catch(function(error) {
            console.log(error);
          });
        }
      }
    } 
  })
  .catch(err => {
    console.log(err)
  });
})

// Add new to-do (Create a new list item when clicking on the "Add" button)
/*function addTodo() {
  var li = document.createElement("li");

  var inputValue = document.getElementById("title").value;
  var title = document.createTextNode(inputValue);
  li.appendChild(title);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("listTodo").appendChild(li);
  }
  document.getElementById("title").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
  
}*/

// Close button (Create a "close" button and append it to each list item)
var todolist = document.getElementsByTagName("li");
var i;
for (i = 0; i < todolist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  todolist[i].appendChild(span);
}

// Delete item (Click on a close button to hide the current list item)
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Check Completed item (Add a "checked" symbol when clicking on a list item)
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);