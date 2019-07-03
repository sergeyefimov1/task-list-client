import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
    init() {
        this._super(...arguments);
        this.newTask = '';
    },
    actions: {
        submit(){
            this.handleSubmit(this.newTask);
            set(this, "newTask", '');
        },
        onChange(){
            this.handleChange(this.newTask);
        }
    }
});
