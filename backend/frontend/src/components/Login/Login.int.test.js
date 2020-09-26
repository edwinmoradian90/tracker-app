import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import Login from './Login';
import rootReducer from '../../redux/reducers/rootReducer';

configure({ adapter: new Adapter() });

const store = createStore(rootReducer);

const setup = () => {
    const wrapper = mount(
        <Router>
            <Provider store={store}>
                <Login />
            </Provider>
        </Router>
    );
    return wrapper;
};

describe('Login integration test', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup()
    });
    it('Logs in user', () => {
        const email = wrapper.find('input').at(0).instance();
        email.value = 'test@test.com';
        expect(email.value).toEqual('test@test.com');
        const password = wrapper.find('.password');
        password.value = '123456';
        expect(password.value).toEqual('123456');
        const submit = wrapper.find('.submitLoginForm').at(0);
        submit.simulate('click');
    });
});