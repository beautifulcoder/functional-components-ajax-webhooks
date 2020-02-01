import { bindActionCreators } from 'redux';

const DUMMY_LOADING_STATE_DATA = 'DUMMY_LOADING_STATE_DATA';
const DUMMY_UPDATE_STATE_DATA = 'DUMMY_UPDATE_STATE_DATA';
const DUMMY_ERROR_STATE_DATA = 'DUMMY_ERROR_STATE_DATA';

export const showLoadingState = () => ({type: DUMMY_LOADING_STATE_DATA});
export const updateStateData = (state) => ({type: DUMMY_UPDATE_STATE_DATA, payload: state });
export const errorStateData = (reason) => ({type: DUMMY_ERROR_STATE_DATA, payload: reason, error: true });

export const loadInitStateData = () => async (dispatch, getState, axios) => {
  dispatch(showLoadingState());

  try {
    const url = '/person.json';
    const response = await axios.get(url);

    return dispatch(updateStateData(response.data));
  } catch (reason) {
    return dispatch(errorStateData(reason.message));
  }
};

const initialState = {
  firstName: '',
  isInit: false,
  isLoading: false,
  isError: false
};

export const dummyReducer = (state = initialState, action) => {
  switch (action.type) {
    case DUMMY_LOADING_STATE_DATA:
      return {...state, isLoading: true, isInit: true};

    case DUMMY_UPDATE_STATE_DATA:
      const {firstName} = action.payload;
      return {...state, firstName: firstName, isLoading: false};

    case DUMMY_ERROR_STATE_DATA:
      return {...state, isError: true, isLoading: false};

    default:
      return state;
  }
};

export const mapStateToProps = (state) => state.dummy;
export const mapDispatchToProps = (dispatch) => bindActionCreators({showLoadingState, loadInitStateData, updateStateData, errorStateData}, dispatch);
