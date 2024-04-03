class Configs {
    private _secret: string;

    constructor(secret: string) {
        this._secret = secret;
    }

    get secret(): string {
        return this._secret;
    }
}

const defaultSecret = "dGVzdGVJbnN0YUNhcnJvUmFmYWVsSGVucmlxdWU=";

export default new Configs(defaultSecret);
