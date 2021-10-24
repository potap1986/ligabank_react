import {ActionType} from "../const";

const ActionCreator = {
	openPopupEnter: (isPopupEnterVisible) => ({
		type: ActionType.OPEN_POPUP_ENTER,
		payload: true
	}),

	closePopupEnter: (isPopupEnterVisible) => ({
		type: ActionType.CLOSE_POPUP_ENTER,
		payload: false
	}),
	
	openPopupInfo: (isPopupInfoVisible) => ({
		type: ActionType.OPEN_POPUP_INFO,
		payload: true
	}),

	closePopupInfo: (isPopupInfoVisible) => ({
		type: ActionType.CLOSE_POPUP_INFO,
		payload: false
	}),
	
	changeActiveTab: (activeTab) => ({
		type: ActionType.CHANGE_ACTIVE_TAB,
		payload: activeTab
	}),
};

export default ActionCreator;
