var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react/addons') : window.React

var Card = React.createClass({
  render: function(){
    return(
      <div>
        <h3>{this.props.bootcamp.name}</h3>
        <h3>{this.props.bootcamp.address}</h3>
        <h3>{this.props.bootcamp.imageurl}</h3>
        <h3>{this.props.bootcamp.price}</h3>
        <h3>{this.props.bootcamp.languages}</h3>
      </div>
    )
  }
})

var HelloMessage = React.createClass({
  getInitialState: function () {
    return {bootcamps: []}
  },

  loadServerData: function(){
    var bootcamps;
    var app = this;
    $.get('http://bootcampapi.herokuapp.com/bootcamps', function(result) {
      bootcamps = result;
      app.setState({bootcamps: bootcamps});
    });
  },

  componentDidMount: function () {
    this.loadServerData();
  },

  handleClick: function () {
    alert('You clicked!')
  },

  render: function() {
    console.log('ksjdjfhksahdf', this.state.bootcamps);
    var bootCampDivs = this.state.bootcamps.map(function(e){
      return <Card bootcamp={e}/>
    })
    console.log(bootCampDivs)
    return (
      <div>
        {bootCampDivs}
      </div>
    )
  }
})

if (isNode) {
  exports.HelloMessage = HelloMessage
} else {
  React.render(<HelloMessage />, document.getElementById('react-root'))
}
