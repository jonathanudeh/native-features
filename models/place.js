class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // {lat: 0.4747, lng: 373.8585}
    this.id = new Date().toString() + Math.random().toString();
  }
}
