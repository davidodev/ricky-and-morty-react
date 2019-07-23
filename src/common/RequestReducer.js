const defaultOptions = {
  errorFieldName: 'payload',
};


const createPendingReducer = (actionTypes) =>
  (state = false, action) => {
    switch (action.type) {
      case actionTypes.start:
        return true;
      case actionTypes.success:
      case actionTypes.error:
        return false;
      default:
        return state;
    }
  };

const createErrorReducer = (actionTypes, options) =>
  (state = null, action) => {
    switch (action.type) {
      case actionTypes.start:
      case actionTypes.success:
        return null;
      case actionTypes.error:
        return Object.prototype.hasOwnProperty.call(action, options.errorFieldName)
          ? action[options.errorFieldName]
          : {name: 'Error', message: 'ErrorFieldName not exist in action.'};
      default:
        return state;
    }
  };

const createSuccessReducer = (actionTypes) =>
  (state = false, action) => {
    switch (action.type) {
      case actionTypes.success:
        return true;
      case actionTypes.start:
      case actionTypes.error:
        return false;
      default:
        return state;
    }
  };


export const createRequestReducers = (actionTypes, options = defaultOptions) => ([
  createPendingReducer(actionTypes),
  createErrorReducer(actionTypes, options),
  createSuccessReducer(actionTypes),
]);
