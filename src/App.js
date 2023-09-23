import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, TextField, Button, Typography, Select, MenuItem } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import axios from 'axios';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {

    axios.get('https://api.exchangerate-api.com/v4/latest/USD').then((response) => {
      setCurrencies(Object.keys(response.data.rates));
    }).catch((error) => {
      console.log(error);
    });
    
  }, []);

  const convertCurrency = () => {
    axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`).then((response) => {
      const rate = response.data.rates[toCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className='container'>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline></CssBaseline>
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" className='margin-1rem'>Currency Converter App</Typography>

          <div className='margin-1rem'>
            <TextField
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              fullWidth
            />
          </div>

          <div className='margin-1rem'>
            <Select
              value={fromCurrency}
              onChange={(e) => {
                setFromCurrency(e.target.value);
                setConvertedAmount(null);
              }}
              fullWidth
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>{currency}</MenuItem>
              ))}
            </Select>
          </div>

          <div className='margin-1rem'>
            <Select
              value={toCurrency}
              onChange={(e) => {
                setToCurrency(e.target.value);
                setConvertedAmount(null);
              }}
              fullWidth
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>{currency}</MenuItem>
              ))}
            </Select>

          </div>

          <div className='margin-1rem button'>

            <Button
              onClick={convertCurrency}
              variant="outlined"
              // size='large'
              fullWidth
            >
              <CurrencyExchangeIcon />
              {/* Convert */}
            </Button>
          </div>
          
          {convertedAmount && (
            <Typography variant="h5" align="center">
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </Typography>
          )}

        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
