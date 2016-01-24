# Ullman

[![Codeship Status for davidpadbury/ullman](https://codeship.com/projects/29ea91e0-a511-0133-754a-7ac2b0a34bb8/status?branch=master)](https://codeship.com/projects/129507)

Promise based Node.js Messaging Framework for Google Cloud PubSub.

:warning: Ullman is a work in progress and shouldn't yet be used.

## API

### Simple Usage
```javascript

import ullman from 'ullman'

const pubsub = ullman({
  projectId: 'profile-name',
  keyFilename: 'path-to-key'
})

await pubsub.createTopic('topic-name')

const unsubscribe = pubsub.subcribe('test-subscription', async message => console.log(message))

unsubscribe()
```

### Configuration

```javascript

import ullman from 'ullman'

const pubsub = ullman({
  serialization: {
    serialize: JSON.stringify,
    deserialize: JSON.parse
  }
  gcloud: {
    projectId: 'profile-name',
    keyFilename: 'path-to-key'
  }
})

const unsubscribe = pubsub.subcribe('test-subscription', async message => console.log(message), {
  topic: 'topic-name',
  ackDeadlineSeconds: 10,
  retry: {
    count: 5,
    fallback: (attempts) => attemps * 1000
  },
  deadletter: 'test-subscription-failed'
})

unsubscribe()

```
