var isNode = typeof module !== 'undefined' && module.exports;
var React = isNode ? require('react/addons') : window.React;
// var Router = require('react-router');
//   var Route = Router.Route;
//
// // declare our routes and their hierarchy
// var routes = (
//   <Route handler={App}>
//     <Route path="list" handler={List}/>
//     <Route path="test" handler={Test}/>
//   </Route>
// );

var Card = React.createClass({

  render: function(){
    return(
      <div className='col-xs-4 col-xs-offset-4 bootcamp'>
        <h3>{this.props.index + 1}. <a href='#'>{this.props.bootcamp.name}</a></h3>
        <h3>{this.props.bootcamp.address}</h3>
        <img className='logo' src={this.props.bootcamp.imageUrl}></img>
        <h3>${this.props.bootcamp.price}</h3>
        <h3>{this.props.bootcamp.languages}</h3>
      </div>
    )
  }
})

var Main = React.createClass({
  getInitialState: function() {
    return {bootcamps: [], ogBootcamps: []}
  },

  loadServerData: function(){
    var bootcamps;
    var app = this;
    $.get('http://bootcampapi.herokuapp.com/bootcamps', function(result) {
      bootcamps = result;
      app.setState({bootcamps: bootcamps, ogBootcamps: bootcamps});
    });
  },

  componentDidMount: function () {
    this.loadServerData();
  },

  filterCamps: function(){
    var input = React.findDOMNode(this.refs.searchBar);
    var bootcamps = this.state.bootcamps.filter(function(e, i){
      return e.name.toLowerCase().indexOf(input.value) !== -1;
    })
    bootcamps = !input.value ? this.state.ogBootcamps : bootcamps;
    this.setState({bootcamps: bootcamps});
  },

  handleClick: function () {
    var bootcamps = this.state.bootcamps.sort(function(a,b){
      console.log(parseInt(a.price));
      return parseInt(a.price) - parseInt(b.price);
    });
    this.setState({bootcamps: bootcamps});
  },

  render: function() {
    var bootCampDivs = this.state.bootcamps.map(function(e, i){
      console.log(e);
      return <Card bootcamp={e} index={i} />
    })
    return (
      <div>
        <input className='col-xs-2 col-xs-offset-5' ref='searchBar' placeholder='search...' onChange={this.filterCamps}></input>
        <button className='col-xs-2 col-xs-offset-5 btn btn-success' onClick={this.handleClick}>Sort By Price</button>
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
