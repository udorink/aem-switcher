

function callOnActiveTab(callback) {
    getCurrentWindowTabs().then((tabs) => {
      for (var tab of tabs) {
        if (tab.active) {
          callback(tab, tabs);
        }
      }
    });
}
function getCurrentWindowTabs() {
  return browser.tabs.query({currentWindow: true});
}
function lg(string) {
   console.log(string);
}
function changeUrlAndOpenTab(baseUrlBefore, baseUrlAfter, myurl)
{
          myurl = myurl.replace(baseUrlBefore, baseUrlAfter);
          browser.tabs.create({url: myurl});
}

main = function() {

    callOnActiveTab((tab) => {
     
      var myurl = tab.url;
      var mandantenliste = [
        { 
          live: "https://www.iis.fraunhofer.de/",
          aem: "https://www2.iis.fraunhofer.de/"
        }
        ,
        { 
          live: "https://www.iis.fraunhofer.de/",
          aem: "https://www2.iis.fraunhofer.de/"
        }

      ]

        var mandant = mandantenliste.find(mandant => 
        {
          return myurl.indexOf(mandant.live)==0;
        });
        if (mandant) {
          changeUrlAndOpenTab(mandant.live, mandant.aem, myurl);
        }
        else
        {
            mandant = mandantenliste.find(mandant => 
            {
              return myurl.indexOf(mandant.aem)==0;
            });
            if (mandant) {
              changeUrlAndOpenTab(mandant.aem, mandant.live, myurl);
            }
        }
    }
    );

}
browser.browserAction.onClicked.addListener(main);







