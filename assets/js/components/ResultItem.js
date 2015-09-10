var React = require('react');

module.exports = React.createClass({
  select: function(e){
    e.preventDefault();
    this.props.onSelect(this.props.person.user, this.props.location);
  },
  render: function(){
    var user = this.props.person.user;
    var location = this.props.location;

    return (
      <div className="col-sm-6">
        <a href="#" onClick={this.select} className="thumbnail">
          <img src={user.picture.medium} />
          <div className="caption text-center">
            <b>{user.name.first} {user.name.last}</b><br />
            {location.city}, {location.region}
          </div>
        </a>
      </div>
    );
  }
});