'use strict'


const Route = use('Route')

Route.resource('users', 'UserController')
    .apiOnly()
    .validator('User')
    .middleware(['auth'])

Route.resource('tuition', 'TuitionController')
    .apiOnly()
    .validator('Tuition')
    .middleware(['auth'])

Route.post('sessions', 'SessionController.store').validator('Session')


