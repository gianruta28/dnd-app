export interface StorageHandlerInterface<T> {
	read(key: string): T;
	insert(key: string, data: T): void;
	remove(key: string): void;
	clear(): void;
}
