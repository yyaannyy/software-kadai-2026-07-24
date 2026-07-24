import { describe, expect, it } from "vitest";
import { Stats } from "./Stats";
import { TodoItem } from "./TodoItem";

function makeItems() {
    const completed = new TodoItem({
        id: "1",
        title: "完了済み",
        done: true,
    });

    const active = new TodoItem({
        id: "2",
        title: "未完了",
    });

    const overdue = new TodoItem({
        id: "3",
        title: "期限切れ",
        dueDate: new Date("2026-07-01"),
    });

    return [completed, active, overdue];
}

describe("Stats", () => {
    it("完了したTodoが半分の場合は完了率0.5を返す", () => {
        // Arrange
        const stats = new Stats();
        const items = [
            new TodoItem({ id: "1", title: "完了", done: true }),
            new TodoItem({ id: "2", title: "未完了" }),
        ];

        // Act
        const result = stats.completionRate(items);

        // Assert
        expect(result).toBe(0.5);
    });

    it("Todoが存在しない場合は完了率0を返す", () => {
        // Arrange
        const stats = new Stats();

        // Act
        const result = stats.completionRate([]);

        // Assert
        expect(result).toBe(0);
    });

    it("未完了のTodo数を返す", () => {
        // Arrange
        const stats = new Stats();
        const items = [
            new TodoItem({ id: "1", title: "完了", done: true }),
            new TodoItem({ id: "2", title: "未完了1" }),
            new TodoItem({ id: "3", title: "未完了2" }),
        ];

        // Act
        const result = stats.remaining(items);

        // Assert
        expect(result).toBe(2);
    });

    it("期限切れのTodo数を返す", () => {
        // Arrange
        const stats = new Stats();
        const now = new Date("2026-07-17");

        const items = [
            new TodoItem({
                id: "1",
                title: "期限切れ",
                dueDate: new Date("2026-07-01"),
            }),
            new TodoItem({
                id: "2",
                title: "期限内",
                dueDate: new Date("2026-07-20"),
            }),
        ];

        // Act
        const result = stats.overdueCount(items, now);

        // Assert
        expect(result).toBe(1);
    });

    it("完了済みのTodoは期限切れとして数えない", () => {
        // Arrange
        const stats = new Stats();
        const now = new Date("2026-07-17");

        const items = [
            new TodoItem({
                id: "1",
                title: "完了済み期限切れ",
                done: true,
                dueDate: new Date("2026-07-01"),
            }),
        ];

        // Act
        const result = stats.overdueCount(items, now);

        // Assert
        expect(result).toBe(0);
    });
});
