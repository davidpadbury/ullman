export default function createCallback () {
  let resolve, reject

  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  const callback = (err, result) => {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  }

  callback.promise = promise

  return callback
}
