import React, {FC, useState} from 'react';
import './App.css';
import close from "./assets/cancel.svg"
import {useFormik} from "formik";

const App: FC = () => {

    type listType = {
        name: string
        selected: boolean
        completed: boolean
    }

    type arrListType = listType[]

    const [list, setList] = useState<arrListType>([])

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: (values, {resetForm}) => {
            setList(prevList => [...prevList, {name: values.name, selected: false, completed: false}])
            resetForm({})
        }
    });

    const deleteTodo = (id: number) => {
        const newList = [...list]
        newList.splice(id, 1)
        setList(newList)
    }

    const completeTodo = (id: number) => {
        const newList = [...list]
        newList[id].completed = !newList[id].completed
        setList(newList)
    }
    const selectTodo = (id: number) => {
        const newList = [...list]
        newList[id].selected = !newList[id].selected
        setList(newList)
    }

    const deleteSelected = () => {
        const newList = [...list]
        for (let i = 0;i<newList.length;i++)
        {
            if (newList[i].selected)
            {
                newList.splice(i, 1)
            }
        }
        setList(newList)
    }

    const selectAll = () => {
        const newList = [...list]
        newList.forEach(item => item.selected = true)
        setList(newList)
    }

    const unselectAll = () => {
        const newList = [...list]
        newList.forEach(item => item.selected = false)
        setList(newList)
    }

    const completeSelected = () => {
        const newList = [...list]
        for (let i = 0;i<newList.length;i++)
        {
            if (newList[i].selected)
            {
                newList[i].completed = true
            }
        }
        unselectAll()
        setList(newList)
    }

    const uncompleteSelected = () => {
        const newList = [...list]
        for (let i = 0;i<newList.length;i++)
        {
            if (newList[i].selected)
            {
                newList[i].completed = false
            }
        }
        unselectAll()
        setList(newList)
    }
    return (
        <div>
            <div className="head">
                <h1 className="title">TODO List</h1>
                <form className="title-add" onSubmit={formik.handleSubmit}>
                    <input
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className="title-inp"
                    />
                    <button type="submit" className="btn-add-todo">Submit</button>
                </form>
                <div className="btns">
                    <button name="unselect" onClick={selectAll}>select</button>
                    <button name="unselect" onClick={unselectAll}>unselect</button>
                    <button name="deleteSelected" onClick={deleteSelected}>delete</button>
                    <button name="completeSelected" onClick={completeSelected}>complete</button>
                    <button name="completeSelected" onClick={uncompleteSelected}>uncomplete</button>
                </div>
            </div>
            <div className="list-container">
                <ul className="list">
                    {list.map((item,index) => {
                        return <li className="list-item">
                            <input type="checkbox" checked={item.selected} onChange={() => {selectTodo(index)}}/>
                            <div className={item.completed ? "name-todo completed" : "name-todo"} onClick={() => {completeTodo(index)}}>{item.name}</div>
                            <button onClick={() => {deleteTodo(index)}} className="delete-btn">
                                <img src={close} alt="delete" className="delete-icon"/>
                            </button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;
