const DEFAULT_ERROR_MESSAGE = 'Internal Server Error'

exports.responseError = () => {
  return (req, res, next) => {
    res.error = (message = DEFAULT_ERROR_MESSAGE, status = 500) => {
      const error = typeof message === 'string'
        ? new Error(message)
        : message

      next({ error, status })
    }

    next()
  }
}

exports.errorHandler = () => {
  return (err, _req, res, _next) => {
    const { status = 500, error } = err
    const { message = DEFAULT_ERROR_MESSAGE } = error || {}

    console.error(error || err)

    res.status(status)
    res.json({ status, message })
  }
}
