import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const searchWeather = async () => {
    if (!city.trim()) {
      Alert.alert('❌ Atenção', 'Digite o nome de uma cidade!');
      return;
    }

    setLoading(true);
    
    
    setTimeout(() => {
    
      const conditions = [
        { main: 'Clear', description: 'ensolarado', emoji: '☀️', temp: 28 },
        { main: 'Clouds', description: 'nublado', emoji: '☁️', temp: 22 },
        { main: 'Rain', description: 'chuvoso', emoji: '🌧️', temp: 18 },
        { main: 'Drizzle', description: 'garoa', emoji: '🌦️', temp: 20 },
        { main: 'Thunderstorm', description: 'tempestade', emoji: '⛈️', temp: 16 }
      ];
      
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      const mockWeather = {
        name: city,
        sys: { country: 'BR' },
        main: {
          temp: randomCondition.temp + Math.round(Math.random() * 5 - 2),
          feels_like: randomCondition.temp + Math.round(Math.random() * 3),
          humidity: Math.round(Math.random() * 40 + 40),
          temp_min: randomCondition.temp - 3,
          temp_max: randomCondition.temp + 5,
          pressure: 1013
        },
        weather: [
          { 
            description: randomCondition.description,
            main: randomCondition.main
          }
        ],
        wind: { 
          speed: Math.random() * 8 + 1
        }
      };

      setWeather({
        ...mockWeather,
        emoji: randomCondition.emoji
      });
      setLoading(false);
      
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {}
      <View style={styles.header}>
        <Text style={styles.title}>🌤️ WeatherNow</Text>
        <Text style={styles.subtitle}>Previsão do Tempo em Tempo Real</Text>
      </View>

      {}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ex: São Paulo, Rio, Lisboa..."
          placeholderTextColor="#999"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={searchWeather}
        />
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={searchWeather}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.buttonText}>🔍 Buscar</Text>
          )}
        </TouchableOpacity>
      </View>

      {}
      {weather && (
        <View style={styles.weatherCard}>
          <View style={styles.cityHeader}>
            <Text style={styles.cityName}>{weather.name}</Text>
            <Text style={styles.country}>{weather.sys.country}</Text>
          </View>
          
          <View style={styles.tempContainer}>
            <Text style={styles.temperature}>{weather.main.temp}°C</Text>
            <Text style={styles.weatherIcon}>{weather.emoji}</Text>
          </View>

          <Text style={styles.weatherDescription}>
            {weather.weather[0].description}
          </Text>

          {}
          <View style={styles.detailsGrid}>
            <View style={styles.detailBox}>
              <Text style={styles.detailEmoji}>🌡️</Text>
              <Text style={styles.detailLabel}>Sensação</Text>
              <Text style={styles.detailValue}>{weather.main.feels_like}°C</Text>
            </View>
            
            <View style={styles.detailBox}>
              <Text style={styles.detailEmoji}>💧</Text>
              <Text style={styles.detailLabel}>Umidade</Text>
              <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
            </View>
            
            <View style={styles.detailBox}>
              <Text style={styles.detailEmoji}>💨</Text>
              <Text style={styles.detailLabel}>Vento</Text>
              <Text style={styles.detailValue}>
                {Math.round(weather.wind.speed * 3.6)} km/h
              </Text>
            </View>
            
            <View style={styles.detailBox}>
              <Text style={styles.detailEmoji}>📊</Text>
              <Text style={styles.detailLabel}>Pressão</Text>
              <Text style={styles.detailValue}>{weather.main.pressure} hPa</Text>
            </View>
          </View>

          {}
          <View style={styles.minMaxContainer}>
            <View style={styles.tempRange}>
              <Text style={styles.tempLabel}>🌙 Mínima</Text>
              <Text style={styles.tempValue}>{weather.main.temp_min}°C</Text>
            </View>
            
            <View style={styles.tempRange}>
              <Text style={styles.tempLabel}>☀️ Máxima</Text>
              <Text style={styles.tempValue}>{weather.main.temp_max}°C</Text>
            </View>
          </View>

          <Text style={styles.demoNote}>
            🎯 Modo Demonstração - Dados Simulados
          </Text>
        </View>
      )}

      {}
      {!weather && !loading && (
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeTitle}>Bem-vindo ao WeatherNow! 👋</Text>
          <Text style={styles.welcomeText}>
            🌍 Digite o nome de qualquer cidade acima{'\n'}
            📱 Veja a previsão do tempo simulada{'\n'}
            🎯 Interface moderna e responsiva
          </Text>
          <Text style={styles.instruction}>
            💡 Para usar dados reais:{'\n'}
            1. Obtenha API key em: openweathermap.org{'\n'}
            2. Substitua a função mock por API real
          </Text>
        </View>
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1E88E5',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 15,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  weatherCard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  cityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  cityName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  country: {
    fontSize: 16,
    color: '#7F8C8D',
    backgroundColor: '#ECF0F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontWeight: '600',
  },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  temperature: {
    fontSize: 76,
    fontWeight: '200',
    color: '#2C3E50',
  },
  weatherIcon: {
    fontSize: 64,
  },
  weatherDescription: {
    fontSize: 20,
    color: '#7F8C8D',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 30,
    fontWeight: '500',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  detailBox: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  detailEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '600',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
  },
  minMaxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  tempRange: {
    alignItems: 'center',
  },
  tempLabel: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '600',
    marginBottom: 6,
  },
  tempValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  demoNote: {
    textAlign: 'center',
    color: '#E67E22',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 13,
    backgroundColor: '#FDEDE9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  welcomeBox: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 25,
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },
  instruction: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    lineHeight: 18,
  },
});