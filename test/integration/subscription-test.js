import { expect } from 'chai'
import ullman from '../../src'
import gcloudConfig from '../lib/gcloudConfig'
import deferredStub from '../lib/deferredStub'

describe('subscriptions', () => {
  let pubsub
  let topic

  beforeEach('create ullman', () => pubsub = ullman(gcloudConfig))
  beforeEach('create topic name', () => topic = createUniqueChannel('subscriptions-test'))
  beforeEach('create topic', () => pubsub.createTopic(topic))

  afterEach('delete topic', () => pubsub.deleteTopic(topic))

  describe('when handler is resolved', () => {
    let deferred
    let handler
    let subscription
    let unsubscribe

    beforeEach('create subscription name', () => {
      subscription = createUniqueChannel('subscription-test-handler')
    })

    beforeEach('create subscription', async () => {
      deferred = deferredStub()
      handler = () => {
        deferred.resolve()
      }

      unsubscribe = await pubsub.subscribe(subscription, handler, {
        topic,
        ackDeadlineSeconds: 10
      })
    })

    beforeEach('send message', () => pubsub.publish(topic, {
      hello: 'world'
    }))

    beforeEach('wait for handler to be called', () => deferred.promise)

    beforeEach('unsubscribe', () => unsubscribe())

    beforeEach('wait for ack to expire', () => wait(15))

    afterEach('remove subscription', () => pubsub.deleteSubscription(subscription, {
      topic
    }))

    it('should have removed the message from the subscription', async () => {
      const messages = await pubsub.pull(subscription, {
        topic,
        returnImmediately: true
      })

      expect(messages).to.be.empty
    })
  })
})

function createUniqueChannel (prefix) {
  const ts = Date.now().toString(36)
  const random = Math.floor(Math.random() * 1000).toString(36)
  return `${prefix}-${ts}-${random}`
}

function wait (seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}
