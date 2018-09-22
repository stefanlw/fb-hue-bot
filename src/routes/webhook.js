import express from 'express'
import { handleMessage } from '../api-helpers/receive'

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong token');
  }
});

router.post('/', (req, res) => {
  res.sendStatus(200);
  const entries = req.body.entry;
  console.log('entries')
    entries.forEach(entry => {
      entry.messaging.forEach(messagingEvent => {
        if (messagingEvent.message) {
          handleMessage(messagingEvent);
          console.log(messagingEvent)
        }
      })
    })
});

export default router