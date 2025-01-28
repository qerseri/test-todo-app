import React, { useEffect, useState } from "react";
import styles from "./edit-content.module.scss";
import { TTodo } from "../../types";
import { Button } from "../button/button";
import { useDispatch } from "react-redux";
import { editTodoById } from "../../redux/slices";

type EditProps = {
    todo: TTodo;
    close: () => void;
};

export const EditContent: React.FC<EditProps> = ({ todo, close }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>(todo.title);
    const [description, setDescription] = useState<string>(todo.description ?? "");
    const [canEdit, setCanEdit] = useState<boolean>(false);

    useEffect(() => {
        if (!title) {
            setCanEdit(false);
            return;
        }

        if (title !== todo.title) {
            setCanEdit(true);
            return;
        }
        if (description !== todo.description) {
            setCanEdit(true);
            return;
        }

        setCanEdit(false);
    }, [title, description]);

    const handleEdit = () => {
        if (todo.isCompleted) return;

        dispatch(editTodoById({ id: todo.id, new_title: title, new_description: description }));
        close();
    };

    return (
        <div className={styles.editContent}>
            <h1>Редактирование</h1>
            <label className={styles.editContent__inputContainer}>
                Задача
                <input type="text" placeholder="Введите что нужно сделать" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={30} autoFocus />
            </label>
            <label className={styles.editContent__inputContainer}>
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

            <Button onClick={handleEdit} isDisabled={!canEdit}>
                Изменить
            </Button>
            <Button variant="secondary" onClick={close}>
                Отмена
            </Button>
        </div>
    );
};

EditContent.displayName = "EditContent";
