import React, {Component} from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import store from './store';
import App from './app';

describe('App', (component) => {

  beforeEach (() => {
    component = mount(<App store={store}/>);
  });

  describe('Unit tests', () => {
    it('should have 1 button', () => {
      expect(component.find('button').length).to.equal(1);
    });

    it('should have appState prop', () => {
      expect(component.props.store).to.be.defined;
    });
  });

  describe('Integration test', () => {
    it('should reset timer on button click', () => {
      component.find('button').simulate('click');
      expect(store.timer).to.eq(0);
    });
  });
});
