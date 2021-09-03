// TODO: ALL
export class CompanyContactInfo {
    constructor(data) {
        this._data = data || {}
    }

    /**
     * @type {String}
     */
    get id() {
        return this._data.id
    }

    /**
     * @type {('phone'|'email'|'address'|'custom')}
     */
    get type() {
        return this._data.type
    }

    /**
     * @type {Boolean}
     */
    get isAddress() {
        return this._data.isAddress
    }

    toPlainObject() {
        return {
            id: this._data.id,
            name: this._data.name,
            hasImage: this._data.hasImage,
        }
    }
}