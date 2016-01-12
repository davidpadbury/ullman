import gcloud from 'gcloud'
import createTopic from './createTopic'
import createSubscription from './createSubscription'
import deleteTopic from './deleteTopic'
import deleteSubscription from './deleteSubscription'
import subscribe from './subscribe'
import publish from './publish'
import pull from './pull'
import debug from 'debug'

const log = debug('ullman:index')

const api = {
  createTopic,
  createSubscription,
  deleteTopic,
  deleteSubscription,
  subscribe,
  publish,
  pull
}

export default function createUllman (options) {
  log('Creating Ullman')
  const pubsub = gcloud.pubsub(options)

  return Object.keys(api).reduce((memo, key) => {
    log(`Creating [${key}] api`)
    const create = api[key]

    memo[key] = create(pubsub)

    return memo
  }, {})
}
