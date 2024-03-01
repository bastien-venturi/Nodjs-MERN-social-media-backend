# Refaire erreurs et commentaire update et delete


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
| --- | --- | --- |
| USER | USER | USER |
| /api/user/register | POST | Creates a new user.(pseudo/email/password) |
| /api/user/login | POST | Connection.(email/password) |
| /api/user/logout | GET | Disconnection |
| --- | --- | --- |
| /api/user/ | GET | Fetches all user. |
| /api/user/{id} | GET | Fetches a single user by its ID. |
| /api/user/{id} | PUT | Updates an existing user by its ID. |
| /api/user/{id} | DELETE | Deletes an user by its ID. |
| --- | --- | --- |
| /api/user/follow/{id} | PATCH | Add followers.(id user url, idToFollow(id user)) |
| /api/user/unfollow/{id} | PATCH | Deletes followers.(id user url, idToUnfollow(id user)) |
| --- | --- | --- |
| POST | POST | POST |
| /api/post | GET | Fetches all post. |
| /api/post | POST | Creates a new post.(posterId(user), message) |
| /api/post/{id} | PUT | Updates an existing post by its ID. (ID post url, message) |
| /api/post/{id} | DELETE | Deletes an post by its ID. |
| --- | --- | --- |
| /api/post/like-post/:id | PATCH | Like post (Id post url, like(userID)) |
| /api/post/unlike-post/:id | PATCH | Unlike post (Id post url, like(userID)) |
| --- | --- | --- |
| /api/post/comment-post/{id} | PATCH | Creates a new comment. (ID url post, commenterId/commenterPseudo/text) |
| /api/post/edit-comment-post/{id} | PATCH | Updates an existing comment by its ID. (ID url post,commentId/text) |
| /api/post/delete-comment-post/{id} | PATCH | Deletes an comment by its ID .(ID url post,) |
| --- | --- | --- |



# Source

https://www.youtube.com/watch?v=SUPDFHuvhRc&ab_channel=FromScratch-Led%C3%A9veloppementWebdez%C3%A9ro