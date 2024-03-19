#!/usr/bin/env node
import https from 'https';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// const authData = await pb
//   .collection('power')
//   .authWithPassword('backend', '1234567890')
//   .then((result) => {
//     console.log(result);
//     fetchLogs();
//   })
//   .catch((error) => {
//     console.log('Failed to login Error:', error);
//     exit(1);
//   });

function fetchLogs() {
  const timestamp = Date.now(); // Current Unix timestamp in milliseconds
  const url = `https://apan1121.github.io/powerInfoV2/log/powerInfo.log?t=${timestamp}`;

  https
    .get(url, (res) => {
      let data = '';

      // A chunk of data has been received.
      res.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          handleData(json);
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      });
    })
    .on('error', (err) => {
      console.error('Error fetching logs:', err.message);
    });
}

async function handleData(json) {
  // console.log(json);

  const mytime = new Date(json.time);
  for (let i = 0; i < json.info.length; i++) {
    const e = json.info[i];
    // console.log(e);
    const data = {
      capacity: e.capacity,
      used: e.used,
      percent: e.percent,
      gov: e.gov === '1',
      name: e.name,
      key: e.key,
      type: e.type,
      status: e.status,
      note: e.note,
      noteid: e.noteId,
      unit_id: e.unit_id,
      mapping_name: e.mappingName[0],
      time: mytime.toISOString().replace('T', ' '),
    };
    // console.log(data);
    const record = await pb
      .collection('power')
      .create(data)
      // .then((record) => console.log('External Record created:', record))
      .catch((error) => console.log('Failed external record:', error));
  }
}

fetchLogs();

// Pull data every 10 minutes
setInterval(() => fetchLogs(), 10 * 60 * 1000);

// pb.authStore.clear();

import { randomInt } from 'crypto';

// Generate fixed capacities for each of the 10 generators
const capacities = Array.from({ length: 10 }, () => randomInt(1, 100001));

// Function to generate sinusoidal percent value
function generateSinusoidalPercent(now) {
  const secondsSinceMidnight =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const fractionOfDay = secondsSinceMidnight / 86400; // 86400 seconds in a day
  const radians = fractionOfDay * 2 * Math.PI; // Full circle (single period)
  return (Math.sin(radians) + 1) / 2; // Adjusted to range [0, 1]
}

// Generate data entry for a specific generator
function generateDataEntry(generatorIndex) {
  const now = new Date();
  const capacity = capacities[generatorIndex]; // Use fixed capacity for each generator
  const percent = generateSinusoidalPercent(now);
  const used = Math.round(capacity * percent * 2); // Allow used to be up to double the capacity

  const data = {
    capacity,
    used,
    percent: percent * 100, // Convert to percentage
    gov: false,
    name: `mygenerator#${generatorIndex + 1}`, // Append generator number to name
    key: 'test',
    type: 'hydro',
    status: 'test',
    note: '',
    noteid: '',
    unit_id: '',
    mapping_name: '',
    time: now.toISOString().replace('T', ' '),
  };

  console.log(data);
  pb.collection('power')
    .create(data)
    // .then((record) => console.log('Record created:', record))
    .catch((error) => console.log('Failed to create record. Error:', error));
}

// Create 10 generators, each generating data entries every 2 minutes
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    setInterval(() => generateDataEntry(i), 2 * 60 * 1000);
  }, i * 2 * 1000); // Stagger the generators by 2 seconds
}
