import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher.js';

import _ from 'lodash';

class TimerStore extends EventEmitter{
    constructor(){
        super();

        this.timerConfig = null;
        this.timerConfigs = [];
    }

    handleActions(action){
        switch(action.type){
            case "GET_DEFAULT_TIMER":
                this.timerConfig = action.payload;
                this.emit('change');
                break;
            case "ADD_NEW_TIMER_CONFIG":
                this.timerConfigs.push(action.payload);
                this.emit('change');
                break;
            case "FETCH_ALL_TIMERS":
                this.timerConfigs = action.payload;
                this.emit('change');
                break;
                
        }
    }
}

const timerStore = new TimerStore;
timerStore.dispacthId = Dispatcher.register(timerStore.handleActions.bind(timerStore));

export default timerStore;