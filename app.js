require('node-jsx').install({extension: '.jsx'})

var express = require('express')
  , app = express()
  , React = require('react/addons')
  , components = require('./public/components.jsx')

var Main = React.createFactory(components.Main)


app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.render('index', {
    react: React.renderToString(Main())
  })
})

app.listen(3000, function() {
  console.log('-------------------------')
  console.log('Listening on port 3000...')
  console.log('-------------------------')
})
