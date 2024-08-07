from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)
API_KEY = 'xV8P9TWf5qgKXx6fU1V6qtOr4v4Q972y'
BASE_URL = 'https://api.tomorrow.io/v4/weather/realtime'

def get_weather(location):
    params = {
        'location': location,
        'apikey': API_KEY,
        'units': 'imperial'
    }
    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()  # Raise an exception for bad status codes
        data = response.json()
        if 'data' in data and 'values' in data['data']:
            return data['data']['values']
        else:
            return {'error': 'Unexpected API response structure'}
    except requests.RequestException as e:
        return {'error': f'API request failed: {str(e)}'}
    except ValueError as e:
        return {'error': f'Invalid JSON response: {str(e)}'}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['GET'])
def weather():
    location = request.args.get('location')
    if not location:
        return jsonify({'error': 'No location provided'}), 400

    weather_data = get_weather(location)
    if 'error' in weather_data:
        return jsonify(weather_data), 500
    
    # Extract the weather information
    return jsonify({
        'temperature': weather_data.get('temperature'),
        'humidity': weather_data.get('humidity'),
        'windSpeed': weather_data.get('windSpeed'),
        'windDirection': weather_data.get('windDirection'),
        'windGust': weather_data.get('windGust'),
        'rainIntensity': weather_data.get('rainIntensity'),
        'visibility': weather_data.get('visibility'),
        'uvIndex': weather_data.get('uvIndex')
    })

if __name__ == '__main__':
    app.run(debug=True)