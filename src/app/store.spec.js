import store from './store';
import {expect} from 'chai';

describe('Store', () => {
  it('is a class', () => {
    expect(store).to.be.a('object')
  });

  it('sets timer', () => {
    store.timer = 1;

    expect(store.timer).to.equals(1);
  });

  describe('constructor', () => {
    it('checks setTimeout', (done) => {
      store.timer = 0;

      setTimeout(()=> {
        expect(store.timer).to.equals(2);
        done();
      }, 1000)
    });
  });

  describe('resetTimer()', () => {
    it('is a function', () => {
      expect(store.resetTimer).to.be.a('function');
    });

    it('resets timer', () => {
      store.timer = 1;
      store.resetTimer();

      expect(store.timer).to.equals(0);
    })

  });


});
