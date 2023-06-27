import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

function ClimaScreen() {
  const [climaData, setClimaData] = useState(null);
  const countries = [
    'Nicaragua',
    'Guatemala',
    'Honduras',
    'Panama',
    'Costa Rica',
    'Belice',
  ];

  useEffect(() => {
    const fetchClimaData = async () => {
      try {
        const responsePromise = countries.map(country =>
          axios.get(
            `http://api.weatherapi.com/v1/current.json?key=3d82f2d57d3d4e498b7143622232706&q=${country}&lang=es`,
          ),
        );
        const responses = await Promise.all(responsePromise);
        const climaDataArray = responses.map(response => response.data);
        setClimaData(climaDataArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClimaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!climaData) {
    return (
      <View>
        <Text>Cargando...🤓</Text>
      </View>
    );
  }

  return (
    <View>
      {climaData.map((clima, index) => (
        <View key={index}>
          <Text>
            Ubicacion: {clima.location.name}, {clima.location.region},{' '}
            {clima.location.country}
          </Text>
          <Text>Temperatura: {clima.current.temp_c} °C</Text>
          <Text>Condicion: {clima.current.condition.text}</Text>
          <Text>--------------------------------------------</Text>
        </View>
      ))}
    </View>
  );
}

export default ClimaScreen;
