import { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import useLocalStorage from "./hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
export interface Todo {
    name: string;
    done: boolean;
    id: string;
}
const TodoList = () => {
    const [storedValue, setValue] = useLocalStorage<Todo[]>("todos", []);
    const [todos, setTodos] = useState<Todo[]>(storedValue);
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

    //thêm
    const addTodo = (name: string) => {
        const todo: Todo = {
            name,
            done: false,
            id: uuidv4(),
        };
        setTodos((prevTodo) => [...prevTodo, todo]);
        setValue((prevTodo) => [...prevTodo, todo]);
    };

    //checkbox
    const todosNotDone = todos.filter((todo) => !todo.done);
    const todosDone = todos.filter((todo) => todo.done);
    const handleCheckbox = (id: string, done: boolean) => {
        setTodos((prevTodo) => prevTodo.map((todo) => (todo.id === id ? { ...todo, done } : todo)));
        setValue((prevTodo) => prevTodo.map((todo) => (todo.id === id ? { ...todo, done } : todo)));
    };

    //edit
    const startEdit = (id: string) => {
        const findTodo = todos.find((todo) => todo.id === id);
        if (findTodo) {
            setCurrentTodo(findTodo);
        }
    };
    const edit = (name: string) => {
        setCurrentTodo((prev) => {
            return prev && { ...prev, name };
        });
    };
    const endEdit = () => {
        setTodos((prev) => prev.map((todo) => (todo.id === currentTodo?.id ? currentTodo : todo)));
        setValue((prev) => prev.map((todo) => (todo.id === currentTodo?.id ? currentTodo : todo)));
        setCurrentTodo(null);
    };

    //xoá
    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        setValue((prev) => prev.filter((todo) => todo.id !== id));
        setCurrentTodo(null);
    };
    return (
        <div className="w-[350px] bg-white rounded-lg p-3 mx-auto my-10">
            <TaskInput
                endEdit={endEdit}
                edit={edit}
                currentTodo={currentTodo}
                todos={todos}
                addTodo={addTodo}
            ></TaskInput>
            <TaskList
                deleteTodo={deleteTodo}
                startEdit={startEdit}
                todos={todosNotDone}
                handleCheckbox={handleCheckbox}
            >
                Chưa hoàn thành
            </TaskList>
            <TaskList
                deleteTodo={deleteTodo}
                startEdit={startEdit}
                todos={todosDone}
                handleCheckbox={handleCheckbox}
            >
                Hoàn thành
            </TaskList>
        </div>
    );
};

export default TodoList;
