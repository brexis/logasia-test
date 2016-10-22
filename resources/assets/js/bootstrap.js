/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */
import './jquery.global';
import 'bootstrap-sass';
import moment from 'moment';
import 'angular';
import ngResource from 'angular-resource';
import uiBootstrapDatetimepicker from 'angular-bootstrap-datetimepicker';

window.moment = moment;
angular.module('LogasiaApp', [ngResource, uiBootstrapDatetimepicker]);
