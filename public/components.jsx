var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react/addons') : window.React

var HelloMessage = React.createClass({
  handleClick: function () {
    alert('You clicked!')
  },

  render: function() {
    return <div onClick={this.handleClick}>Hello {this.props.name}</div>
  }
})

if (isNode) {
  exports.HelloMessage = HelloMessage
} else {
  React.render(<HelloMessage name="John" />, document.getElementById('react-root'))
}
