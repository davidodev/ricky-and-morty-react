import { createRequestReducers } from './RequestReducer';

describe('Common:  RequestReducer:', () => {
    describe('createRequestReducers', () => {

        const ACTION_NAME = 'ACTION_NAME';
        const ACTION_NAME_ERROR = 'ACTION_NAME_ERROR';
        const ACTION_NAME_SUCCESS = 'ACTION_NAME_SUCCESS';

        const constants = {
            start: ACTION_NAME,
            error: ACTION_NAME_ERROR,
            success: ACTION_NAME_SUCCESS,
        };

        const [
            pendingReducer,
            errorReducer,
            successReducer,
        ] = createRequestReducers(constants);

        it('should create reducers for pending request', () => {
            const action = {
                type: ACTION_NAME,
                payload: {
                    test: 'test',
                },
            };

            expect(pendingReducer(false, action)).toEqual(true);
            expect(errorReducer(null, action)).toEqual(null);
            expect(successReducer(false, action)).toEqual(false);

            expect(pendingReducer(true, action)).toEqual(true);
            expect(errorReducer({name: 'Error', message: 'test'}, action)).toEqual(null);
            expect(successReducer(true, action)).toEqual(false);
        });

        it('should create reducers for error request', () => {
            const error = {name: 'New Error', message: 'test'};
            const action = {
                type: ACTION_NAME_ERROR,
                payload: error,
            };

            expect(pendingReducer(true, action)).toEqual(false);
            expect(errorReducer(null, action)).toEqual(error);
            expect(successReducer(false, action)).toEqual(false);

            expect(pendingReducer(false, action)).toEqual(false);
            expect(errorReducer({name: 'Error', message: 'test'}, action)).toEqual(error);
            expect(successReducer(true, action)).toEqual(false);
        });

        it('should create reducers for error request with optional error field name', () => {
            const error = {name: 'New Error', message: 'test'};
            const action = {
                type: ACTION_NAME_ERROR,
                error,
            };

            const [, newErrorReducer] = createRequestReducers(constants, {errorFieldName: 'error'});

            expect(newErrorReducer(null, action)).toEqual(error);
        });

        it('should create reducers for error request with wrong optional error field name', () => {
            const error = {name: 'New Error', message: 'test'};
            const genericError = {name: 'Error', message: 'ErrorFieldName not exist in action.'};

            const action = {
                type: ACTION_NAME_ERROR,
                error,
            };

            const [, newErrorReducer] = createRequestReducers(constants, {errorFieldName: 'test'});

            expect(newErrorReducer(null, action)).toEqual(genericError);
        });

        it('should create reducers for success request', () => {
            const action = {
                type: ACTION_NAME_SUCCESS,
            };

            expect(pendingReducer(false, action)).toEqual(false);
            expect(errorReducer(null, action)).toEqual(null);
            expect(successReducer(false, action)).toEqual(true);

            expect(pendingReducer(true, action)).toEqual(false);
            expect(errorReducer({name: 'Error', message: 'test'}, action)).toEqual(null);
            expect(successReducer(true, action)).toEqual(true);
        });
    });
});
