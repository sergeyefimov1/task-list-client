import App from '../app';
import DS from 'ember-data';

App.Task = DS.Model.extend({
    name: DS.attr('string'),
    is_done: DS.attr('number')
});