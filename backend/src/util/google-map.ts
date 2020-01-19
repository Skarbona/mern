import axios from "axios";
import HttpError from "../models/http-error";

const API_KEY = "AIzaSyBI0G_-JIiS-8_StthDOatz9VJNqaCMYnY";

const getCoordsForAddress = async (address: string) => {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`
    );

    if (!data || data.status === "ZERO_RESULTS") {
      return new HttpError(
        "Could not find location for specified address",
        422
      );
    }

    return data.results[0].geometry.location;
  } catch (e) {
    throw new HttpError("Something go wrong", 500);
  }
};

export default getCoordsForAddress;
