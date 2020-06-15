export class FriendRequestResult{
        /**
     * data to be sent.
     */
    private _data: any;
    /**
     * result code to be sent.
     */
    private _resultCode: number;


	constructor(data?: any, resultCode?: number) {
		this._data = data;
		this._resultCode = resultCode;
	}
    

    /**
     * Getter data
     * @return {any}
     */
	public get data(): any {
		return this._data;
	}

    /**
     * Getter resultCode
     * @return {number}
     */
	public get resultCode(): number {
		return this._resultCode;
	}

    /**
     * Setter data
     * @param {any} value
     */
	public set data(value: any) {
		this._data = value;
	}

    /**
     * Setter resultCode
     * @param {number} value
     */
	public set resultCode(value: number) {
		this._resultCode = value;
	}
    

    
}