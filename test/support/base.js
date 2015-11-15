import sinon from 'sinon';
import chai, {should, expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'sinon-as-promised';

chai.use(chaiAsPromised);

// Expose all modules to node.js modules
global.sinon = sinon;
global.chai = chai;
global.should = should();
global.chaiAsPromised = chaiAsPromised;
global.expect = expect;
