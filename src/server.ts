import { Application } from './Application';

const application = new Application();

const expressApplication = application.getExpressApplication();

export default expressApplication;
