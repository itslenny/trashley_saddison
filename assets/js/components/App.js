var React = require('react');
var ResultList = require('./ResultList');
var ResultDetails = require('./ResultDetails');
var helpers = require('../helpers');

module.exports = React.createClass({
  getInitialState: function(){
    return {activePerson:null,quote:'',modalOffset:0};
  },
  scroll: function(e){
    var self = this;
    var thisLoad = new Date();
    if(thisLoad - this.lastLoad < 500) return;
    if(window.pageYOffset + helpers.dom.getWindowHeight() + 20 > helpers.dom.getDocumentHeight()){
      this.lastLoad = new Date();
      self.refs.womens.loadMatches(true);
      self.refs.mens.loadMatches(true);
    }
  },
  componentDidMount: function(){
    this.lastLoad = new Date();
    window.addEventListener('scroll', this.scroll);
  },
  componentWillUnmount: function(){
    window.removeEventListener('scroll', this.scroll);
  },
  hidePerson: function() {
    this.setState({activePerson:null})
  },
  showPerson: function(person, location){
    this.setState({
      //move the modal to the scroll position
      modalOffset: window.pageYOffset,
      activePerson:{person:person,location:location}
    });
    this.loadQuote(person);
  },
  loadQuote: function(person) {
    var self = this;
    var url = '/api/quote?f=' + person.name.first +'&l=' + person.name.last;
    helpers.ajax.get(url, function(){
      try {
        var data = JSON.parse(this.responseText);
        var joke = data.value.joke;
        joke = joke.replace(/&quot;/ig,'"');
        if(person.gender == 'female'){
          joke = joke.replace(/\bhim\b/ig,'her');
          joke = joke.replace(/\bhe\b/ig,'she');
          joke = joke.replace(/\bhis\b/ig,'her');
        }
        self.setState({quote:joke});
      } catch(e) {
        console.log('error',e);
        self.setState({quote:''});
      }
    })

  },
  refresh: function(e){
    this.refs[e.target.dataset.which].loadMatches();
  },
  render: function(){
    return (
      <div className="container">
        <h1>Trashley Saddison</h1>
        <ResultDetails offsetTop={this.state.modalOffset} quote={this.state.quote} data={this.state.activePerson} dismiss={this.hidePerson} />
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