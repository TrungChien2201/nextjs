- [Starter Code](#starter-code)
- [Expectations](#expectations)
- [Requirements](#requirements)
  - [Tools](#tools)
  - [Page Features](#page-features)
    - [`/src/pages/todos/index.jsx` (`/todos`)](#srcpagestodosindexjsx-todos)
    - [`/src/pages/todos/[id].jsx` (`/todos/:id`)](#srcpagestodosidjsx-todosid)
- [API Reference](#api-reference)
  - [Link](#link)
  - [Todo Endpoints](#todo-endpoints)
    - [Allowed Create/Update Fields](#allowed-createupdate-fields)
    - [Index Queries](#index-queries)
  - [TodoItems Endpoints](#todoitems-endpoints)
    - [Allowed Create/Update Fields](#allowed-createupdate-fields-1)

# Starter Code
- Clone Repo
- Run `$ npm install`
- Run `$ npm run dev`

# Expectations
- [ ] Ability to fetch data in `getStaticProps` and pass it to `swr` as `initial data`
- [ ] Ability to use `initial data` to add `SEO` to pages
- [ ] Ability to use `swr` to fetch data
- [ ] Ability to use `swr` to mutate data
- [ ] Ability to use `swr` to invalidate data
- [ ] Ability to use `formik` to create forms
- [ ] Ability to use `yup` to validate forms
- [ ] Ability to show `yup errors` in `formik` forms inputs
- [ ] Ability to use `modal` with `form` to create/update data
- [ ] Ability to create components to reuse code (no need to make everything a component, just the ones that make sense)
- [ ] Ability to use `boostrap & react-bootstrap` to style components

# Requirements
## Tools
- XHR | `axios` & `swr`
- CSS | `bootstrap` & `react-bootstrap` & `scss`
- Forms | `formik`
- Form Validation | `yup`
- Notifications | `react-toastify`

## Page Features
### `/src/pages/todos/index.jsx` (`/todos`)
- [ ] `SEO` (No Initial Data Required)
- [ ] `List` out all todos
- [ ] `New Todo Button` to open a modal with form to create todo (`nested form` with todo items)
- [ ] `Pagination` to navigate between pages

### `/src/pages/todos/[id].jsx` (`/todos/:id`)
- [ ] `SEO` (Initial Data Required)
- [ ] `Show` todo details
- [ ] `Edit Todo Button` to open a modal with form to update todo (`title` only)
- [ ] `Delete Todo Button` to delete todo
- [ ] `Toggle Todo Item Button` to toggle todo item checked status (`checked` only)
- [ ] `New Todo Item Button` to open a modal with form to create todo item (`name` only)
- [ ] `Edit Todo Item Button` to open a modal with form to update todo item (`name` only)
- [ ] `Delete Todo Item Button` to open a modal with form to delete todo item

# API Reference
## Link
https://api-todos-production.up.railway.app/

## Todo Endpoints
- `get    '/api/todos'` (Index)
- `post   '/api/todos'` (Create)
- `get    '/api/todos/:TodoId'` (Show)
- `put    '/api/todos/:TodoId'` (Update)
- `delete '/api/todos/:TodoId'` (Destroy)

### Allowed Create/Update Fields
- `title`
- `TodoItems[i][name]`
- `TodoItems[i][checked]`

### Index Queries
- `q` - search `title` | default `''`
- `page` - paging | default `1`
- `sortField` - the field to sort by | default `createdAt`
- `sortOrder` - the sorting order | default `ASC`

## TodoItems Endpoints
- `post  '/api/todos/:TodoId/todo-items'` (Create)
- `get   '/api/todos/:TodoId/todo-items/:TodoItemId'` (Show)
- `put   '/api/todos/:TodoId/todo-items/:TodoItemId'` (Update)
- `delete'/api/todos/:TodoId/todo-items/:TodoItemId'` (Destroy)

### Allowed Create/Update Fields
- `name`
- `checked`
