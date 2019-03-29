module.exports = {
  result: true,
  err: '',
  /**
   * @description 判断必须参数是否齐
   * @param param  参数对象
   * @param {*} arr 必须参数名称数组
   */
  paramsMustHave(param, arr) {
    if (this.result) {
      if (!this._exist(param)) {
        this.err = '参数' + arr[0] + '必填！';
        this.result = false;
      } else {
        this.result = arr.every(item => {
          if (!this._exist(param[item])) {
            this.err = '参数' + item + '必填！'
            return false;
          } else {
            return true;
          }
        })
      }
    }
    return this;
  },
  _exist(value) {
    if (typeof (value) === 'undefined' || typeof (value) === '') {
      return false;
    } else {
      return true;
    }
  },
  getResult() {
    return {
      result: this.result,
      err: this.err
    };
  },
  setResult(result = true, err = '') {
    this.result = result;
    this.err = ''
    return this;
  }
}