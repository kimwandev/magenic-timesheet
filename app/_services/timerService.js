import _ from 'lodash';
import {defaultTimer} from '../_data/lookup.js';

function _getDefaultTimer(){
    return defaultTimer;
}

function _addTimerConfig(newTimer){
    const timerConfigsJsonString = localStorage.getItem('timers');
    let timers = JSON.parse(timerConfigsJsonString);
    if(!timers){
        timers = [];
    }
    timers.push(newTimer);
    localStorage.setItem('timers', JSON.stringify(newTimer));

}

export default {
    getDefaultTimer : _getDefaultTimer,
    addTimerConfig : _addTimerConfig
}