import {render, screen} from "@testing-library/react";
import TodoList from "../../../../components/todos/todo-list/TodoList";
import userEvent from "@testing-library/user-event";

const editedTodo = {editing: false, id: 0};
const toggleEditMode = jest.fn();
const toggleCompleted = jest.fn();
const handleRemove = jest.fn();
const handleEdit = jest.fn();
const completeAll = jest.fn();

describe("TodoList should", () => {


    it("display given todos", async () => {
        render(<TodoList completeAll={completeAll}
                         filteredList={() => [{id: 0, completed: false, title: 'title', url: "", order: 1}]}
                         editedTodo={editedTodo} toggleCompleted={toggleCompleted} handleRemove={handleRemove}
                         toggleEditMode={toggleEditMode}
                         handleEdit={handleEdit}/>);

        expect(screen.getByText('title')).toBeInTheDocument();
    });

    it("display toggle all checkbox", async () => {
        const todos = [{id: 0, completed: false, title: 'title', url: "", order: 1}, {
            id: 1,
            completed: false,
            title: 'title1',
            url: "",
            order: 2
        }];
        render(<TodoList completeAll={completeAll} filteredList={() => todos}
                         editedTodo={editedTodo} toggleCompleted={toggleCompleted} handleRemove={handleRemove}
                         toggleEditMode={toggleEditMode}
                         handleEdit={handleEdit}/>);

        expect(screen.getByText(/mark all as complete/i)).toBeInTheDocument()
    });

    it("call toggle all checkbox", async () => {

        render(<TodoList completeAll={completeAll} filteredList={() => []}
                         editedTodo={editedTodo} toggleCompleted={toggleCompleted} handleRemove={handleRemove}
                         toggleEditMode={toggleEditMode}
                         handleEdit={handleEdit}/>);

        expect(screen.getByText(/mark all as complete/i)).toBeInTheDocument();
        const completeAllBtn = screen.getByRole("checkbox")
        userEvent.click(completeAllBtn);

        expect(completeAll).toBeCalledTimes(1);
    });
});