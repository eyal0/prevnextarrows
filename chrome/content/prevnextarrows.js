if(!eyal0) var eyal0={};
if(!eyal0.prevnextarrows) eyal0.prevnextarrows={};

eyal0.prevnextarrows = {
  AdjustURL: function(current_url, delta_fx, quick) {
    var re_result = /(\d+)(\D*)$/.exec(current_url);
    if(re_result) {
      var old_num_str = re_result[1];
      var old_num = parseInt(old_num_str, 10);
      var new_num = delta_fx(old_num);
      var new_num_str = new_num.toString();
      var shorter = (old_num_str[0] != 0) && (old_num.toString().length > new_num_str.length);
      //assume that we need padding, make the new string
      while(new_num_str.length < old_num_str.length) { 
        new_num_str = "0" + new_num_str;
      }
      if(shorter && !quick) { //maybe pad
        var client = new XMLHttpRequest();
        client.open("HEAD", RegExp.leftContext + new_num_str + re_result[2], false);
        client.send(null);
        if(client.readyState != 4 || client.status != 200) //if we failed with padding
          new_num_str = new_num.toString(); //no padding
      }
      return(RegExp.leftContext + new_num_str + re_result[2]);
    }
    return("");
  },

  DoClick: function(event, newurl) {
    if(newurl.length == 0)
      return;
    if(event.button == 1) { //middle click
      var newTab = gBrowser.getBrowserForTab(gBrowser.addTab(newurl));
      newTab.addEventListener("load", function() { newTab.contentDocument.reload(true); }, true);
      //newTab.contentDocument.location = newurl;
      //gBrowser.addTab(newurl);
    } else if(event.button == 0) { //left click
      window.getBrowser().webNavigation.loadURI(newurl, 0, null, null, null);
    }
  },

  DoClickThumbs: function(event) {
    eyal0.prevnextarrows.DoClick(event, "chrome://prevnextarrows/content/gallery.html?" + window.content.document.location);
  },

  DoClickFirst: function(event) {
    eyal0.prevnextarrows.DoClick(event, eyal0.prevnextarrows.AdjustURL(window.content.document.location, function (x) {return(  1);}, 0));
  },

  DoClickPrev: function(event) {
    eyal0.prevnextarrows.DoClick(event, eyal0.prevnextarrows.AdjustURL(window.content.document.location, function (x) {return(x-1);}, 0));
  },

  DoClickNext: function(event) {
    eyal0.prevnextarrows.DoClick(event, eyal0.prevnextarrows.AdjustURL(window.content.document.location, function (x) {return(x+1);}, 0));
  }
};
