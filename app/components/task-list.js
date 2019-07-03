import Component from '@ember/component';

export default Component.extend({
    actions: {
        editToggle(id) {
            this.get('editToggle')(id);
        },
        deleteTask(id) {
            this.get('deleteTask')(id)
        },
        toggleCheckbox(id) {
            this.get('toggleCheckbox')(id)
        },
        handleSubmit(newTask) {
            this.get('handleSubmit')(newTask)
        },
        toggleNewTask() {
            this.get('toggleNewTask')();
        },
        onNewChange(newTask) {

            this.get('onNewChange')(newTask)

        },
    }

});
