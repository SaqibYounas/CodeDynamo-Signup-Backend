// // redis-client.js (only Upstash)
// import { Redis } from '@upstash/redis'

// const redis = new Redis({
//   url: 'https://secure-krill-29966.upstash.io',
//   token: 'AXUOAAIjcDFmZTc4OTNjZGJjY2M0Mzk1YjJmMzM5MjFhNDYwMWQ5MnAxMA',
// });
// console.log("Redis Connected")
// export default redis;

// import { Redis } from '@upstash/redis'
// const redis = new Redis({
//   url: 'https://subtle-starling-8934.upstash.io',
//   token: 'ASLmAAIjcDE1ODQwODBjMTkzNDE0ZDc0YmVlZThhMWFiOWQ5MWNjZnAxMA',
// })
// console.log("Redis Connected");




import 'dotenv/config';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

export default redis;

