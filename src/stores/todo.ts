import { ref } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import { v4 as uuidv4 } from "uuid";

const INITIAL_TODO = {
  id: uuidv4(),
  order: 1,
  title: "Ititial Item",
  content: "",
  image: "",
};

export const useTodoStore = defineStore("todo", () => {
  const todos = ref([INITIAL_TODO]);
  const currentTodo = ref(INITIAL_TODO);

  const addTodo = () => {
    const addItem = {
      id: uuidv4(),
      order: todos.value.length + 1,
      title: "New Item" + todos.value.length,
      content: "",
      image: "",
    };

    if (todos.value.length < 10) {
      todos.value.push(addItem);
      currentTodo.value = addItem;
    }
  };

  type ChangeTodo = "title" | "content" | "image";
  const onChangeTodo = (proporty: ChangeTodo, changeValue: string) => {
    currentTodo.value[proporty] = changeValue;
    const todosIndex = todos.value.findIndex(
      (todo) => todo.id === currentTodo.value.id
    );

    const updatedTodos = todos.value.map((todo, index) => {
      if (index === todosIndex) return currentTodo.value;
      return todo;
    });

    todos.value = updatedTodos;
  };

  const setCurrentTodo = (todoId: string) => {
    const targetTodo = todos.value.find((todo) => todo.id === todoId);
    currentTodo.value = Object.assign({}, targetTodo);
  };

  const deleteTodo = (todoId: string) => {
    const deleteTodoIndex = todos.value.findIndex((todo) => todo.id === todoId);
    const nextTodoIndex = deleteTodoIndex - 1 > -1 ? deleteTodoIndex - 1 : 0;
    const jumpToTodoId = todos.value[nextTodoIndex].id;

    const remainTodos = todos.value
      .filter((todo) => todo.id !== todoId)
      .map((todo, index) => ({ ...todo, order: index + 1 }));
    todos.value = remainTodos;

    return jumpToTodoId;
  };

  return {
    todos,
    currentTodo,
    addTodo,
    onChangeTodo,
    setCurrentTodo,
    deleteTodo,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
}
