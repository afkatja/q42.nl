import { Mongo } from 'meteor/mongo'

const blogpostFull = new Mongo.Collection("blogpostFull");
const blogpostTitles = new Mongo.Collection("blogpostTitles");
const blogpostIndex = new Mongo.Collection("blogpostIndex");

export { blogpostFull, blogpostTitles, blogpostIndex }
