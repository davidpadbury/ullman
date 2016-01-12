import chalk from 'chalk'

function env (name) {
  const value = process.env[name]

  if (!value) {
    console.error(chalk.red('ERROR:'), chalk.blue(name), 'has not been set')
    process.exit(1)
  }

  return value
}

export default {
  projectId: env('GCLOUD_PROJECT'),
  keyFilename: env('GCLOUD_KEY')
}
