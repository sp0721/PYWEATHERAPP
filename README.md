# PYWEATHERAPP

Weather application that fetches data from Tomorrow.io API and displays the fields in a specific order.

## Overview

This is a simple weather app that allows users to check the current weather conditions for any location they enter. The app provides real-time data including temperature, humidity, wind speed, and more, fetched from the Tomorrow.io API.

## Features

- User input for location (city name or geographic coordinates)
- Real-time weather data fetching from the Tomorrow.io API
- Display of temperature, humidity, and wind speed and other fields.
- Error handling for invalid locations or network issues
- Responsive design for both desktop and mobile devices
- Show Air Quality Index (AQI) and pollen information for the user's current location
- Provide a 6-day weather forecast for Middle Tennessee State University (MTSU)
- Automatic refresh of weather data every 15 minutes

## Tools and Technologies

- **Python:** Backend logic
- **Flask:** Web application framework
- **HTML/CSS:** Front-end design
- **JavaScript (ES6+):** Front-end functionality
- **Tomorrow.io API:** Real-time weather data
- **GeoDB Cities API:** City search functionality
- **Requests Library:** HTTP requests to the Tomorrow.io API

## API Integration

### Tomorrow.io Weather API
The Tomorrow.io Weather API is the primary source of weather data in this application. It is used for:
1. Fetching real-time weather data for searched cities
2. Displaying AQI and pollen information for the user's location
3. Providing a 6-day forecast for MTSU

**API Key:** To obtain an API key for Tomorrow.io, please contact the developers of this project.

### GeoDB Cities API
The GeoDB Cities API is used to provide city search functionality. It allows users to search for cities and select from a list of matching results.

## Installation and Setup

Follow these steps to set up and run the PYWEATHERAPP on your local machine:

### Prerequisites
- Ensure you have Python 3.7 or later installed on your system. You can download it from [python.org](https://www.python.org/downloads/).

### Step 1: Clone the Repository
1. Open your terminal or command prompt.
2. Clone the repository using Git:
   ```bash
   git clone https://github.com/sp0721/PYWEATHERAPP.git


## Step 2: Set Up a Virtual Environment (Optional but Recommended)
Create a virtual environment:
bash
python -m venv venv

Activate the virtual environment:
On Windows:
bash
venv\Scripts\activate

On macOS/Linux:
bash
source venv/bin/activate

## Step 3: Install Required Packages
Install Flask and Requests libraries:
bash
pip install flask requests

## Step 4: Obtain API Keys
Tomorrow.io API:
To obtain your API key, please contact the developers of this project.
GeoDB Cities API:
Sign up at GeoDB Cities API to obtain your API key.

## Step 5: Configure Your API Key
Open the app.py file in a text editor.
Locate the line where the Tomorrow.io API key is defined and replace it with your actual API key:
python
TOMORROW_API_KEY = 'your_tomorrow_io_api_key_here'

## Step 6: Run the Application
In your terminal, ensure you are in the project directory and the virtual environment is activated.
Start the Flask application:
bash
python app.py

Open your web browser and go to http://localhost:5000 to access the Weather App.

## Step 7: Usage
Enter a city name in the search bar and click "Search City" or press Enter.
Select a city from the dropdown list if multiple results are found.
View the current weather conditions, including temperature, humidity, wind speed, and more.
Check the AQI and pollen information for your current location (requires geolocation permission).
View the 6-day forecast for MTSU.

## Project Structure
app.py: The main Flask application file.
templates/index.html: The main HTML template.
static/script.js: JavaScript file for frontend functionality.
static/styles.css: CSS file for styling.

## Customization
The MTSU widget can be customized to show weather for a different location by changing the data-location-id attribute in the HTML.
The refresh interval for weather data can be adjusted by modifying the setInterval duration in the JavaScript code.

## Contributors
SHREEJI
OM
MEGH

## Acknowledgements
Weather data provided by Tomorrow.io
City search functionality powered by GeoDB Cities API
Icons provided by Font Awesome
