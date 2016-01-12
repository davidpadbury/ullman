import invariant from 'invariant'
import createCallback from './createCallback'

export default pubsub => function deleteSubscription (name, options) {
  options = options || {}

  invariant(name, 'name is required')
  invariant(options.topic, 'options.topic is required')

  const callback = createCallback()
  const { topic } = options

  pubsub.topic(topic).subscription(name).delete(callback)

  return callback.promise
}
