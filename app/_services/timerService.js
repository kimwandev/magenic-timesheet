import _ from 'lodash';
import {defaultTimer} from '../_data/lookup.js';

function _getDefaultTimer(){
    return defaultTimer;
}

function _addTimerConfig(newTimer){
    let success = true;
    const timerConfigsJsonString = localStorage.getItem('timers');
    let timers = JSON.parse(timerConfigsJsonString);

    if(!timers){
        timers = [];
    }

    let itemIndex = _.findIndex(timers, {timerName: newTimer.timerName});

    if(itemIndex >= 0 || newTimer.timerName == 'Pomodoro Timer'){
        success = false;
    }
    else{

        timers.push(newTimer);
        localStorage.setItem('timers', JSON.stringify(timers));
    }
    console.log(success);
    return success;
}

function _getAllTimerConfigs(){
     const timerConfigsJsonString = localStorage.getItem('timers');
     let timers = JSON.parse(timerConfigsJsonString);
     if(!timers){
         timers = [];
         localStorage.setItem('timers', JSON.stringify(timers));
     }
     return timers;
}

function _setCustomTimerConfig(timerConfig){
    localStorage.setItem('customTimer', JSON.stringify(timerConfig));
}

function _getCustomTimer(){
    return JSON.parse(localStorage.getItem('customTimer'));
}

function _deleteCustomTimerConfig(){
    localStorage.setItem('customTimer', null);
}

export default {
    getDefaultTimer : _getDefaultTimer,
    addTimerConfig : _addTimerConfig,
    getAllTimerConfigs: _getAllTimerConfigs,
    setCustomTimerConfig: _setCustomTimerConfig,
    deleteCustomTimerConfig: _deleteCustomTimerConfig,
    getCustomTimer: _getCustomTimer
}