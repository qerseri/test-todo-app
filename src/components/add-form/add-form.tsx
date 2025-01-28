import React, { FormEvent, useState } from "react";
import styles from "./add-form.module.scss";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/slices";
import { Button } from "../button/button";

export const AddForm: React.FC = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!title) return;

        dispatch(addTodo({ title, description }));
        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.form__inputContainer}>
                Задача
                <input type="text" placeholder="Введите что нужно сделать" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={30} />
            </label>
            <label className={styles.form__inputContainer}>
                Описание (опционально)
                <textarea
                    name="description"
                    placeholder="Введите описание задачи"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={200}
                    rows={5}
                />
            </label>

            <Button type="submit">Добавить</Button>
        </form>
    );
};

AddForm.displayName = "AddForm";
