interface CRUD {

    collection: string;
    get(id: string): Promise<any>;
    getAll(): Promise<Array<any>>;
    set(item: any): Promise<any>;
    delete(id: string): Promise<any>;
}