import React, { useEffect } from "react";

const LOCAL_STORAGE_KEY_ZIP = 'UserZip';
const LOCAL_STORAGE_KEY_CITY = 'UserCity';
const LOCAL_STORAGE_KEY_LAT = 'UserLatitude';
const LOCAL_STORAGE_KEY_LON = 'UserLongitude';
const LOCAL_STORAGE_KEY_STATE = 'UserState';
const LOCAL_STORAGE_KEY_STATE_ABBR = 'UserStateAbbr';
const LOCAL_STORAGE_KEY_OPPOSITE = 'OppositeLat';
const LOCAL_STORAGE_KEY_OPPOSITE1 = 'OppositeLong';

export default function Local({ setZip, zip, setCity, city, latCoord, setLatCoord, longCoord, setLongCoord, state, setState, stateAbbreviation, setStateAbbreviation, OppLat, OppLong, setOppLat, setOppLong }) {

  // zip
  useEffect(() => {
    const storedZip = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ZIP))
    if (storedZip) setZip(storedZip)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ZIP, 
    JSON.stringify(zip))
  }, [zip]);

  // city
  useEffect(() => {
    const storedCity = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CITY))
    if (storedCity) setCity(storedCity)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CITY, 
    JSON.stringify(city))
  }, [city]);

  // latitude
  useEffect(() => {
    const storedLat = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LAT))
    if (storedLat) setLatCoord(storedLat)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_LAT, 
    JSON.stringify(latCoord))
  }, [latCoord]);

  // longitude
  useEffect(() => {
    const storedLong = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LON))
    if (storedLong) setLongCoord(storedLong)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_LON, 
    JSON.stringify(longCoord))
  }, [longCoord]);

  // state
  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_STATE))
    if (storedState) setState(storedState)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_STATE, 
    JSON.stringify(state))
  }, [state]);

  // state abbreviation
  useEffect(() => {
    const storedStateAbbr = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_STATE_ABBR))
    if (storedStateAbbr) setStateAbbreviation(storedStateAbbr)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_STATE_ABBR, 
    JSON.stringify(stateAbbreviation))
  }, [stateAbbreviation]);

  // opposite latitude
  useEffect(() => {
    const storedOppLat = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_OPPOSITE))
    if (storedOppLat) setOppLat(storedOppLat)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_OPPOSITE, 
    JSON.stringify(OppLat))
  }, [OppLat]);

  // opposite longitude
  useEffect(() => {
    const storedOppLong = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_OPPOSITE1))
    if (storedOppLong) setOppLong(storedOppLong)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_OPPOSITE1, 
    JSON.stringify(OppLong))
  }, [OppLong]);

  return (
    <>
        &nbsp;
    </>
  );
}
