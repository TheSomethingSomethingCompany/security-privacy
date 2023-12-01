const express = require("express");
const router = express.Router();
const db = require("../db-connection.js")

router.get('/api', async (req, res) => {
    const memberID = '43a60c3d-f8ed-40cc-9cc0-472b02a45960'; // Hardcoded for now
    try
    {
        const chatsWithUsers = await db.any(`
        SELECT "chatID", "username", "name"
        FROM(
        SELECT "chatID", "memberID1" as "memberID" from (SELECT * from chat where "memberID1" = $1 or "memberID2" = $1) WHERE "memberID1" != $1
        UNION
        SELECT "chatID", "memberID2" as "memberID" from (SELECT * from chat where "memberID1" = $1 or "memberID2" = $1) WHERE "memberID2" != $1
        ) as chats JOIN member USING("memberID")
            `, [memberID]);
        

        if(chatsWithUsers.length == 0)
        {
            res.json({ status: 422, message: 'No chats found' });
            return;
        }

        else res.json({ status: 201, message: 'Retrieved chats successfully', data: chatsWithUsers });
    } 
    catch(error)
    {
        res.json({ status: 500, message: 'Failed to retrieve chats' });
    }
});

module.exports = router;
