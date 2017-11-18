import {
  processJson,
  displayableError,
  secureImageSource,
  maybePermissionsError,
  handleIfApiError
} from '../../src/api/utils';
import ApiError from '../../src/api/ApiError';

import { expect } from 'chai';

describe('Api Response Processing', () => {
  context('processJson', () => {
    it('process response without errors', () => {
      expect(processJson({error: null}, {ok: true}))
      .to.deep.equal({error: null});
    });

    it('catches error in json response', () => {
      expect(() => processJson({error: 'email is invalid'}, {ok: false})).to.throw(/email is invalid/);
    });

    it('catches errors in json response', () => {
      expect(() => processJson({errors: {
        email: 'is invalid',
        password: 'is too short'
      }}, {ok: false})).to.throw(/email is invalid; password is too short/);
    });

    it('catches bad http status', () => {
      expect(() => processJson({responseData: 'someResult'}, {ok: false, status: 401, statusText: 'theError'})).to.throw(/Http Error: 401 theError/);
    });
  })
});

describe('Api Utils', () => {
  context('secureImageSource', () => {
    it('can convert imageSource from http to https', () => {
      expect(secureImageSource({})).to.deep.equal({});

      expect(secureImageSource(null)).to.be.null;

      expect(secureImageSource(123)).to.equal(123);

      expect(secureImageSource({uri: 'http://httpsomething'}))
        .to.deep.equal({uri: 'https://httpsomething'})
    });
  })

  context('displayableError', () => {
    it('wraps string if passed an error message', () => {
      expect(displayableError('hi')).to.equal('"hi"');
    });

    it('extracts the message if given an error', () => {
      expect(displayableError(new Error('hi'))).to.equal('hi');
    });
  })

  context('maybePermissionsError', () => {
    it('detects permissions in error message', () => {
      expect(maybePermissionsError('no permissions for this')).to.be.true;
      expect(maybePermissionsError("i'm ok")).to.be.false;
    });
  })
})
