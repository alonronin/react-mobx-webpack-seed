import Store from './store';
import sinon from 'sinon';
import { expect } from 'chai';

describe('Store', () => {
  let store, clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    store = new Store();
  });

  afterEach(() => clock.restore());

  it('is a class', () => {
    expect(store).to.be.a('object')
  });

  it('sets timer', () => {
    store.timer = 1;

    expect(store.timer).to.equals(1);
  });

  describe('constructor', () => {
    it('checks setTimeout', () => {
      store.timer = 0;

      clock.tick(1010);
      expect(store.timer).to.equals(1);
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
