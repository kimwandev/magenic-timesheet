import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher.js';

import _ from 'lodash';

class NotificationStore extends EventEmitter{
    constructor(){
        super();

        this.shouldShowValidation = false;
        this.shouldShowSuccess = false;
        this.notificationMessage = null;
    }

    resetShowingMessages(){
        this.shouldShowSuccess = false;
        this.shouldShowValidation = false;
    }

    handleActions(action){
        this.resetShowingMessages();
        switch(action.type){
            case "SHOW_VALIDATION_MESSAGE":
                this.shouldShowValidation = true;
                this.notificationMessage = action.payload;
                this.emit('change');
                break;
            case "SHOW_SUCCESS_MESSAGE":
                this.shouldShowSuccess = true;
                this.notificationMessage = action.payload;
                this.emit('change');
                break;
        }
    }
}

const notificationStore = new NotificationStore;
notificationStore.dispacthId = Dispatcher.register(notificationStore.handleActions.bind(notificationStore));

export default notificationStore;