import { useSelector } from "react-redux";
import styles from "./App.module.scss";
import { AddForm, Card } from "./components";
import { rootState } from "./redux/store";

function App() {
    const todos = useSelector((state: rootState) => state.todo.todos);

    return (
        <main className={styles.main}>
            <header className={styles.main__header}>
                <h1>ToDo App</h1>
            </header>
            <div className={styles.main__content}>
                {todos && todos.length > 0 ? (
                    <div className={styles.cards}>
                        {todos.map((todo) => (
                            <Card todo={todo} key={todo.id} />
                        ))}
                    </div>
                ) : (
                    <p className={styles.empty}>У вас пока нет задач</p>
                )}

                <hr />
                <AddForm />
            </div>
        </main>
    );
}

export default App;
