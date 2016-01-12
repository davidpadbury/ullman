import invariant from 'invariant'
import debug from 'debug'
import _ from 'lodash'
import createCallback from './createCallback'

const log = debug('ullman:subscribe')

export default pubsub => function subscribe (name, handler, options = {}) {
  invariant(options.topic, 'options.topic is requird')
  const { topic } = options

  const subscribeOptions = _.omit(options, 'topic')

  return new Promise((resolve, reject) => {
    log('Subscribing to [%s] on topic [%s]', name, options.topic)
    pubsub.topic(topic).subscribe(name, subscribeOptions, (err, subscription) => {
      if (err) {
        log('Failed to retrieve subscription [%s]', name)
        reject(err)
      } else {
        const onMessage = async message => {
          log('Received message [%s]', message.id)
          try {
            const callback = createCallback()

            await handler(message.data)
            message.ack(callback)

            await callback.promise
          } catch (err) {
            // TODO: Add error handling
          }
        }

        subscription.on('message', onMessage)

        resolve(() => {
          subscription.removeListener('message', onMessage)
        })
      }
    })
  })
}
