import { describe, expect, it } from "vitest";
import { Validator } from "./Validator";

describe("Validator", () => {
    it("正常なタイトルを入力すると有効になる", () => {
        // Arrange
        const validator = new Validator();

        // Act
        const result = validator.validateTitle("買い物に行く");

        // Assert
        expect(result.ok).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it("空のタイトルを入力すると必須エラーになる", () => {
        // Arrange
        const validator = new Validator();

        // Act
        const result = validator.validateTitle("");

        // Assert
        expect(result.ok).toBe(false);
        expect(result.errors).toContain("タイトルは必須です");
    });

    it("空白だけのタイトルを入力すると必須エラーになる", () => {
        // Arrange
        const validator = new Validator();

        // Act
        const result = validator.validateTitle("   ");

        // Assert
        expect(result.ok).toBe(false);
        expect(result.errors).toContain("タイトルは必須です");
    });

    it("100文字以内のタイトルを入力すると有効になる", () => {
        // Arrange
        const validator = new Validator();
        const title = "a".repeat(100);

        // Act
        const result = validator.validateTitle(title);

        // Assert
        expect(result.ok).toBe(true);
    });

    it("100文字を超えるタイトルを入力すると長さエラーになる", () => {
        // Arrange
        const validator = new Validator();
        const title = "a".repeat(101);

        // Act
        const result = validator.validateTitle(title);

        // Assert
        expect(result.ok).toBe(false);
        expect(result.errors).toContain("タイトルが長すぎます");
    });

    it("期限が設定されていない場合は有効になる", () => {
        // Arrange
        const validator = new Validator();
        const now = new Date("2026-07-17");

        // Act
        const result = validator.validateDueDate(null, now);

        // Assert
        expect(result.ok).toBe(true);
    });

    it("過去の日付を期限にすると期限エラーになる", () => {
        // Arrange
        const validator = new Validator();

        const now = new Date("2026-07-17");
        const dueDate = new Date("2026-07-16");

        // Act
        const result = validator.validateDueDate(dueDate, now);

        // Assert
        expect(result.ok).toBe(false);
        expect(result.errors).toContain("期限が過去です");
    });

    it("現在以降の日付を期限にすると有効になる", () => {
        // Arrange
        const validator = new Validator();

        const now = new Date("2026-07-17");
        const dueDate = new Date("2026-07-18");

        // Act
        const result = validator.validateDueDate(dueDate, now);

        // Assert
        expect(result.ok).toBe(true);
        expect(result.errors).toHaveLength(0);
    });
});
