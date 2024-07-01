## Care Chemnitz 

> Children, adolescents, and young adults require access to the education and care system. This is essential for their development and also legally mandated.

## Features

- Responsible design
- Filter
- Favorite place

## How to use?

1. Creating .env file for the google maps API
   ```bash
   VITE_MAPS_API_KEY={your google maps API}
   ```
2. Running the Client:
   ```bash
   cd client && npm i && npm run dev
   ```
3. Running the Server:
   ```bash
   cd server && npm i && node --env-file=../.env server
   ```

## Built With

* React 18.2.0
* TypeScript 5.2.2
* Vite: 5.2.0
* Tailwind 3.4.3
* headlessui: 2.0.4
* heroicons: 2.1.3
* react-google-maps: 1.0.1
* Node.js: 22.1.0
* Express: 4.19.2
* MongoDB: 6.6.1
* [Chemnitz Open Data Portal](https://portal-chemnitz.opendata.arcgis.com/)


## Contributing

Please read [CONTRIBUTING](https://gist.github.com/y0ungchoi/be9662f632063012c84f394ab0ff423b) for details on our code of conduct, and the process for submitting pull requests to us.


## License

This project is licensed under the MIT License - see the [LICENSE](https://gist.github.com/y0ungchoi/22bbc7aa64f6c8ee33850ad88bafdfcf) file for details
