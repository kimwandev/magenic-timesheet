import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher.js';

import _ from 'lodash';

class NotificationStore extends EventEmitter{
    constructor(){
        super();

        this.notificationMessage = null;
    }

    handleActions(action){
        switch(action.type){
            case "SHOW_VALIDATION_MESSAGE":
                this.notificationMessage = action.payload;
                this.emit('change');
                break;
            case "SHOW_SUCCESS_MESSAGE":
                this.notificationMessage = action.payload;
                this.emit('change');
                break;
        }
    }
}

const notificationStore = new NotificationStore;
notificationStore.dispacthId = Dispatcher.register(notificationStore.handleActions.bind(notificationStore));

export default notificationStore;