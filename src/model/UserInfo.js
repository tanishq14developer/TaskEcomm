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
const mongoose = require("mongoose");
const UserInfo = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    mobileNo: {
      type: String,
      unique: true,
      required: true,
    },
    otp: {
      type: String,
      unique: false,
    },
    expiration_time: Date,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("UserInfo", UserInfo);
