# Ullman

Messaging Framework for Google Cloud PubSub.

## API

### Simple Usage
```javascript

import ullman from 'ullman'

const pubsub = ullman({
  projectName: 'profile-name',
  keyFilename: 'path-to-key'
})

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
    projectName: 'profile-name',
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