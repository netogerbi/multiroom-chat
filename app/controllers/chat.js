module.exports.startChat = function (app, req, res) {
  
  req.assert('nickname', 'Apelido ou nome é obrigatório').notEmpty()
  req.assert('nickname', 'Apelido ou nome deve conter entre 3 e 15 caracteres').len(3,15)

  const errors = req.validationErrors()

  if(errors) {
    res.render('index', { invalid: errors })
    return;
  }

  // retrieving global defined in set
  app.get('socket').emit('msgToClient', 'data that has been sent')

  const formData = req.body

  res.render('chat')
}

module.exports.getChat = function (app, req, res) {
  res.render('chat')
}