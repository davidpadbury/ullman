import debug from 'debug'
import createCallback from './createCallback'

const log = debug('ullman:publish')

export default pubsub => function publish (topic, payload) {
  const callback = createCallback()

  log('Publishing to [%s]', topic)
  pubsub.topic(topic).publish({ data: payload }, callback)

  return callback.promise
}
