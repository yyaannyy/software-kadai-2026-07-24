import { describe, expect, it } from "vitest";
import { TodoStore } from "./TodoStore";
import { TodoItem } from "./TodoItem";

describe("TodoStore", () => {
    it("Todoを追加すると登録したTodoを取得できる", () => {
        // Arrange
        const store = new TodoStore();
        const item = new TodoItem({
            id: "1",
            title: "買い物",
        });

        // Act
        store.add(item);

        // Assert
        expect(store.get("1")).toBe(item);
    });

    it("同じIDのTodoを追加するとエラーになる", () => {
        // Arrange
        const store = new TodoStore();

        store.add(
            new TodoItem({
                id: "1",
                title: "最初のTodo",
            }),
        );

        const duplicate = new TodoItem({
            id: "1",
            title: "重複Todo",
        });

        // Act & Assert
        expect(() => store.add(duplicate)).toThrow("duplicate id");
    });

    it("存在するTodoを削除するとtrueを返して登録数が減る", () => {
        // Arrange
        const store = new TodoStore();

        store.add(
            new TodoItem({
                id: "1",
                title: "削除対象",
            }),
        );

        // Act
        const result = store.remove("1");

        // Assert
        expect(result).toBe(true);
        expect(store.size).toBe(0);
    });

    it("存在しないIDを削除するとfalseを返す", () => {
        // Arrange
        const store = new TodoStore();

        // Act
        const result = store.remove("unknown");

        // Assert
        expect(result).toBe(false);
    });

    it("Todoを切り替えると完了状態が変更される", () => {
        // Arrange
        const store = new TodoStore();

        store.add(
            new TodoItem({
                id: "1",
                title: "作業",
            }),
        );

        // Act
        store.toggle("1");

        // Assert
        expect(store.get("1")!.done).toBe(true);
    });

    it("存在しないTodoを切り替えるとエラーになる", () => {
        // Arrange
        const store = new TodoStore();

        // Act & Assert
        expect(() => store.toggle("unknown")).toThrow("not found");
    });

    it("登録したTodo一覧を取得できる", () => {
        // Arrange
        const store = new TodoStore();

        store.add(
            new TodoItem({
                id: "1",
                title: "Todo1",
            }),
        );

        store.add(
            new TodoItem({
                id: "2",
                title: "Todo2",
            }),
        );

        // Act
        const result = store.all();

        // Assert
        expect(result).toHaveLength(2);
    });

    it("Todoを登録すると登録数を取得できる", () => {
        // Arrange
        const store = new TodoStore();

        store.add(
            new TodoItem({
                id: "1",
                title: "Todo",
            }),
        );

        // Act
        const result = store.size;

        // Assert
        expect(result).toBe(1);
    });
});
