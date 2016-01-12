import invariant from 'invariant'
import debug from 'debug'
import createCallback from './createCallback'

const log = debug('ullman:createTopic')

export default pubsub => function createTopic (name) {
  invariant(name, 'name is required')

  const callback = createCallback()

  log('Creating topic [%s]', name)
  pubsub.topic(name).create(callback)

  return callback.promise
}
