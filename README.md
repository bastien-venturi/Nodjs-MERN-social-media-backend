# Nodjs-MERN-social-media-backend
M Mongo
E Express
R React
N NodJs


# ADD

# start sever

npm start

# Routes

http://localhost:5000/api/user

| Endpoint | Method | Description |
| ---  USER  --- |
| /api/user/register | POST | Creates a new user. |
| /api/user/login | POST | Connection |
| /api/user/logout | GET | Disconnection |
| --- | --- | --- |
| /api/user/ | GET | Fetches all user. |
| /api/user/{id} | GET | Fetches a single user by its ID. |
| /api/user/{id} | PUT | Updates an existing user by its ID. |
| /api/user/{id} | DELETE | Deletes an user by its ID. |
| --- | --- | --- |
| /api/user/follow/{id} | PATCH | Add followers.(idToFollow) |
| /api/user/unfollow/{id} | PATCH | Deletes followers.(idToUnfollow) |
| ---  POST  --- |
| /api/post | GET | Fetches all post. |
| /api/post | POST | Creates a new post. |
| /api/post/{id} | PUT | Updates an existing post by its ID. |
| /api/post/{id} | DELETE | Deletes an post by its ID. |
| --- | --- | --- |
| /api/post/like-post/:id | PATCH | Like post |
| /api/post/unlike-post/:id | PATCH | Unlike post |
| --- | --- | --- |
| /api/post/comment-post/ | PATCH | Creates a new comment. |
| /api/post/edit-comment-post/{id} | PATCH | Updates an existing comment by its ID. |
| /api/post/delete-comment-post/{id} | PATCH | Deletes an comment by its ID. |
| --- | --- | --- |



# Source

https://www.youtube.com/watch?v=SUPDFHuvhRc&ab_channel=FromScratch-Led%C3%A9veloppementWebdez%C3%A9ro