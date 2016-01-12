import invariant from 'invariant'
import _ from 'lodash'
import createCallback from './createCallback'

export default pubsub => function pull (subscription, options = {}) {
  invariant(subscription, 'subscription is required')
  invariant(options.topic, 'options.topic is required')

  const pullOptions = _.omit(options, 'topic')
  const callback = createCallback()

  pubsub.topic(options.topic).subscription(subscription).pull(pullOptions, callback)

  return callback.promise
}
