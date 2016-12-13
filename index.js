var express = require('express');
var places = require('./places/place');
var app = express();

app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Para ver todos los refugios.
app.get('/places', function (req, res) {
  var allPlaces = places.getPlaces();  
  res.send(JSON.stringify(allPlaces));
})

//Para ver refugio específicio /places/:id
app.get('/places/:id', function (req, res) {
  var allPlaces = places.getPlaces();
  var placeId = req.params.id;
  var place = places.getPlaceById(placeId);
  if (place) {
  	res.send(JSON.stringify(place));	
  }
  res.status(404).send("No se encontro el refugio!");
})

//Para crear un nuevo refugio.
//Al crear un nuevo refugio se están pasando como parámetros del GET, y no en el Body.
app.post('/places/:id', function (req, res) {
  var placeId = req.params.id;
  var name = req.query.name;
  var description = req.query.description;
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;

  var newPlace = places.create(placeId, name, description, latitude, longitude);
  res.send(JSON.stringify(newPlace));
})

//Para eliminar un refugio /places
app.delete('/places', function (req, res) {
  var allPlaces = places.getPlaces();
  var placeNameToDelete = req.query.name;
  var place = places.getPlaceByName(placeNameToDelete);
  if (place) {
  	var index = allPlaces.indexOf(place);

  	if (index > -1) {
	  allPlaces.splice(index, 1);
	}
	res.send(JSON.stringify(place));
  } 
  res.status(404).send("No se encontro el refugio!");  
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Levantando servidor de refugios');
})


//Para ver el último post.
/*app.get('/posts/last', function (req, res) {
  var allPosts = posts.getPosts();
  var lastPost = allPosts[ allPosts.length - 1 ];
  res.send(JSON.stringify(lastPost));
})*/
