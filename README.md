# Backend for a meal logging application.

## Routes

### route prefix = /api/v1

### authenticatin = Using Authentication header: "Bearer $Token".

### Body should be in JSON format.

| Endpoint                  | Function                                 | Requires auth | Query Params | Body                                                   |
| ------------------------- | ---------------------------------------- | ------------- | ------------ | ------------------------------------------------------ |
| /meals/post-meal          | (POST) a new meal log.                   | Yes           | null         | {"hashtags": [hashtags], "foodItems": [foodItems]}     |
| /meals/get-meals          | (GET) all meals.                         | Yes           | null         | null                                                   |
| /meals/get-user-meal      | (GET) meal logs for a user.              | Yes           | userId       | null                                                   |
| /hashtag/get-hashtags     | (GET) all hashtags.                      | Yes           | null         | null                                                   |
| /foodItem/get-ingredients | (GET) a list of ingredients of foodItem. | Yes           | foodItem     | null                                                   |
| /auth/signup              | (PUT) Create a new user.                 | No            | null         | {"email": "insert email","password: "insert password"} |
| /auth/login               | (POST) Login to get userId and JWT.      | No            | null         | {"email": "insert email","password: "insert password"} |
