import { Mongo } from 'meteor/mongo'

class ChatMessagesCollection extends Mongo.Collection {
  insert(doc, callback) {
    const result = super.insert(doc, callback);
    if (Meteor.isClient)
      $("#chat .flex-stretch").scrollTop(99999);
    return result;
  }
}

export const ChatMessages = new ChatMessagesCollection("chatmessages");
