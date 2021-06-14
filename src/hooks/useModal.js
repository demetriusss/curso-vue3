import bus from '../utils/bus'

const EVENT_NAME = 'modal:toggle'

export default function useModal(){

    function open(payLoad = {}) {
        bus.emit(EVENT_NAME, { status: true, ...payLoad })
       //passando o status true e o resto dos dados
    }

    function close(payLoad = {}) {
        bus.emit(EVENT_NAME, { status: false, ...payLoad })
    }

    function listen(fn) {
        bus.on(EVENT_NAME, fn)
    }

    function off(fn){
        bus.off(EVENT_NAME, fn)
    }

    return {open, close, listen, off}
}
