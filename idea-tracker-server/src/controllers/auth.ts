//Import local strategy from passport-local
import { Strategy as LocalStrategy } from 'passport-local'
import * as helper from './helpers'

export const instantiateAuth = (passport: import('passport').PassportStatic) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'name',
        passwordField: 'password',
      },
      async (username: string, password: string, done: any) => {
        const isValid = await helper.comparePasswords(password, username)

        if (!isValid) return done(null, false, { message: 'Incorrect username or password.' })

        const user = await helper.getUser(username)
        done(null, user)
      }
    )
  )

  passport.serializeUser(async (user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}
