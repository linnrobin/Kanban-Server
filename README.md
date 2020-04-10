# Kanban-Server


* **BASE URL**

  LOCAL - localhost:3000/
  HEROKU - https://kanban-server-robin.herokuapp.com/

**Show All Task**
----
  Returns json data about all tasks.

* **URL**

  /tasks

* **Method:**

  `GET`
  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[{"id":3,"title":"goreng ayam","category":"done","UserId":3,"createdAt":"2020-04-09T12:50:53.344Z","updatedAt":"2020-04-09T13:56:20.299Z"}]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `err`

* **Sample Call:**

  ```javascript
    axios({
          method: 'GET',
          url: this.baseUrl + '/tasks',
          headers: {
            access_token: localStorage.token
          }
    })

  ```


**Create Tasl**
----
  Create json data about a single task.

* **URL**

  /tasks

* **Method:**

  `POST`
  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Data Params**

   **Required:**

  `req.body`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{{"id":27,"title":"to be deleted","category":"delete","UserId":3,"updatedAt":"2020-04-10T16:32:16.135Z","createdAt":"2020-04-10T16:32:16.135Z"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Input cannot be empty " }`

* **Sample Call:**

  ```javascript
    axios({
          method: "POST",
          url: this.baseUrl + '/tasks',
          data: {
            title: this.task.title,
            category: this.task.category
          },
          headers: {
            access_token: localStorage.token
          }
    })

  ```


**Update Task Category**
----
  Update categoy data about a single task.

* **URL**

  /tasks/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  `req.body`
  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"id":3,"title":"goreng ayam","UserId":3,"category":"done","createdAt":"2020-04-09T12:50:53.344Z","updatedAt":"2020-04-10T16:34:36.848Z"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "error not found" }`

OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Input cannot be empty " }`

* **Sample Call:**

  ```javascript      
      axios({
            method: 'PUT',
            url: this.baseUrl + '/tasks/' + id,
            data: {
              category: nextCategory
            },
            headers: {
              access_token: localStorage.token
            }
      })
  ```


**Delete Task**
----
  Delete json data about a single task.

* **URL**

  /task/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"message":"Successfully deleted task"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "error not found" }`

* **Sample Call:**

```javascript
    axios({
          method: 'DELETE',
          url: this.baseUrl + '/tasks/' + id,
          headers: {
            access_token: localStorage.token
          }
    })
  ```

  **Login User**
----
  Login registered user.

* **URL**

  /users/login

* **Method:**

  `POST`

* **Data Params**

   **Required:**
 
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"id":1,"email":"a@a.com","access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhQGEuY29tIiwiaWF0IjoxNTg2NTM2NjQ2fQ.lB1_yrH_39WxyChHWRj6XmYO50Xg1dMt4DNSwJygRi4"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "User not found" }`

* **Sample Call:**

```javascript
        axios({
            method: 'POST',
            url: this.baseUrl + '/users/login',
            data: {
              email: this.user.email,
              password: this.user.password
            }
        })
  ```

  **Register User**
----
  Register new user.

* **URL**

  /users/register

* **Method:**

  `POST`
  
* **Data Params**

   **Required:**
 
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 OK <br />
    **Content:** `{"id":14,"email":"i@i.com","msg":"Successfully created"}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Email Already Exists" }`

* **Sample Call:**

```javascript
        axios({
            method: 'POST',
            url: this.baseUrl + '/users/register',
            data: {
              email: this.newUser.email,
              password: this.newUser.password
            }
        })
  ```

**Register / Login Google User**
----
  Register new user if it's not yet exist, Login user if it's already exist.

* **URL**

  /users/googleSign

* **Method:**

  `POST`

* **Data Params**

   **Required:**
 
   `id_token=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message : User Logged In }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

* **Sample Call:**

```javascript
    axios({
          method: 'POST',
          url: this.baseUrl + '/users/googleSign',
          data: {
            id_token
          }
    })
  ```