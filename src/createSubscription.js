import invariant from 'invariant'
import _ from 'lodash'
import createCallback from './createCallback'

export default pubsub => function createSubscription (name, options) {
  options = options || {}

  invariant(options.topic, 'options.topic is required')

  const topic = options.topic
  const callback = createCallback()
  const createOptions = _.omit(options, 'topic')

  pubsub.topic(topic).subscription(name).create(createOptions, callback)

  return callback.promise
}
