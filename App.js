import { StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [city, setCity] = useState('Kyiv');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = 'fa20841b6e4dfff62dc042f420624dae';

  useEffect (() => {
    handleFetchWeather();
  }, [city]);

  const fetchWeather = async (city) => {
    
    try {
      const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        return data;
      }
      else {
        throw new Error ('Не вдалося отримати данні про погоду.');
      }
    }
      catch (err) {
        throw new Error ('Не вдалося отримати данні про погоду.');
      }
    
    setError('');

  };

  const handleFetchWeather = async () => {
    if (!city) {
      setError('Введіть назву міста.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    }
    catch (err) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}> 
        <TextInput 
          style={styles.input} 
          value={city} 
          onChangeText={setCity} 
          placeholder="Введіть місто" 
        /> 
        <TouchableOpacity style={styles.button} 
          onPress={handleFetchWeather}> 
          <Text style={styles.buttonText}>Отримати погоду</Text> 
        </TouchableOpacity>
      </View>
      {loading ? <ActivityIndicator size="large" color="#007bff" /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null} 
      {weather && ( <View> 
        <Text style={styles.weatherText}>Місто: {weather.name}</Text> 
        <Text style={styles.weatherText}>Температура: {weather.main.temp}°C</Text> 
        <Text style={styles.weatherText}>Погода: {weather.weather[0].description}</Text> 
        <Image 
          style={styles.weatherIcon} 
          source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} 
        />
        </View> )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f0f0f0', 
    padding: 20, 
  }, 
  inputContainer: { 
    flexDirection: 'row', 
    marginBottom: 20, 
  }, 
  input: { 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    marginRight: 10, 
    flex: 1, 
  }, 
  button: { 
    backgroundColor: '#007bff', 
    padding: 10, 
    borderRadius: 5, 
  }, 
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
  }, 
  error: { 
    color: 'red', 
    marginBottom: 20, 
  }, 
  weatherText: { 
    fontSize: 18, 
    marginBottom: 10, 
  }, 
  weatherIcon: { 
    width: 100, 
    height: 100,
  },
});

export default App;
