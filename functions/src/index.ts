// Copyright 2017 Google LLC.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as path from 'path'
import * as request from "request-promise-native";
//const { ImageAnnotatorClient } = require('@google-cloud/vision')

admin.initializeApp()

// const neighbors = {
//     "nearest_neighbors": [
//       [
//         "37722",
//         0.6927633881568909
//       ],
//       [
//         "29295",
//         0.7064841985702515
//       ],
//       [
//         "153269",
//         0.7381125092506409
//       ],
//       [
//         "31648",
//         0.7397544384002686
//       ],
//       [
//         "60490",
//         0.7400718927383423
//       ],
//       [
//         "41691",
//         0.7426053285598755
//       ],
//       [
//         "53998",
//         0.7488357424736023
//       ],
//       [
//         "19659",
//         0.7514187097549438
//       ],
//       [
//         "88033",
//         0.7523305416107178
//       ],
//       [
//         "19501",
//         0.7527182698249817
//       ],
//       [
//         "114321",
//         0.756462574005127
//       ],
//       [
//         "21076",
//         0.7568775415420532
//       ],
//       [
//         "36412",
//         0.7578321099281311
//       ],
//       [
//         "104929",
//         0.7580778002738953
//       ],
//       [
//         "63285",
//         0.7600811123847961
//       ],
//       [
//         "55324",
//         0.7625108361244202
//       ],
//       [
//         "18888",
//         0.7656471133232117
//       ],
//       [
//         "112030",
//         0.7665778994560242
//       ],
//       [
//         "115229",
//         0.770297110080719
//       ],
//       [
//         "21249",
//         0.7719306349754333
//       ],
//       [
//         "43600",
//         0.7729672789573669
//       ],
//       [
//         "19166",
//         0.7740573287010193
//       ],
//       [
//         "84883",
//         0.77475905418396
//       ],
//       [
//         "92569",
//         0.7759883403778076
//       ],
//       [
//         "27109",
//         0.7765831351280212
//       ],
//       [
//         "19165",
//         0.7772830724716187
//       ],
//       [
//         "150873",
//         0.7783605456352234
//       ],
//       [
//         "19180",
//         0.7788065671920776
//       ],
//       [
//         "18910",
//         0.7788894176483154
//       ],
//       [
//         "149583",
//         0.7811176776885986
//       ],
//       [
//         "154671",
//         0.7811689972877502
//       ],
//       [
//         "98301",
//         0.7814826369285583
//       ],
//       [
//         "102965",
//         0.782249927520752
//       ],
//       [
//         "18893",
//         0.7822533249855042
//       ],
//       [
//         "149098",
//         0.783401370048523
//       ],
//       [
//         "26394",
//         0.7861220240592957
//       ],
//       [
//         "101150",
//         0.7870022058486938
//       ],
//       [
//         "60659",
//         0.7872987985610962
//       ],
//       [
//         "19170",
//         0.7873930335044861
//       ],
//       [
//         "19188",
//         0.7875434160232544
//       ],
//       [
//         "77643",
//         0.7888219356536865
//       ],
//       [
//         "90104",
//         0.788969874382019
//       ],
//       [
//         "19182",
//         0.7890855669975281
//       ],
//       [
//         "77781",
//         0.789091169834137
//       ],
//       [
//         "97062",
//         0.7893030643463135
//       ],
//       [
//         "19497",
//         0.7898395657539368
//       ],
//       [
//         "19503",
//         0.7898786664009094
//       ],
//       [
//         "93180",
//         0.7901584506034851
//       ],
//       [
//         "136635",
//         0.7905343174934387
//       ],
//       [
//         "82986",
//         0.7906997799873352
//       ]
//     ]
//   }

export const onUploadImage = functions.storage.object().onFinalize(async object => {
    const parts = object.name ? path.parse(object.name) : null;

    if (parts) {
        if (parts.root !== '' || parts.dir !== 'images') {
            return null
        }
    } else {
        return null
    }

    // Pass the Cloud Storage URL directly to the Cloud Vision API
    // const client = new ImageAnnotatorClient()
    const inStorage = `gs://${object.bucket}/${object.name}`

    // const [ results ] = await client.labelDetection(inStorage)
    // const labels = results.labelAnnotations
    // // Update the database with a comma-separated list of labels
    // var settings = {
    //   "async": true,
    //   "url": "https://art-match-api.appspot.com/api/v1/image/neighbor?count=50",
    //   "method": "POST",
    //   "headers": {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       "cache-control": "no-cache",
    //   },
    //   "processData": false,
    //   "contentType": false,
    //   "mimeType": "multipart/form-data",
    //   "data": form
    // }
    const baseUrl = 'http://0.0.0.0:5000/api/v1/image/neighbor';
    const queryString = '?url=' + inStorage + '&count=40';
    var options = {
        uri: baseUrl + queryString,
    };
  
    const result = await request.get(options);
    
    "http://0.0.0.0:5000/api/v1/image/neighbor?url=https%3A%2F%2Fimages.nga.gov%2F%3Fservice%3Dasset%26action%3Dshow_preview%26asset%3D33295&count=5"
    
    await admin.database().ref(`images/${parts.name}`).update({
      similar: JSON.parse(result),
      id: Math.random().toString(36).substring(7)
    })

    // $.ajax({
    //   "async": true,
    //   "url": "https://art-match-api.appspot.com/api/v1/image/neighbor?count=50",
    //   "method": "POST",
    //   "headers": {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       "cache-control": "no-cache",
    //   },
    //   "processData": false,
    //   "contentType": false,
    //   "mimeType": "multipart/form-data",
    //   "data": form
    // }).done(async function (response) {
    //   console.log(response);
    //   await admin.database().ref(`images/${parts.name}`).update({
    //     similar: JSON.parse(response),
    //     id: Math.random().toString(36).substring(7)
    // })
    // });
    
    return null
})