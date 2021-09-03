import { Company } from "../model/Company"

export class Companies {

    constructor(client) {
        this.client = client
    }

    async get(companyId) {
        const response = await this.client.get(`/companies/${companyId}`)
        const data = response.data()
        return new Company(data)
    }

    async list() {
        const response = await this.client.get(`/companies`)
        const data = response.data()
        return data.map(d => new Company(d))
    }

    /**
     * 
     * @param {Company} company 
     */
    async create(company) {
        const response = await this.client.post(`/companies`, company)
        const data = response.data()
        return new Company(data)
    }

    /**
     * 
     * @param {Company} company 
     */
    async update(company) {
        const response = await this.client.put(`/companies`, company)
        const data = response.data()
        return new Company(data)
    }

    /**
     * @typedef {Object} DeleteCompanyOptions
     * @property {String} moveToCompany Moves all related objects to this company. Related projects and tasks (including their time entries) will be connected to this company. Have to set if 'DeleteOperation' contains 'move'.
     * @property {('move'|'delete-all-without-timeentries')} deleteOperation Defines the operation to delete a company. Possible operations are 'move': Move related objects to another company. 'delete-only-company': Delete only the company. Related objects loose the company information. 'delete-all-without-timeentries': Delete all related objects apart from time entries. 'delete-all': Delete all.
     */

    /**
     * 
     * @param {String} companyId 
     * @param {DeleteCompanyOptions} options 
     * @returns 
     */
    async delete(companyId, options) {
        await this.client.post(`/companies/${companyId}/`, options)
    }

}