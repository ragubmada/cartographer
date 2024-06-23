# Cartographer's Quest
Cartographer's Quest is an engaging single-player strategy game where you take on the role of an imperial cartographer in the vast Potato Empire. Your mission is to map and populate uncharted territories while fulfilling the empress's wishes for diverse landscapes.

Currently only available in Hungarian.

![Cartographer's Quest](https://i.gyazo.com/1ae51910f134e38ee1736556ce9d7b35.png)

## Features

-   🗺️ 11x11 grid-based gameplay
-   🏔️ Fixed mountain locations add strategic depth
-   🌳🏘️🚜🌊 Four terrain types: forest, village, farm, and water
-   🔄 Rotate and mirror terrain elements for perfect placement
-   🎯 Random mission cards for variable gameplay
-   🍂☀️🍁❄️ Four seasons with unique scoring opportunities
-   💾 Persistent game state using local storage


## How to Play

1. Clone the repository
2. Set up a local web server (see instructions below)
3. Open the provided URL in your browser
4. Start placing terrain elements on the grid
5. Complete missions to score points
6. Survive all four seasons and aim for the highest score!

### Setting up a local web server

Due to CORS (Cross-Origin Resource Sharing) policies, you'll need to run the game using a local web server. Here are a few ways to do this:

a) If you have Python installed:
* Open a command prompt in your project directory
* For Python 3.x, run: `python -m http.server 8000`
* For Python 2.x, run: `python -m SimpleHTTPServer 8000`
* Then open your browser and go to `http://localhost:8000`

b) If you have Node.js installed:
* Install `http-server` globally: `npm install -g http-server`
* Navigate to your project directory in the command prompt
* Run: `http-server`
* Open your browser and go to the URL it provides (usually `http://127.0.0.1:8080`)

c) Use a code editor with a built-in server:
* Many modern code editors like Visual Studio Code have extensions or built-in features to run a local server. For VS Code, you can use the "Live Server" extension.

Running the game through a local server will resolve any CORS-related issues.

## Technical Details

- Implemented using pure JavaScript, HTML, and CSS
- No external libraries or frameworks used
- Responsive design for various screen sizes
- Requires a local web server due to CORS policies

## Completed Features

-   11x11 grid with set mountain positions
-   Element rotation and mirroring
-   Time-based gameplay (28 time units divided into 4 seasons)
-   12 unique missions
-   Mountain encirclement bonus
-   Seasonal and final scoring
-   Local storage save system

## Future Enhancements

-   Difficulty levels
-   Custom map creation
-   Multiplayer mode

## License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
