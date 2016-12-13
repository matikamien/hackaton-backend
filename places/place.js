var places = [];

// Constructor
function Place(id, name, description, latitude, longitude) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.latitude = latitude;
  this.longitude = longitude;
  places.push(this);
  return this;
}

function create(id, name, description, latitude, longitude) {
	var place = new Place(id, name, description, latitude, longitude);
	return place;
}

// class methods
function getPlaces() {
	return places;
}

function getPlaceById(id) {
  var place = null;
  for(let i = 0; i < places.length; i++) {
  	if (places[ i ].id == id) {
  		place = places[ i ];
  	}
  }
  return place;
}

module.exports =  {
	create,
	getPlaces,
	getPlaceById 
}