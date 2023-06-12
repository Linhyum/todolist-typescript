import Heading from "./Heading";
import Button from "./Button";
import React, { useRef, useState } from "react";
import { Todo } from "../TodoList";
interface TaskInputProps {
    addTodo: (name: string) => void;
    todos: Todo[];
    currentTodo: Todo | null;
    edit: (name: string) => void;
    endEdit: () => void;
}
const TaskInput = ({ addTodo, todos, currentTodo, edit, endEdit }: TaskInputProps) => {
    const [name, setName] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentTodo) {
            endEdit();
            setName("");
        } else if (
            !todos.some(
                (todo) => todo.name.toLowerCase() === inputRef.current?.value.toLowerCase()
            ) &&
            inputRef.current?.value !== ""
        ) {
            addTodo(name);
            setName("");
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentTodo) {
            edit(e.target.value);
        } else {
            setName(e.target.value);
        }
    };
    return (
        <>
            <Heading>To do list typescript</Heading>
            <form onSubmit={handleAdd} className="mt-3 h-[40px] flex items-center gap-x-2">
                <input
                    ref={inputRef}
                    onChange={handleChange}
                    value={currentTodo?.name || name}
                    type="text"
                    placeholder="caption goes here"
                    className="w-full h-full px-3 border rounded-lg outline-none border-slate-700"
                />
                <Button>{currentTodo ? "✔️" : "➕"}</Button>
            </form>
        </>
    );
};

export default TaskInput;
