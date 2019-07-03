import Component from '@ember/component';
// import config from "../../config/environment";
import { set } from '@ember/object';

export default Component.extend({
    init() {
        this._super(...arguments);
        this.tasks = [];
        this.headers = new Headers();
        this.headers.append('Authorization', 'bearer: SomeRandomString');
        this.headers.append("Content-Type", "application/json");
        fetch("http://localhost:8000/tasks").then(data => data.json()).then(data => {
            data = data.map(task => {return {...task, is_done: task.is_done == 1}});
            this.set('tasks', data);
            this.calculateCounters();
        });
    },
    showNewTask: false,
    newDisabled: true,
    actions: {
        editToggle(id) {
            let index = this.get('tasks').findIndex(task => task.id === id);

            if (this.get('tasks')[index].isEdit) {
                fetch("http://localhost:8000/tasks", {
                    headers: this.headers,
                    method: 'POST',
                    body: JSON.stringify(this.get('tasks')[index])
                }).then(() => {
                    set(this.get('tasks')[index], 'isEdit', !this.get('tasks')[index].isEdit);
                });
            }
            else {
                set(this.get('tasks')[index], 'isEdit', !this.get('tasks')[index].isEdit);
            }
        },
        deleteTask(id) {
            let index = this.get('tasks').findIndex(task => task.id === id);
            fetch("http://localhost:8000/tasks/" + id, {
                method: 'DELETE',
                headers: this.headers
            }).then(() => {
                this.get('tasks').removeObject(this.get('tasks')[index]);
                this.calculateCounters();
            })
        },
        toggleCheckbox(id) {
            let index = this.get('tasks').findIndex(task => task.id === id);
            set(this.get('tasks')[index], 'is_done', !this.get('tasks')[index].is_done);
            fetch("http://localhost:8000/tasks", {
                method: 'POST',
                body: JSON.stringify({...this.get('tasks')[index], is_done: this.get('tasks')[index].is_done ? 1 : 0}),
                headers: this.headers
            }).then(() => this.calculateCounters());
        },
        handleSubmit(newTask) {
            //todo: first add to db
            fetch("http://localhost:8000/tasks", {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify({name: newTask, is_done: false})
            }).then((response) => response.json()).then((data) => {
                this.get('tasks').addObject({
                    id: data.task.id,
                    name: data.task.name,
                    isEdit: false,
                    isDisabled: false
                });
                set(this, "showNewTask", !this.showNewTask);
                set(this, "newDisabled", true);
                this.calculateCounters();
            });

        },
        toggleNewTask() {
            set(this, "showNewTask", !this.showNewTask);
        },
        onNewChange(newTask) {
            if (newTask) {
                set(this, "newDisabled", false);
            } else {
                set(this, "newDisabled", true);
            }
        },
    },
    calculateCounters() {
        if (this.tasks) {
            set(this, "totalTasks",this.get('tasks').length);
            set(this, "doneTasks", this.get('tasks').filter(task => task.is_done).length);
            set(this, "tbdTasks", this.get('tasks').filter(task => !task.is_done).length);
        }
    }
});
