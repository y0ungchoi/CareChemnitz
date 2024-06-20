import db from "./connection.js";

async function initializeDatabase() {
  try {
    await db
      .collection("users")
      .drop()
      .catch(() => {});
    await db
      .collection("facilities")
      .drop()
      .catch(() => {});

    await db.collection("users").insertMany([
      {
        firstName: "Anna",
        lastName: "Müller",
        email: "annanas@example.com",
        password: "password123",
      },
      {
        firstName: "Michael",
        lastName: "Hahn",
        email: "mh@example.com",
        password: "password456",
      },
    ]);

    await db.collection("facilities").insertMany([
      {
        $_id: "66576cca084121d37215a7f1",
        type: "FeatureCollection",
        name: "Jugendberufshilfen",
        crs: {
          type: "name",
          properties: {
            name: "urn:ogc:def:crs:OGC:1.3:CRS84",
          },
        },
        features: [
          {
            type: "Feature",
            properties: {
              OBJECTID: 1,
              ID: 1,
              TRAEGER:
                "Verein zur Beruflichen Förderung und Ausbildung e. V. (VBFA)",
              LEISTUNGEN: "arbeitsweltbezogene Jugendsozialarbeit",
              BEZEICHNUNG: null,
              KURZBEZEICHNUNG: null,
              STRASSE: "Waldenburger Straße 63",
              PLZ: "09116",
              ORT: "Chemnitz",
              TELEFON: "0371  3824316",
              EMAIL: null,
              FAX: "0371 3824315",
            },
            geometry: {
              type: "Point",
              coordinates: [12.8774888058499, 50.8310585585904],
            },
          },
          {
            type: "Feature",
            properties: {
              OBJECTID: 2,
              ID: 2,
              TRAEGER: "Jugendberufshilfe Chemnitz gGmbH",
              LEISTUNGEN: "arbeitsweltbezogene Jugendsozialarbeit",
              BEZEICHNUNG: null,
              KURZBEZEICHNUNG: null,
              STRASSE: "Straße Usti nad Labem 43",
              PLZ: "09119",
              ORT: "Chemnitz",
              TELEFON: "0371 4004972",
              EMAIL: null,
              FAX: "0371 4004966",
            },
            geometry: {
              type: "Point",
              coordinates: [12.8904748101941, 50.809930951272],
            },
          },
        ],
      },
      {
        $_id: {
          $oid: "6658a2b046fa402d6817d701",
        },
        type: "FeatureCollection",
        name: "Schulen",
        crs: {
          type: "name",
          properties: {
            name: "urn:ogc:def:crs:OGC:1.3:CRS84",
          },
        },
        features: [
          {
            type: "Feature",
            properties: {
              OBJECTID: 1,
              ID: 1,
              TYP: 10,
              ART: "Grundschule",
              STANDORTTYP: "1",
              BEZEICHNUNG: "Albert-Einstein-Grundschule",
              BEZEICHNUNGZUSATZ: null,
              KURZBEZEICHNUNG: "Albert-Einstein-GS",
              STRASSE: "Max-Türpe-Straße 58",
              PLZ: "09122",
              ORT: "Chemnitz",
              TELEFON: "0371 271710",
              FAX: "0371 2717119",
              EMAIL: "gs-albert-einstein@schulen-chemnitz.de",
              PROFILE: "GTA, Hort",
              SPRACHEN: null,
              WWW: "www.c.shuttle.de/a-einstein-gs",
              TRAEGER: "Kommunal",
              TRAEGERTYP: 10,
              BEZUGNR: "1",
              GEBIETSARTNUMMER: 40,
              SNUMMER: 101,
              NUMMER: 903,
              GlobalID: "73d96808-1583-4e02-bf98-29c5c5ecaf49",
              CreationDate: "2023-12-15T10:19:55.478Z",
              Creator: "GISAdminChemnitz",
              EditDate: "2023-12-15T10:19:55.478Z",
              Editor: "GISAdminChemnitz",
            },
            geometry: {
              type: "Point",
              coordinates: [12.8872762658422, 50.7922749102438],
            },
          },
          {
            type: "Feature",
            properties: {
              OBJECTID: 2,
              ID: 2,
              TYP: 10,
              ART: "Grundschule",
              STANDORTTYP: "1",
              BEZEICHNUNG: "Annenschule -Grundschule-",
              BEZEICHNUNGZUSATZ:
                "barrierefreier Zugang, Hort: baubedingte Auslagerung an den Standort Jakobstraße 20, 09130 Chemnitz, bis voraussichtlich Schuljahr 2024/2025",
              KURZBEZEICHNUNG: "Annenschule -GS-",
              STRASSE: "Brauhausstraße 16",
              PLZ: "09111",
              ORT: "Chemnitz",
              TELEFON: "0371 36913120",
              FAX: "0371 36913129",
              EMAIL: "gs-annenschule@schulen-chemnitz.de",
              PROFILE:
                "GTA, Hort, jüdischer Religionsunterricht, Vorbereitungsklassen",
              SPRACHEN: null,
              WWW: "www.annenschule.de",
              TRAEGER: "Kommunal",
              TRAEGERTYP: 10,
              BEZUGNR: "2",
              GEBIETSARTNUMMER: 40,
              SNUMMER: 105,
              NUMMER: 601,
              GlobalID: "4c92a00f-080b-4d40-beea-3b43723cb171",
              CreationDate: "2023-12-15T10:19:55.493Z",
              Creator: "GISAdminChemnitz",
              EditDate: "2023-12-15T10:19:55.493Z",
              Editor: "GISAdminChemnitz",
            },
            geometry: {
              type: "Point",
              coordinates: [12.9218298722116, 50.8280539252831],
            },
          },
        ],
      },
    ]);

    console.log("Database initialized successfully");
    db.client.close();
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

initializeDatabase();
