exports.success = (req, res, message, status) => {
    res.status(status || 200).json({
        'error': '',
        'body': message
    })
}

exports.error = (req, res, message, status) => {
    res.status(status || 500).json({
        'error': message,
        'body': ''
    })
}