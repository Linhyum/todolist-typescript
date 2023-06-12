import { Todo } from "../TodoList";
import Button from "./Button";
import Heading from "./Heading";
interface TaskListProps {
    children: string;
    todos: Todo[];
    handleCheckbox: (id: string, done: boolean) => void;
    startEdit: (id: string) => void;
    deleteTodo: (id: string) => void;
}
const TaskList = ({ children, todos, handleCheckbox, startEdit, deleteTodo }: TaskListProps) => {
    return (
        <div className="mt-5">
            <Heading title={false}>{children}</Heading>
            {todos.length > 0 && (
                <ul className="flex flex-col mt-2 gap-y-2">
                    {todos.map((todo) => (
                        <li key={todo.id} className="flex items-center">
                            <div className="flex items-center gap-x-2">
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleCheckbox(todo.id, e.target.checked)}
                                    checked={todo.done}
                                    className="w-4 h-4 cursor-pointer"
                                    id={todo.id}
                                />
                                <label
                                    htmlFor={todo.id}
                                    className={`-translate-y-[1px] cursor-pointer ${
                                        todo.done && "text-gray-400 line-through"
                                    }`}
                                >
                                    {todo.name}
                                </label>
                            </div>
                            <div className="flex items-center ml-auto gap-x-1">
                                <Button
                                    onClick={() => startEdit(todo.id)}
                                    className="px-1 rounded-sm"
                                >
                                    🖋️
                                </Button>
                                <Button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="px-1 rounded-sm"
                                >
                                    🗑️
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
