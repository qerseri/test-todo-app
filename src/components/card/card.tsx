import styles from "./card.module.scss";
import { TTodo } from "../../types";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeStatusById, deleteTodoById } from "../../redux/slices";
import { Modal } from "../modal/modal";
import { Button } from "../button/button";
import { EditContent } from "./edit-content";

//todo: decompose
export const Card: React.FC<{ todo: TTodo }> = ({ todo }) => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false);
    const [isEditVisible, setIsEditVisible] = useState<boolean>(false);

    return (
        <>
            <div
                className={`${styles.card} ${todo.isCompleted && styles["card--completed"]}`}
                style={todo.description ? { cursor: "pointer" } : undefined}
                onClick={() => {
                    if (!todo.description) {
                        return;
                    }
                    setIsExpanded((prev) => !prev);
                }}
            >
                <div className={styles.card__top}>
                    <div className={styles.leftSide}>
                        <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(changeStatusById({ id: todo.id, new_isCompleted: !todo.isCompleted }));
                            }}
                        />
                        {todo.title}
                    </div>

                    <div className={styles.rightSide}>
                        {!todo.isCompleted && (
                            <LuPencil
                                className={styles.rightSide__icon}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditVisible(true);
                                }}
                            />
                        )}
                        <FaRegTrashAlt
                            className={styles.rightSide__icon}
                            color="red"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsDeleteVisible(true);
                            }}
                        />
                    </div>
                </div>
                {todo.description && <span className={`${styles.card__bottom} ${isExpanded && styles["card__bottom--expanded"]}`}>{todo.description}</span>}
            </div>

            <Modal isOpen={isDeleteVisible} close={() => setIsDeleteVisible(false)}>
                <div className={styles.deleteModalContent}>
                    <p>Вы уверены что хотите удалить задачу?</p>
                    <Button
                        variant="red"
                        style={{ marginTop: "1rem" }}
                        onClick={() => {
                            dispatch(deleteTodoById({ id: todo.id }));
                            setIsDeleteVisible(false);
                        }}
                    >
                        Да
                    </Button>
                    <Button variant="secondary" onClick={() => setIsDeleteVisible(false)}>
                        Оставить
                    </Button>
                </div>
            </Modal>
            <Modal isOpen={isEditVisible} close={() => setIsEditVisible(false)}>
                <EditContent todo={todo} close={() => setIsEditVisible(false)} />
            </Modal>
        </>
    );
};

Card.displayName = "Card";
