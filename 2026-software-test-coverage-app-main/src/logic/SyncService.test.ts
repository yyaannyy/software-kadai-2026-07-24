import { describe, expect, it } from "vitest";
import { SyncService, type RemoteClient } from "./SyncService";
import type { Persistence } from "./Storage";

class MemoryPersistence implements Persistence {
    data: string | null = null;

    load(): string | null {
        return this.data;
    }

    save(raw: string): void {
        this.data = raw;
    }
}

class MemoryRemoteClient implements RemoteClient {
    online = true;
    remoteData = "remote-data";
    pushedData: string | null = null;

    isOnline(): boolean {
        return this.online;
    }

    fetchRemote(): string {
        return this.remoteData;
    }

    pushRemote(raw: string): void {
        this.pushedData = raw;
    }
}

describe("SyncService", () => {
    it("オフラインの場合は同期を行わずskippedを返す", () => {
        // Arrange
        const remote = new MemoryRemoteClient();
        const local = new MemoryPersistence();

        remote.online = false;

        const service = new SyncService(remote, local);

        // Act
        const result = service.sync();

        // Assert
        expect(result).toBe("skipped");
    });

    it("ローカルデータが存在する場合はリモートへ送信してpushedを返す", () => {
        // Arrange
        const remote = new MemoryRemoteClient();
        const local = new MemoryPersistence();

        local.data = "local-data";

        const service = new SyncService(remote, local);

        // Act
        const result = service.sync();

        // Assert
        expect(result).toBe("pushed");
        expect(remote.pushedData).toBe("local-data");
    });

    it("ローカルデータが存在しない場合はリモートから取得して保存しpulledを返す", () => {
        // Arrange
        const remote = new MemoryRemoteClient();
        const local = new MemoryPersistence();

        remote.remoteData = "remote-data";

        const service = new SyncService(remote, local);

        // Act
        const result = service.sync();

        // Assert
        expect(result).toBe("pulled");
        expect(local.data).toBe("remote-data");
    });
});
