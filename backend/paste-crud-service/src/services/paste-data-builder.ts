import { Pastedata } from "../entity/pastedata";

export class PastedataBuilder {
    private pastedata: Pastedata;

    constructor() {
        this.pastedata = new Pastedata();
    }

    setTitle(title: string) {
        this.pastedata.title = title;
        return this;
    }

    setContent(content: any) {
        this.pastedata.content = content;
        return this;
    }

    setAuthor(author: number) {
        this.pastedata.author = author;
        return this;
    }

    setExpiresAt(expiresAt?: number) {
        if (expiresAt) {
            this.pastedata.expiresAt = new Date(Date.now() + expiresAt * 1000);
        }
        return this;
    }

    build() {
        return this.pastedata;
    }
}
