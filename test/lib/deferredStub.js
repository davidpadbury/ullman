import sinon from 'sinon'
import _ from 'lodash'

export default function deferredStub () {
  let resolve, reject

  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  return _.assign(sinon.stub().returns(promise), {
    resolve,
    reject,
    promise
  })
}
