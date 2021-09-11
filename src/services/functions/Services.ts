import _ from 'lodash'
import moment from 'moment'

export function getImageFromStore(name: string, token: string) {
  return `https://firebasestorage.googleapis.com/v0/b/june-bnk48.appspot.com/o/${name}.png?alt=media&token=${token}`
}

export function convertName(name) {
  let camel = _.camelCase(name)
  return _.includes(name, '_') ? _.upperFirst(camel) : _.capitalize(name)
}

export function checkExpireDate(expire) {
  let now = moment().unix()
  return now > expire
}
