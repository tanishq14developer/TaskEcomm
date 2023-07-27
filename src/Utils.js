// @ts-nocheck
/*
 *   Copyright (c) 2023 Tanishq Chawda
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

const fs = require("fs");
const path = require("path");

require("dotenv").config();
var emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const isEmailValid = (email) => {
  if (!email) return false;

  if (email.length > 254) return false;

  var valid = emailRegex.test(email);
  if (!valid) return false;

  // Further checking of some things regex can't handle
  var parts = email.split("@");
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  return true;
};

//for valid phone number
const isValidphonenumber = (inputtxt) => {
  var ph = new RegExp(/^[6789]\d{9}$/);
  if (ph.test(inputtxt)) {
    return true;
  } else {
    return false;
  }
};

function generateOTP() {
  const OTP = Math.floor(100000 + Math.random() * 900000);
  // const OTP = "123456";
  return OTP.toString();
}

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const dates = {
  convert: function (d) {
    // Converts the date in d to a date-object. The input can be:
    //   a date object: returned without modification
    //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
    //   a number     : Interpreted as number of milliseconds
    //                  since 1 Jan 1970 (a timestamp)
    //   a string     : Any format supported by the javascript engine, like
    //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
    //  an object     : Interpreted as an object with year, month and date
    //                  attributes.  **NOTE** month is 0-11.
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    // Checks if date in d is between dates in start and end.
    // Returns a boolean or NaN:
    //    true  : if d is between start and end (inclusive)
    //    false : if d is before start or after end
    //    NaN   : if one or more of the dates is illegal.
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};

const specials = "!@#$%^&*()_+{}:\"<>?|[];',./`~";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";

const all = specials + lowercase + uppercase + numbers;

const generatePassword = () => {
  let password = "";
  password += pick(password, specials, 1, 3);
  password += pick(password, lowercase, 1, 3);
  password += pick(password, uppercase, 1, 3);
  password += pick(password, all, 10);

  return shuffle(password);
};

function pick(exclusions, string, min, max) {
  var n,
    chars = "";

  if (max === undefined) {
    n = min;
  } else {
    n = min + Math.floor(Math.random() * (max - min + 1));
  }

  var i = 0;
  while (i < n) {
    const character = string.charAt(Math.floor(Math.random() * string.length));
    if (exclusions.indexOf(character) < 0 && chars.indexOf(character) < 0) {
      chars += character;
      i++;
    }
  }

  return chars;
}

function shuffle(string) {
  var array = string.split("");
  var tmp,
    current,
    top = array.length;

  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

  return array.join("");
}

function randomString(length, chars) {
  var mask = "";
  if (chars.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
  if (chars.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (chars.indexOf("#") > -1) mask += "0123456789";
  if (chars.indexOf("!") > -1) mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
  var result = "";
  for (var i = length; i > 0; --i)
    result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}

function ReS(res, status, success, message, data) {
  const response = {
    success: success,
    message: message,
    data: data,
  };
  res.status(status).send(response);
}

function distanceCalculate(user_lat, user_lon, restaurant_lat, restaurant_lon) {
  return new Promise((resolve, reject) => {
    if (user_lat == restaurant_lat && user_lon == restaurant_lon) {
      return resolve(0);
    }
    const radlat1 = (Math.PI * user_lat) / 180;
    const radlat2 = (Math.PI * restaurant_lat) / 180;
    const theta = user_lon - restaurant_lon;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515; // dist in KM
    const final_dist = dist * 1.609344; // Distance in Miles
    let distance = final_dist / 1.609;
    return resolve(parseFloat(distance).toFixed(2));
  });
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {
  isEmailValid,
  isValidphonenumber,
  generateOTP,
  AddMinutesToDate,
  dates,
  generatePassword,
  randomString,
  ReS,
  distanceCalculate,
};
