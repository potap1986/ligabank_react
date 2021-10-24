import {ActionType} from "../const";

const initialState = {
	isPopupEnterVisible: false,
	isPopupInfoVisible: false,
	activeTab: 0
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.OPEN_POPUP_ENTER:
			return {
				...state,
				isPopupEnterVisible: action.payload
			};
		case ActionType.CLOSE_POPUP_ENTER:
			return {
				...state,
				isPopupEnterVisible: action.payload
			};
		case ActionType.OPEN_POPUP_INFO:
			return {
				...state,
				isPopupInfoVisible: action.payload
			};
		case ActionType.CLOSE_POPUP_INFO:
			return {
				...state,
				isPopupInfoVisible: action.payload
			};
		case ActionType.CHANGE_ACTIVE_TAB:
			return {
				...state,
				activeTab: action.payload
			};
		default:
			return state;
	}
}

export default reducer;