export type TTodoSlice = {
    todos: TTodo[] | null;
};

export type TTodo = {
    id: number;
    title: string;
    description?: string;
    isCompleted: boolean;
};
