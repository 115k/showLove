(function(window) {
  let timer = []
  function showToast(obj) {
    var obj = obj || {}
    // http://www.jq22.com/yanshi10876   文档参考
    $.toast({
      text: obj.text || '好！', // toast文案
      heading: obj.heading, // toast头部文案
      showHideTransition: obj.showHideTransition || 'plain', // 可选值：fade, slide， plain
      allowToastClose: false, // Boolean value true | false
      autoHide: false,
      hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
      stack: 10, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
      position: obj.position || 'bottom-left', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values       
      bgColor: obj.bgColor || '#444444',  // Background color of the toast
      textColor: obj.textColor || '#eeeeee',  // Text color of the toast
      textAlign: obj.textAlign || 'center',  // Text alignment i.e. left, right or center
      loader: obj.loader || true,  // Whether to show loader or not. True by default
      loaderBg: obj.loaderBg || '#c68dc1',  // Background color of the toast loader
      afterHidden: () => {
        $.toast().reset('all') // 隐藏后应该重置，否则位置等不会变化
      }
    })
  }

  Toast = function (textArr, successCallback) {
    this.textArr = textArr || []
    this.successCallback = successCallback
    this.index = 0
  }

  Toast.prototype = {
    // http://www.jq22.com/yanshi6789  文档参考
    confirm: $.confirm,
    start: function () {
      this.index = 0
      this.confirm({
        title: false,
        content: '小可爱！做我女朋友吧！我敲代码养你啊',
        animation: 'top',
        animationBounce: 1.5,
        confirmButton: '好，我愿意',
        cancelButton: '残忍拒绝',
        confirmButtonClass: 'btn-info',
        cancelButtonClass: 'btn-danger',
        confirm: this.successCallback.bind(this),
        cancel: this.nextConfirm.bind(this)
      })
    },
    nextConfirm: function(){
      if (this.index >= this.textArr.length) this.index = 0 // 如果走完了，就循环弹窗吧
      var opt = this.textArr[this.index]
      var toastArr = opt.toastArr || []
      this.index += 1
      this.confirm({
        title: false,
        content: opt.content || '',
        animation: opt.animation || 'top',
        animationBounce: opt.animationBounce || 1.5,
        confirmButton: opt.confirmButton || '愿意！',
        cancelButton: opt.cancelButton || '取消',
        confirmButtonClass: 'btn-info',
        cancelButtonClass: 'btn-danger',
        confirm: this.successCallback,
        cancel: this.nextConfirm.bind(this)
      })
      for (let i = 0; i < toastArr.length; i++) {
        timer[i] = setTimeout(() => {
          showToast(toastArr[i])
          clearTimeout(timer[i])
        }, toastArr[i].time || 200 + i * 100)
      }
    }
  }
  
  window.Toast = Toast
})(window)