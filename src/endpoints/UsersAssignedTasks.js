import '../globalTypedef'
import { Task } from '../model/Task'

/**
 * Class corresponding to Aworks UsersAssignedTasks Endpoints
 * @category Endpoints
 * @see [UsersAssignedTasks in Awork API Docs](https://openapi.awork.io/#/UsersAssignedTasks)
 */
 export class UsersAssignedTasks {

    /**
    * Endpoint constructor
    * @param {import('../client/index').Client} client
    * @param {String} taskId The id of the task.
    * @param {String} userId The id of the user.
    */
   constructor (client, taskId, userId) {
       /** @private */
       this._client = client
       /** @private */
       this._userId = userId
       /** @private */
       this._taskId = taskId
       /** @private */
       this._userPrefix = `/users/${this._userId}`
   }

    /**
    * Returns the assigned task with the specified id.
    * @returns {Promise<Task>}
    */
   async get () {
    const response = await this._client.get(`${this._userPrefix}/assignedtasks/${this._taskId}`)
    const data = response.data()
    return new Task(data)
   }

    /**
    * Returns all tasks assigned to a user. If a user gets his own tasks, the private tasks are part of the result as well. If you need only tasks of projects in status 'progress', set the 'inProgress' parameter to 'true'.
    * @param {ListOptions} [options] Pagination and filtering options
    * @returns {Promise<Array<Task>>}
    */
   async list (options) {
    const response = await this._client.get(`${this._userPrefix}/assignedtasks`, options)
    const data = response.data()
    return data.map(d => new Task(d))
   }

   /**
    * Returns all tags from the available tasks of the user ordered by name. The user making the request needs to be assigned to the task or needs read permissions on the feature "project-planning-data" for project tasks or read permissions on the "entity-master-data" of the entity of the task.
    * @returns {Promise<Array<String>>}
    */
   async getTaskTags () {
    const response = await this._client.get(`${this._userPrefix}/tasks/tags`)
    return response.data()
   }

    /**
    * Returns all tasks the user is allowed to see. This contains project tasks if the user has "project-planning" permissions, all assigned tasks and also private tasks created by the user and assigned to other users.
    * @param {ListOptions} [options] Pagination and filtering options
    * @returns {Promise<Array<Task>>}
    */
   async getAllAvailableTasks (options) {
    const response = await this._client.get(`${this._userPrefix}/allavailabletasks`, options)
    const data = response.data()
    return data.map(d => new Task(d))
   }
}