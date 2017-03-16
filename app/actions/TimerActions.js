import dispatcher from '../dispatcher.js';
import timerService from '../_services/timerService.js';

export function getDefaultTimer(){
    const timer = timerService.getDefaultTimer();
    dispatcher.dispatch({
        type: 'GET_DEFAULT_TIMER',
        payload: timer
    })
}

export function addTimer(timer){
    timerService.addTimerConfig(timer);
    dispatcher.dispatch({
        type: 'ADD_NEW_TIMER_CONFIG',
        payload: timer
    })
}