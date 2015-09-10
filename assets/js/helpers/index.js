module.exports = {
  /////////////////// DOM
  dom:{
    getDocumentHeight: function() {
      var D = document;
      return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
      );
    },
    getWindowHeight: function() {
      var w=window,
      d=document,
      e=d.documentElement,
      g=d.getElementsByTagName('body')[0];
      return w.innerHeight||e.clientHeight||g.clientHeight;
    }
  },
  /////////////////// time
  time:{
    //birthday is a date object, returns an age in years.
    calculateAge: function (birthday) {
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  },
  /////////////////// ajax
  ajax:{
    get: function(url, callback){
      var ajax = new XMLHttpRequest();
      ajax.addEventListener('load',callback);
      ajax.open('GET',url , true);
      ajax.send();
    }
  }
}