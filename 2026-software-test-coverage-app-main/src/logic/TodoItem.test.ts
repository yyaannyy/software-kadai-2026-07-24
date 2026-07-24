import { describe, expect, it } from "vitest";
import { TodoItem } from "./TodoItem";

// ─────────────────────────────────────────────
// このファイルだけ AAA の「見本」が入っています（書き方の参考用）。
// 見本を真似て、テストケースは自分で考えて書いていきましょう。
// テスト観点のヒント: 正常系 / 異常系 / 境界値 / 特殊値(null・完了済み など)。
// `just cov` の赤い行・分岐を手がかりに、緑に塗っていく。
// ─────────────────────────────────────────────

describe("TodoItem", () => {
    it("見本1: 既定では未完了(done=false)", () => {
        // Arrange
        const item = new TodoItem({ id: "1", title: "牛乳を買う" });

        // Act
        const done = item.done;

        // Assert
        expect(done).toBe(false);
    });

    it("見本2: toggle すると done が反転する", () => {
        // Arrange
        const item = new TodoItem({ id: "1", title: "x" });

        // Act
        item.toggle();

        // Assert
        expect(item.done).toBe(true);
    });

    // ここから先は自分で考えて追加しよう。
    // 本体 (TodoItem.ts) を読み、まだテストされていないメソッド
    // (isOverdue / priorityWeight など) を観点別にテストする。
    it("期限を過ぎている未完了のTodoは期限切れと判定する", () => {
        // Arrange
        const now = new Date("2026-07-17");
        const item = new TodoItem({
            id: "1",
            title: "課題",
            dueDate: new Date("2026-07-16"),
        });

        // Act
        const result = item.isOverdue(now);

        // Assert
        expect(result).toBe(true);
    });

    it("完了済みのTodoは期限切れと判定しない", () => {
        // Arrange
        const now = new Date("2026-07-17");
        const item = new TodoItem({
            id: "1",
            title: "課題",
            done: true,
            dueDate: new Date("2026-07-16"),
        });

        // Act
        const result = item.isOverdue(now);

        // Assert
        expect(result).toBe(false);
    });

    it("期限が設定されていないTodoは期限切れと判定しない", () => {
        // Arrange
        const now = new Date("2026-07-17");
        const item = new TodoItem({
            id: "1",
            title: "課題",
        });

        // Act
        const result = item.isOverdue(now);

        // Assert
        expect(result).toBe(false);
    });

    it("高優先度は重み3を返す", () => {
        // Arrange
        const item = new TodoItem({
            id: "1",
            title: "課題",
            priority: "high",
        });

        // Act
        const result = item.priorityWeight();

        // Assert
        expect(result).toBe(3);
    });

    it("中優先度は重み2を返す", () => {
        // Arrange
        const item = new TodoItem({
            id: "1",
            title: "課題",
            priority: "mid",
        });

        // Act
        const result = item.priorityWeight();

        // Assert
        expect(result).toBe(2);
    });

    it("低優先度は重み1を返す", () => {
        // Arrange
        const item = new TodoItem({
            id: "1",
            title: "課題",
            priority: "low",
        });

        // Act
        const result = item.priorityWeight();

        // Assert
        expect(result).toBe(1);
    });
});
