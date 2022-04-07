function loadTimeLine()
{
  $.ajax({
      url: "timeline_events.json",
      type: 'get',
      dataType: "json",
      success: function(data) {
        var ul = document.getElementById("timeline-ul");
        for (var myEvent = data.length; myEvent-- ;)
        {
          var li = document.createElement("li");
          li.classList.add('event');
          li.setAttribute('data-date', data[myEvent]['date']);
          var h3=document.createElement("h3");
          h3.innerHTML = data[myEvent]['title'];
          var p=document.createElement("p");
          p.innerHTML = data[myEvent]['body'];
          li.appendChild(h3);
          li.appendChild(p);
          ul.appendChild(li);
        }
        ul.innerHTML = ul.innerHTML.replace(/amp;/g, '');
      }
    });
}

function linkCallbackYielder(fileName)
{
  return function() {
    $.ajax({
        url: "content_" + fileName + ".html",
        type: 'get',
        dataType: 'html',
        success: function(data) {
            var el = document.createElement( 'html' );
            el.innerHTML = data;
            var h1s = el.getElementsByTagName("h1");
            for (var i = 0; i < h1s.length; i++) 
            {
              var h1 = h1s[i];
              $("#content-title").html(h1.outerHTML);
              h1.remove();
            }
            $("#content-main").html(el.getElementsByTagName("body")[0].innerHTML);

            /* Special features */
            if(fileName == "home")
            {
              $('#timeline-ul').show();
              loadTimeLine();
            }
        } 
     });
    return false;
  }
}

function getCurrentURLParams()
{
  var GET = {};
  var query = window.location.search.substring(1).split("&");
  for (var i = 0, max = query.length; i < max; i++)
  {
      if (query[i] === "") // check for trailing & with no param
          continue;

      var param = query[i].split("=");
      GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }
  return GET;
}

window.onload = function() {
  // Create all the menu links
  var linkList = ["home", "CV", "publications", "teaching", "line_recons", "metro", "minutes_loose"];

  // Load the requested content
  var GET = getCurrentURLParams();
  if(!("page" in GET)) {
    linkCallbackYielder("home")();
  }
  else {
    if(linkList.indexOf(GET.page) >=0) {
      linkCallbackYielder(GET.page)();
    }
    else {
      linkCallbackYielder("home")();
    }
  }
}

//Open menu function
function openNav() {
    document.getElementById("menu-panel").style.width = "140px";
    document.getElementById("title-container").style.width = "140px";
    document.getElementById("title-container").style.fontSize = "unset";
    $('.social-pict').css('width', '20px');
    $('.menu_link').css('font-size', 'initial');
}

//Close menu function
function closeNav() {
    document.getElementById("menu-panel").style.width = "0";
    document.getElementById("title-container").style.width = "0";
    document.getElementById("title-container").style.fontSize = "0";
    $('.social-pict').css('width', '0px');
    $('.menu_link').css('font-size', '0px');
}
