const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const checkUserRole = require('../middleware/check-role');


router.post("/", UserController.user_hello);

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/:userId", checkAuth, checkUserRole,  UserController.user_delete);

router.post("/search_n_list/:limit/:skip", checkAuth, checkUserRole,  UserController.user_search_list);
/*limit offset supplied from params, search_tag:{} supplied from post*/

router.post("/view_user/:userId", checkAuth, checkUserRole,  UserController.view_user);
/*
POST /user/view_user/5d90349d05da052dbb3d177d HTTP/1.1
Host: 52.14.192.44:5004
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNkYXNAZ21haWwuY29tIiwidXNlcklkIjoiNWQ5MDM0OWQwNWRhMDUyZGJiM2QxNzdkIiwiaWF0IjoxNTY5NzMxODQ3LCJleHAiOjE1Njk3MzU0NDd9.T7G9fkV1P75yiIMwcMs86-TsJpG_BtzlI3ZZuFmvWzI
Cache-Control: no-cache
Postman-Token: 3dadf52d-9f2f-239c-b40e-8d7f53502db8
 * */
router.patch("/:userId", checkAuth, checkUserRole,  UserController.user_edit);
/*
PATCH /user/5d90349d05da052dbb3d177d HTTP/1.1
Host: 52.14.192.44:5004
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNkYXNAZ21haWwuY29tIiwidXNlcklkIjoiNWQ5MDM0OWQwNWRhMDUyZGJiM2QxNzdkIiwiaWF0IjoxNTY5NzQ2NDI3LCJleHAiOjE1Njk3NTAwMjd9.9DftV6NlPWxdi5j9nvGlictPeXzRwRoJlXpEfPQecw0
Cache-Control: no-cache
Postman-Token: 266b7f69-ed1e-ccdf-db35-480970c73a2d

{
"name":"Saumava Das",
"contact_info": [
            {
                "phone1": "9874240470",
                "phone2": "9330925325",
                "skype":"saumava.das",
                "land phone":"26677998"
            }
        ]

}
*/
module.exports = router;