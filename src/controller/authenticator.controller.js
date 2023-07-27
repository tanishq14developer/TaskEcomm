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

const jwt = require("jsonwebtoken");
function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization == null) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized request",
    });
  }
  const token = authorization.split(" ")[1];
  if (token == null) {
    res.status(401).send({
      success: false,
      message: "Unauthorized request",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(401).send({
        success: false,
        message: "Access token expired/Invalid access token",
      });
    }
    req.user = user;
    next();
  });
}
function basicApiKeyAuthenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization == null) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized request",
    });
  }
  const token = authorization.split(" ")[1];
  if (token != null && token == process.env.API_KEY) {
    next();
    return;
  } else {
    return res.status(401).send({
      success: false,
      message: "Unauthorized request",
    });
  }
}

module.exports = { basicApiKeyAuthenticator, authenticator };
