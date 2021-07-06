import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/reducers/rootReducer';
import Login from './Login';

describe('Login', () => {
    it('Renders', () => {
        const store = createStore(rootReducer);
        const component = renderer.create(
            <Router>
                <Provider store={store}>
                    <Login />
                </Provider>
            </Router>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});