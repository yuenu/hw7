import { useTodoStore } from "./../../stores/todo";
import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import SideBar from "../SideBar.vue";

describe("<SideBar />", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const wrapper = mount(SideBar, {
    global: {
      plugins: [createTestingPinia({ stubActions: false })],
    },
  });

  const store = useTodoStore();
  const heading = wrapper.find("h1");
  const todoItem = wrapper.find('[role="link"]');
  const addTodoButton = wrapper.find('[type="button"]');

  it("First mounted should has heading and one todo item", () => {
    expect(heading.text()).toContain("Demo Todo List");
    expect(todoItem.text()).toContain("Ititial Item");
    expect(addTodoButton.text()).toContain("Add Item");
    expect(store.todos.length).toBe(1);
  });

  it("Click add button should have add one more item", async () => {
    await addTodoButton.trigger("click");
    expect(store.addTodo).toHaveBeenCalledTimes(1);
    expect(store.todos.length).toBe(2);
  });

  it("Maximum  todo item sholud only 10", async () => {
    for (let i = 0; i < 20; i++) {
      await addTodoButton.trigger("click");
    }
    expect(store.todos.length).toBe(10);
  });
});
