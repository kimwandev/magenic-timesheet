import dispatcher from '../dispatcher.js';
import timerService from '../_services/timerService.js';

export function getDefaultTimer(){
    let timer = timerService.getCustomTimer();
    if(!timer){
        timer = timerService.getDefaultTimer();
    }
    dispatcher.dispatch({
        type: 'GET_DEFAULT_TIMER',
        payload: timer
    })
}

export function resetConfigToDefault(){
    timerService.deleteCustomTimerConfig();
    const timer = timerService.getDefaultTimer();
    dispatcher.dispatch({
        type: 'GET_DEFAULT_TIMER',
        payload: timer
    });

    dispatcher.dispatch({
        type: 'SHOW_SUCCESS_MESSAGE',
        payload: 'Timer Config was Reset'
    });
}

export function setCustomTimerConfig(customTimer){

    if(customTimer.timerName == 'Pomodoro Timer'){
        dispatcher.dispatch({
            type: 'SHOW_VALIDATION_MESSAGE',
            payload: 'Please choose different timer name than Pomodoro Timer'
        })
    } else{
        timerService.setCustomTimerConfig(customTimer);
        dispatcher.dispatch({
            type: 'GET_CUSTOM_TIMER',
            payload: customTimer
        })

        dispatcher.dispatch({
            type: 'SHOW_SUCCESS_MESSAGE',
            payload: 'New Timer Config was Set'
        })
    }

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