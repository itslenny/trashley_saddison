var React = require('react');
var ResultList = require('./ResultList');
var ResultDetails = require('./ResultDetails');

module.exports = React.createClass({
  getInitialState: function(){
    return {activePerson:false,quote:''};
  },
  componentDidMount: function(){
    var self = this;
    var lastLoad = new Date();
    window.addEventListener('scroll',function(e){
      var thisLoad = new Date();
      if(thisLoad - lastLoad < 500) return;
      if(window.pageYOffset + getWindowHeight() + 50 > getDocHeight()){
        lastLoad = new Date();
        self.refs.womens.loadMatches(true);
        self.refs.mens.loadMatches(true);
      }
    });
  },
  hidePerson: function() {
    this.setState({activePerson:false})
  },
  showPerson: function(person, location){
    this.setState({activePerson:{person:person,location:location}});
    this.loadQuote(person);
  },
  loadQuote: function(person) {
    var self = this;

    var ajax = new XMLHttpRequest();
    ajax.addEventListener('load',function(){
      try {
        var data = JSON.parse(this.responseText);
        self.setState({quote:data.value.joke});
      } catch(e) {
        console.log('error',e);
        self.setState({quote:''});
      }
    });
    ajax.open('GET','/api/quote?f=' + person.name.first +'&l=' + person.name.last, true);
    ajax.send();
  },
  refresh: function(e){
    this.refs[e.target.dataset.which].loadMatches();
  },
  render: function(){
    return (
      <div className="container">
        <h1>Trashley Saddison</h1>
        <ResultDetails quote={this.state.quote} data={this.state.activePerson} dismiss={this.hidePerson} />
        <div className="row">
          <div className="col-sm-6">
            <h3>Find women in your area <button data-which="womens" onClick={this.refresh} className="btn btn-success btn-xs glyphicon glyphicon-refresh"></button></h3>
            <ResultList ref="womens" onSelect={this.showPerson} gender="female" />
          </div>
          <div className="col-sm-6">
          <h3>Find men in your area <button data-which="mens" onClick={this.refresh} className="btn btn-success btn-xs glyphicon glyphicon-refresh"></button></h3>
            <ResultList ref="mens" onSelect={this.showPerson} gender="male" />
          </div>
        </div>
      </div>
    )
  }
});



function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight, D.documentElement.scrollHeight,
    D.body.offsetHeight, D.documentElement.offsetHeight,
    D.body.clientHeight, D.documentElement.clientHeight
  );
}

function getWindowHeight() {
  var w=window,
  d=document,
  e=d.documentElement,
  g=d.getElementsByTagName('body')[0];
  return w.innerHeight||e.clientHeight||g.clientHeight;
}