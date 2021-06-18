import bus from '../utils/bus'

const EVENT_NAME = 'abrirmodal'

export default function useModal(){

    function open(payLoad = null) {
        bus.emit(EVENT_NAME, { isActive: true, ...payLoad });
       //passando o status true e o resto dos dados
       //esse event name é só para identificar o evento
    }

    function close(payLoad = null) {
        bus.emit(EVENT_NAME, { isActive: false, ...payLoad })
    }

    function listen(fn) {
        bus.on(EVENT_NAME, fn)
    }

    //a função que ele recebe é para ele saber quem ele deve parar de escutar
    function off(fn){
        bus.off(EVENT_NAME, fn)
    }

    return {open, close, listen, off}
}
