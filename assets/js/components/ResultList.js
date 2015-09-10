var React = require('react');
var ResultItem = require('./ResultItem');


module.exports = React.createClass({
  getInitialState: function() {
    return {results:{},loading:false}
  },
  componentWillMount: function() {
    this.loadMatches();
  },
  loadMatches: function(append) {
    this.setState({loading:true});
    var self = this;
    var gender = this.props.gender;
    var ajax = new XMLHttpRequest();
    ajax.addEventListener('load',function(){
      try {
        var data = JSON.parse(this.responseText);
        if(append && data.people){
          data.people.results = self.state.results.people.results.concat(data.people.results);
        }
        self.setState({results:data,loading:false});
      } catch(e) {
        console.log('error',e);
        self.setState({results:{}});
      }
    });
    ajax.open('GET','/api/matches?want=' + gender, true);
    ajax.send();
  },

  render: function(){
    var location = this.state.results.location;
    var self = this;
    if(this.state.results.people){
      var people = this.state.results.people.results.map(function(person, idx){
        return <ResultItem onSelect={self.props.onSelect} key={idx} person={person} location={location} />
      });
    }else{
      var people='';
    }
    var loading = this.state.loading ? <div className="alert alert-info">Loading matches...</div> : '' ;

    return (
      <div>
        <div className="row">
          {people}

        </div>
        <div className="row">
          {loading}
        </div>
      </div>
    );
  }
});