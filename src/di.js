import request from 'request-promise';
import requestDebugger from 'request-debug';

requestDebugger(request);
export default request;
