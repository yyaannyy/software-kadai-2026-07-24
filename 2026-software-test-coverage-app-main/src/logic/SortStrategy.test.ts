import { describe, expect, it } from "vitest";
import { SortStrategy } from "./SortStrategy";
import { TodoItem } from "./TodoItem";

function makeItems() {
    const high = new TodoItem({
        id: "1",
        title: "高優先度",
        priority: "high",
        createdAt: new Date("2026-07-01"),
        dueDate: new Date("2026-07-20"),
    });

    const low = new TodoItem({
        id: "2",
        title: "低優先度",
        priority: "low",
        createdAt: new Date("2026-07-03"),
        dueDate: null,
    });

    const mid = new TodoItem({
        id: "3",
        title: "中優先度",
        priority: "mid",
        createdAt: new Date("2026-07-02"),
        dueDate: new Date("2026-07-10"),
    });

    return [high, low, mid];
}

describe("SortStrategy", () => {
    it("優先度で並び替えると高い順にTodoを返す", () => {
        // Arrange
        const sorter = new SortStrategy();
        const items = makeItems();

        // Act
        const result = sorter.sort(items, "priority");

        // Assert
        expect(result[0]!.priority).toBe("high");
        expect(result[1]!.priority).toBe("mid");
        expect(result[2]!.priority).toBe("low");
    });

    it("作成日時で並び替えると古いTodoから返す", () => {
        // Arrange
        const sorter = new SortStrategy();
        const items = makeItems();

        // Act
        const result = sorter.sort(items, "created");

        // Assert
        expect(result[0]!.title).toBe("高優先度");
        expect(result[1]!.title).toBe("中優先度");
        expect(result[2]!.title).toBe("低優先度");
    });

    it("期限で並び替えると期限が早いTodoから返す", () => {
        // Arrange
        const sorter = new SortStrategy();
        const items = makeItems();

        // Act
        const result = sorter.sort(items, "due");

        // Assert
        expect(result[0]!.title).toBe("中優先度");
        expect(result[1]!.title).toBe("高優先度");
        expect(result[2]!.dueDate).toBe(null);
    });

    it("期限なしのTodoは期限順では最後に返す", () => {
        // Arrange
        const sorter = new SortStrategy();
        const items = makeItems();

        // Act
        const result = sorter.sort(items, "due");

        // Assert
        expect(result[result.length - 1]!.dueDate).toBe(null);
    });

    it("降順を指定すると逆順でTodoを返す", () => {
        // Arrange
        const sorter = new SortStrategy();
        const items = makeItems();

        // Act
        const result = sorter.sort(items, "priority", true);

        // Assert
        expect(result[0]!.priority).toBe("low");
        expect(result[2]!.priority).toBe("high");
    });
});
