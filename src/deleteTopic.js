import invariant from 'invariant'
import createCallback from './createCallback'

export default pubsub => function deleteTopic (name) {
  invariant(name, 'name is required')

  const callback = createCallback()

  pubsub.topic(name).delete(callback)

  return callback.promise
}
