import { describe, expect, it } from "vitest";
import { Storage, type Persistence } from "./Storage";
import { TodoStore } from "./TodoStore";
import { TodoItem } from "./TodoItem";

class MemoryPersistence implements Persistence {
    private data: string | null = null;

    load(): string | null {
        return this.data;
    }

    save(raw: string): void {
        this.data = raw;
    }
}

describe("Storage", () => {
    it("Todoを保存すると保存した内容を読み込める", () => {
        // Arrange
        const persistence = new MemoryPersistence();
        const storage = new Storage(persistence);

        const store = new TodoStore();
        store.add(
            new TodoItem({
                id: "1",
                title: "勉強する",
                done: true,
                priority: "high",
            }),
        );

        // Act
        storage.save(store);
        const result = storage.load();

        // Assert
        const item = result.all()[0];

        expect(item.id).toBe("1");
        expect(item.title).toBe("勉強する");
        expect(item.done).toBe(true);
        expect(item.priority).toBe("high");
    });

    it("保存データが存在しない場合は空のTodoStoreを返す", () => {
        // Arrange
        const persistence = new MemoryPersistence();
        const storage = new Storage(persistence);

        // Act
        const result = storage.load();

        // Assert
        expect(result.all()).toHaveLength(0);
    });

    it("期限付きTodoを保存すると期限情報を保持して復元する", () => {
        // Arrange
        const persistence = new MemoryPersistence();
        const storage = new Storage(persistence);

        const dueDate = new Date("2026-07-20");

        const store = new TodoStore();
        store.add(
            new TodoItem({
                id: "1",
                title: "課題提出",
                dueDate,
            }),
        );

        // Act
        storage.save(store);
        const result = storage.load();

        // Assert
        expect(result.all()[0]!.dueDate).toEqual(dueDate);
    });
});
