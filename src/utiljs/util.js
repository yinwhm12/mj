/**
 * Created by yin on 2017/7/11.
 */

let util = {
  buildOffsetByPage(toPage, limit) {
    if (!toPage) {
      return 0
    }
    return (toPage - 1) * limit
  },
}

export default util
