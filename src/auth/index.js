/**
 *
 * Created by yin on 2017/7/8.
 */

export default {
  user: {
    authenticated: false
  },
  check () {
    var jwt = sessionStorage.getItem('token')
    // console.log("jwt--",jwt)
    if (jwt) {
      this.user.authenticated = true
      return true
    } else {
      // if (ENV.NODE_ENV=='"development"') {
      //   return true
      // }
      this.user.authenticated = false
      return false
    }
  },
}
