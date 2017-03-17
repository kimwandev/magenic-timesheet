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
    let success = timerService.addTimerConfig(timer);
    if(success){
        dispatcher.dispatch({
            type: 'ADD_NEW_TIMER_CONFIG',
            payload: timer
        })
    }
    else{
        dispatcher.dispatch({
            type: 'SHOW_VALIDATION_MESSAGE',
            payload: 'Duplicate Timer Name Not Allowed'
        })
    }
}

export function getAllTimerConfigs(){
    var timers = timerService.getAllTimerConfigs();
    dispatcher.dispatch({
        type: 'FETCH_ALL_TIMERS',
        payload: timers
    })
}