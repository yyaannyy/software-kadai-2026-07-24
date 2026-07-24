import { describe, it, expect } from "vitest";
import { Filter } from "./Filter";
import { TodoItem } from "./TodoItem";

// テスト観点のヒント（具体的なケースは自分で考えて洗い出そう）:
//   - 正常系: 期待どおりの入力で正しい結果になるか
//   - 異常系: エラーや throw になる入力はあるか
//   - 境界値: 0件・1件 など「境目」
//   - 特殊値: 完了済み / 未完了が混ざったリスト など
// 進め方: 本体 (Filter.ts) を読み、`just cov` の赤い行・分岐を手がかりに、
//         観点ごとの it(...) を自分で起こそう。書き方の見本は TodoItem.test.ts。
function makeItems() {
    const a = new TodoItem({ id: "1", title: "active1" });
    const b = new TodoItem({ id: "2", title: "active2" });
    const c = new TodoItem({ id: "3", title: "done1", done: true });
    return [a, b, c];
}

describe("Filter", () => {
    it("全件フィルタを指定するとすべてのTodoを返す", () => {
        // Arrange
        const filter = new Filter();
        const items = makeItems();

        // Act
        const result = filter.apply(items, "all");

        // Assert
        expect(result).toHaveLength(3);
    });

    it("未完了フィルタを指定すると未完了のTodoのみを返す", () => {
        // Arrange
        const filter = new Filter();
        const items = makeItems();

        // Act
        const result = filter.apply(items, "active");

        // Assert
        expect(result).toHaveLength(2);
        expect(result.every((item) => !item.done)).toBe(true);
    });

    it("完了フィルタを指定すると完了したTodoのみを返す", () => {
        // Arrange
        const filter = new Filter();
        const items = makeItems();

        // Act
        const result = filter.apply(items, "completed");

        // Assert
        expect(result).toHaveLength(1);
        expect(result[0]!.done).toBe(true);
    });
});
