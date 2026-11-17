import * as SQLite from "expo-sqlite";

const databasePromise = SQLite.openDatabaseAsync("places.db");

export async function init() {
  const database = await databasePromise;

  try {
    await database.execAsync(
      `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
        )`,
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function insertPlace(place) {
  const database = await databasePromise;

  return database.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ],
  );
}

export async function fetchPlaces() {
  const database = await databasePromise;

  return database.getAllAsync(`SELECT * FROM places`);
}
