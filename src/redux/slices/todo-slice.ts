import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTodo, TTodoSlice } from "../../types";

const initialState: TTodoSlice = {
    todos: null,
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<{ title: string; description?: string }>) => {
            const newTodo: TTodo = {
                id: state.todos ? state.todos[0].id + 1 : 1,
                title: action.payload.title,
                description: action.payload.description,
                isCompleted: false,
            };

            state.todos = state.todos ? [newTodo, ...state.todos] : [newTodo];
        },
        deleteTodoById: (state, action: PayloadAction<{ id: number }>) => {
            if (!state.todos) return;

            state.todos.forEach((el, index) => {
                if (el.id === action.payload.id && state.todos && state.todos[index]) {
                    state.todos.splice(index, 1);
                    if (state.todos.length < 1) state.todos = null;
                    return;
                }
            });
        },
        editTodoById: (state, action: PayloadAction<{ id: number; new_title: string; new_description?: string }>) => {
            if (!state.todos) return;

            state.todos.forEach((el, index) => {
                if (el.id === action.payload.id && state.todos && state.todos[index]) {
                    state.todos[index].title = action.payload.new_title;
                    state.todos[index].description = action.payload.new_description;
                    return;
                }
            });
        },
        changeStatusById: (state, action: PayloadAction<{ id: number; new_isCompleted: boolean }>) => {
            if (!state.todos) return;

            state.todos.forEach((el, index) => {
                if (el.id === action.payload.id && state.todos && state.todos[index]) {
                    state.todos[index].isCompleted = action.payload.new_isCompleted;
                    return;
                }
            });
        },
    },
});

export const { addTodo, deleteTodoById, editTodoById, changeStatusById } = todoSlice.actions;
export default todoSlice.reducer;
