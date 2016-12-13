var express = require('express');
var places = require('./places/place');
var app = express();
var geolib = require('geolib');

app.use(require('cors')());

//Para ver todos los refugios.
app.get('/places', function (req, res, next) {
  var allPlaces = places.getPlaces();  
  res.send(JSON.stringify(allPlaces));
})

//Para obtener refugios más cercanos /nearest_places
app.get('/nearest_places', function (req, res) {
  var nearest_places = [];
  var allPlaces = places.getPlaces();
  
  var user_latitude = parseFloat(req.query.latitude);//.toString();
  var user_longitude = parseFloat(req.query.longitude);//.toString();
  var user_ubication = {latitude: user_latitude, longitude: user_longitude};


  for(place in allPlaces) {
    var place_ubication = {latitude: parseFloat(allPlaces[place].latitude), longitude: parseFloat(allPlaces[place].longitude)}

    var distanceInMeters = geolib.getDistance(user_ubication, place_ubication);
    if (distanceInMeters < 1000) {
      nearest_places.push(allPlaces[place]);
    }
  }
  
  res.send(JSON.stringify(nearest_places));  
})

//Para crear un nuevo refugio.
//Al crear un nuevo refugio se están pasando como parámetros del GET, y no en el Body.
app.post('/places', function (req, res) {
  var name = req.query.name;
  var description = req.query.description;
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;

  var newPlace = places.create(name, description, latitude, longitude);
  res.send(JSON.stringify(newPlace));
})

//Para eliminar un refugio /places
app.delete('/places', function (req, res) {
  var allPlaces = places.getPlaces();
  var placeIdToDelete = req.query.id;
  var place = places.getPlaceById(placeIdToDelete);
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
