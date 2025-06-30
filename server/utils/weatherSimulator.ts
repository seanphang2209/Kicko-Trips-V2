interface WeatherData {
  temperature: string;
  condition: string;
  humidity: string;
  description: string;
}

const weatherPatterns: Record<string, WeatherData[]> = {
  bali: [
    {
      temperature: "30°C",
      condition: "Tropical",
      humidity: "High",
      description: "30°C, humid with light showers"
    },
    {
      temperature: "29°C",
      condition: "Partly Cloudy",
      humidity: "High",
      description: "29°C, warm and humid with occasional clouds"
    },
    {
      temperature: "31°C",
      condition: "Sunny",
      humidity: "Medium",
      description: "31°C, sunny with gentle tropical breeze"
    }
  ],
  tokyo: [
    {
      temperature: "22°C",
      condition: "Mild",
      humidity: "Medium",
      description: "22°C, pleasant with light breeze"
    },
    {
      temperature: "18°C",
      condition: "Cool",
      humidity: "Low",
      description: "18°C, cool and crisp autumn air"
    },
    {
      temperature: "25°C",
      condition: "Warm",
      humidity: "Medium",
      description: "25°C, warm with scattered clouds"
    }
  ],
  paris: [
    {
      temperature: "16°C",
      condition: "Mild",
      humidity: "Medium",
      description: "16°C, mild with occasional light rain"
    },
    {
      temperature: "12°C",
      condition: "Cool",
      humidity: "High",
      description: "12°C, cool and overcast typical Parisian weather"
    },
    {
      temperature: "20°C",
      condition: "Pleasant",
      humidity: "Low",
      description: "20°C, perfect spring weather with clear skies"
    }
  ],
  bangkok: [
    {
      temperature: "33°C",
      condition: "Hot",
      humidity: "High",
      description: "33°C, hot and humid tropical climate"
    },
    {
      temperature: "31°C",
      condition: "Tropical Storm",
      humidity: "Very High",
      description: "31°C, heavy monsoon rains expected"
    },
    {
      temperature: "35°C",
      condition: "Very Hot",
      humidity: "High",
      description: "35°C, very hot with high humidity"
    }
  ]
};

export const generateWeatherForecast = (destinationId: string): WeatherData => {
  const patterns = weatherPatterns[destinationId] || weatherPatterns.bali;
  const randomIndex = Math.floor(Math.random() * patterns.length);
  return patterns[randomIndex];
};

export const getWeatherForDuration = (destinationId: string, days: number): WeatherData[] => {
  const forecast: WeatherData[] = [];
  for (let i = 0; i < days; i++) {
    forecast.push(generateWeatherForecast(destinationId));
  }
  return forecast;
};
