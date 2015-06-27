var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react/addons') : window.React

var Card = React.createClass({
  render: function(){
    return(
      <div className='col-xs-4 col-xs-offset-4 bootcamp'>
        <h3>{this.props.index + 1}. {this.props.bootcamp.name}</h3>
        <h3>{this.props.bootcamp.address}</h3>
        <img className='logo' src={this.props.bootcamp.imageUrl}></img>
        <h3>${this.props.bootcamp.price}</h3>
        <h3>{this.props.bootcamp.languages}</h3>
      </div>
    )
  }
})

var Main = React.createClass({
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
    var bootCampDivs = this.state.bootcamps.map(function(e, i){
      console.log(e);
      return <Card bootcamp={e} index={i} />
    })
    return (
      <div>
        {bootCampDivs}
      </div>
    )
  }
})

if (isNode) {
  exports.Main = Main
} else {
  React.render(<Main />, document.getElementById('react-root'))
}
