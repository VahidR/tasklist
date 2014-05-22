/*
*  A wrapper class around HTML5's localStorage object
*/
function AppStorage(appName){
  var prefix = (appName ? appName + "." : ""); //prefix the keys wih app name .. collision avoidance

  this.localStorageSupported = (('localStorage' in window) && window['localStorage']); // browser support query

  this.setValue = function(key, value) {
    if(this.localStorageSupported)
      localStorage.setItem(prefix + key, JSON.stringify(value));
    return this;
  };

  this.getValue = function(key) {
    if(this.localStorageSupported){
      return JSON.parse(localStorage.getItem(prefix + key));
    }else{
      return null;
    }
  };

  this.removeValue = function(key){
    if(this.localStorageSupported)
      localStorage.removeItem(prefix + key);
    return this;
  };

  this.removeAll = function(){
    var keys = this.getKeys(); // get all of keys for 'this' specific app's db..
    for(var i in keys)
      this.remove(keys[i]);
    return this;
  };

  this.getKeys = function(filter){
    var keys = [];
    if(this.localStorageSupported){
      for(var key in localStorage){
        if(isAppKey(key)){
          if(prefix) key = key.slice(prefix.length); // remove prefix from key
          if(!filter || filter(key)) keys.push(key); // check the filter
        }
      }
    }
    return keys;
  };

  function isAppKey (key) {
    if(prefix)
      return key.indexOf(prefix) === 0;
    return true;
  }

  this.contains = function(key){
    return this.get(key) !== null;
  };


}
