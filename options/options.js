function saveOptions(e) {

var mandantenliste = [];



  
  browser.storage.sync.set({
    mandantenliste: mandantenliste
  });
  console.log("saveOptions");
  e.preventDefault();
  
}



function restoreOptions() {
 var storageItem = browser.storage.managed.get('mandantenliste');
  storageItem.then((mandantenliste) => {
    
    if (mandantenliste && mandantenliste.length > 0) {
        mandantenliste.forEach(mandant =>
          {
              addConfigItem(mandant.live,mandant.aem);
          });
      }
        addConfigItem("", "");



  });



/*
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
          ,
          { 
            live: "https://www.iis.fraunhofer.de/",
            aem: "https://www2.iis.fraunhofer.de/"
          }
        ]
  

mandantenliste.forEach(mandant =>
          {
              addConfigItem(mandant.live,mandant.aem);
          });
*/

}


function addConfigItem(live,aem){
    var template = document.querySelector("#mandant-settings-template").content.querySelector("div");
    console.log(template);
    var node = document.importNode(template, true);
    node.querySelector(".url-input-live").value=live;
    node.querySelector(".url-input-aem").value=aem;

    console.log(node);
    console.log(document.querySelector(".options-container"));
    document.querySelector(".options-container").appendChild(node);
}



document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#add").addEventListener("click", addConfigItem);

console.log(document.querySelector("#add"));