Vue.component('todo', {
    template: '#todo-template',
    props: {
        todos: Array
    },
    data: function() {
        return {
            beforeEditCache: '',
            newStatus: '',
            editedTodo: null
        };
    },
    methods: {
        editTodo: function(todo) {
            this.beforeEditCache = todo;
            this.editedTodo = todo;
        },
        doneEdit: function(todo, index) {
            if (!this.editedTodo) {
                return;
            }
            this.editedTodo = null;
            todo = todo.trim();
            if (!todo) {
                this.removeTodo(todo);
            }
            var finalStatus = this.todos;
            finalStatus[index] = todo;
            this.$emit('change', finalStatus);
        },
        cancelEdit: function(todo) {
            this.editedTodo = null;
            todo = this.beforeEditCache;
        },
        addStatus: function() {
            var text = this.newStatus.trim();
            if (text) {
                this.todos.push(text);
                this.newStatus = '';
            }            
            var finalStatus = this.todos;
            this.$emit('change', finalStatus);
        },
        removeStatus: function(index) {
            this.todos.splice(index, 1);
            var finalStatus = this.todos;
            this.$emit('change', finalStatus);
        }
    },
    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
        'todo-focus': function(el, value) {
            if (value) {
                el.focus();
            }
        }
    }
});
