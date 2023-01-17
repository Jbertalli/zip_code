import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { zipValue } from '../slices/zipSlice';
import { cityValue } from '../slices/citySlice';
import { latCoordValue } from '../slices/latCoordSlice';
import { longCoordValue } from '../slices/longCoordSlice';
import { stateValue } from '../slices/stateSlice';
import { stateAbbreviationValue } from '../slices/stateAbbreviationSlice';
import { OppLatValue } from '../slices/OppLatSlice';
import { OppLongValue } from '../slices/OppLongSlice';
import { weatherDataValue } from '../slices/weatherSlice';
import { currentTempDataValue } from '../slices/currentTempDataSlice';
import { tempRangeDataValue } from '../slices/tempRangeDataSlice';

const LOCAL_STORAGE_KEY_ZIP = 'UserZip';
const LOCAL_STORAGE_KEY_CITY = 'UserCity';
const LOCAL_STORAGE_KEY_LAT = 'UserLatitude';
const LOCAL_STORAGE_KEY_LON = 'UserLongitude';
const LOCAL_STORAGE_KEY_STATE = 'UserState';
const LOCAL_STORAGE_KEY_STATE_ABBR = 'UserStateAbbr';
const LOCAL_STORAGE_KEY_OPPOSITE = 'OppositeLat';
const LOCAL_STORAGE_KEY_OPPOSITE1 = 'OppositeLong';
const LOCAL_STORAGE_KEY_WEATHER = 'Weather';
const LOCAL_STORAGE_KEY_TEMP = 'CurrentTemp';
const LOCAL_STORAGE_KEY_RANGE = 'TempRange';

export default function Local(values) {

  const {
    setZip,
    setCity,
    setLatCoord,
    setLongCoord,
    setState,
    setStateAbbreviation,
    setOppLat,
    setOppLong,
    setWeatherData,
    setCurrentTempData,
    setTempRangeData,
  } = values;

  const zipName = useSelector(zipValue);
  const cityName = useSelector(cityValue);
  const latCoordName = useSelector(latCoordValue);
  const longCoordName = useSelector(longCoordValue);
  const stateName = useSelector(stateValue);
  const stateAbbreviationName = useSelector(stateAbbreviationValue);
  const OppLatValueName = useSelector(OppLatValue);
  const OppLongValueName = useSelector(OppLongValue);
  const weatherDataName = useSelector(weatherDataValue);
  const currentTempDataName = useSelector(currentTempDataValue);
  const tempRangeDataName = useSelector(tempRangeDataValue);

  // zip
  useEffect(() => {
    const storedZip = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ZIP));
    if (storedZip) setZip(storedZip);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ZIP, JSON.stringify(zipName));
  }, [zipName]);

  // city
  useEffect(() => {
    const storedCity = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CITY));
    if (storedCity) setCity(storedCity);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CITY, JSON.stringify(cityName));
  }, [cityName]);

  // latitude
  useEffect(() => {
    const storedLat = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LAT));
    if (storedLat) setLatCoord(storedLat);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_LAT, JSON.stringify(latCoordName));
  }, [latCoordName]);

  // longitude
  useEffect(() => {
    const storedLong = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LON));
    if (storedLong) setLongCoord(storedLong);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_LON, JSON.stringify(longCoordName));
  }, [longCoordName]);

  // state
  useEffect(() => {
    const storedState = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_STATE)
    );
    if (storedState) setState(storedState);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_STATE, JSON.stringify(stateName));
  }, [stateName]);

  // state abbreviation
  useEffect(() => {
    const storedStateAbbr = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_STATE_ABBR)
    );
    if (storedStateAbbr) setStateAbbreviation(storedStateAbbr);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_STATE_ABBR,
      JSON.stringify(stateAbbreviationName)
    );
  }, [stateAbbreviationName]);

  // opposite latitude
  useEffect(() => {
    const storedOppLat = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_OPPOSITE)
    );
    if (storedOppLat) setOppLat(storedOppLat);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_OPPOSITE,
      JSON.stringify(OppLatValueName)
    );
  }, [OppLatValueName]);

  // opposite longitude
  useEffect(() => {
    const storedOppLong = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_OPPOSITE1)
    );
    if (storedOppLong) setOppLong(storedOppLong);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_OPPOSITE1,
      JSON.stringify(OppLongValueName)
    );
  }, [OppLongValueName]);

  // weather
  useEffect(() => {
    const storedWeather = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_WEATHER)
    );
    if (storedWeather) setWeatherData(storedWeather);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_WEATHER,
      JSON.stringify(weatherDataName)
    );
  }, [weatherDataName]);

  // current temp
  useEffect(() => {
    const storedTemp = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TEMP));
    if (storedTemp) setCurrentTempData(storedTemp);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_TEMP,
      JSON.stringify(currentTempDataName)
    );
  }, [currentTempDataName]);

  // temp range
  useEffect(() => {
    const storedRange = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_RANGE)
    );
    if (storedRange) setTempRangeData(storedRange);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_RANGE,
      JSON.stringify(tempRangeDataName)
    );
  }, [tempRangeDataName]);

  return <>&nbsp;</>;
}
