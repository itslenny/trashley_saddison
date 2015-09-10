var React = require('react');
var helpers = require('../helpers');

module.exports = React.createClass({
  contact: function(){
    alert('this is the part where you enter your credit card number and I steal your money.');
  },
  render: function(){
    if(!this.props.data) return <div />;

    var person = this.props.data.person;
    var location = this.props.data.location;

    var phone = person.phone.replace('-',' ').substr(0,10)+'????';
    var email = person.email.substr(0,3)+'???????@?????.???'
    var response = '' + (parseInt(Math.random() * 50 ) + 50)+'%';
    var dobJs = new Date(person.dob * 1000);
    var age = helpers.time.calculateAge(dobJs);
    if(age < 18){
      dobJs.setFullYear(dobJs.getFullYear()-15);
      age = helpers.time.calculateAge(dobJs);
    }
    var dob = (dobJs.getMonth()+1)+'/'+dobJs.getDay()+'/'+dobJs.getYear();
    var modalStyle = {marginTop:this.props.offsetTop};

    //html and javascript living together in harmony
    //this makes me uncomfortable.
    //it reminds me of old PHP (not in a good way)

    var row = function(title,data){
      return (
        <tr>
          <td>{title}</td>
          <td>{data}</td>
        </tr>
      );
    };

    return (
      <div style={modalStyle} className="modal show">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button onClick={this.props.dismiss} type="button" className="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
              <h4 className="modal-title">Want to meet {person.name.first}?</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-5">
                  <img src={person.picture.large} className="img-responsive" />
                </div>
                <div className="col-sm-7">
                  <table className="table">
                    {row('First Name',person.name.first)}
                    {row('Last Name',person.name.last)}
                    {row('Username',person.username)}
                    {row('Birthday', dob)}
                    {row('age', age)}
                    {row('City',location.city)}
                    {row('State',location.region)}
                    {row('Phone',phone)}
                    {row('Email',email)}
                    {row('Response Rate', response)}
                    {row('Interesting Fact', this.props.quote)}
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={this.props.dismiss} type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button onClick={this.contact} type="button" className="btn btn-success">Contact</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});