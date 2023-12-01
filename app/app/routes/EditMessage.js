const express = require("express");
const router = express.Router();
const db = require("../db-connection.js")

router.post('/api', async (req, res) => {
    
    try
    {
        // Must confirm that the logged in user is a member of the chat
        // Since we are not using sessions, we will hardcode the memberID for now
        
        
        
        const memberID = req.app.get('loggedInUser');
        const messageID = req.body.messageID;
        const chatID = req.body.chatID;
        const editedMessage = req.body.message;

        const isMember = await db.any(`
        SELECT * FROM chat WHERE "chatID" = $1 AND ("memberID1" = $2 OR "memberID2" = $2)
        `, [chatID, memberID]);

         // Must confirm that the message belongs to the chat
         const isMessage = await db.any(`
         SELECT * FROM message WHERE "messageID" = $1 AND "chatID" = $2
         `, [messageID, chatID]);

        //Must confirm that the message being deleted was sent by the logged in user
        const isSender = await db.any(`
        SELECT * FROM message WHERE "messageID" = $1 AND "senderID" = $2
        `, [messageID, memberID]);


        if(isMember.length == 0 || isMessage.length == 0 ||isSender.length == 0)
        {
            res.json({ status: 401, message: 'Unauthorized access' });
        }

        else
        { 
            await db.none(`
            UPDATE message SET "message" = $1 WHERE "messageID" = $2
            `, [editedMessage, messageID]);
            res.json({ status: 201, message: 'Message edited successfully' });
        }
        
    } 
    catch(error)
    {
        res.json({ status: 500, message: 'Failed to delete message' });
    }
});

module.exports = router;