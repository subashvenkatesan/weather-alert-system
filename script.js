document.addEventListener('DOMContentLoaded', function() {
    var weatherForm = document.getElementById('weatherForm');
    var alertResult = document.getElementById('alertResult');

    weatherForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        var city = document.getElementById('city').value;
        var alertCondition = document.getElementById('alertCondition').value;
        
        if (city.trim() === '' || alertCondition === '') {
            alertResult.innerHTML = '<div class="alert alert-danger">Please fill in all fields.</div>';
            return;
        }

        var apiKey = '60af0e18ea0b0a5a1acf48499fd488b3'; // Replace with your API key
        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

        var params = {
            q: city,
            appid: apiKey,
            units: 'metric'
        };

        // Make API request using Fetch API
        fetch(apiUrl + '?' + new URLSearchParams(params))
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                var weather = data.weather[0].main;
                if (weather.toLowerCase() === alertCondition.toLowerCase()) {
                    alertResult.innerHTML = '<div class="alert alert-success">Alert: ' + alertCondition + ' in ' + city + '!</div>';
                } else {
                    alertResult.innerHTML = '<div class="alert alert-info">No ' + alertCondition + ' alert in ' + city + '.</div>';
                }
            })
            .catch(function(error) {
                alertResult.innerHTML = '<div class="alert alert-danger">Error fetching weather data. Please try again later.</div>';
            });
    });
});
