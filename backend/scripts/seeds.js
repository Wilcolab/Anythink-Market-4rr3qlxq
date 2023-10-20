//TODO: seeds script should come here, so we'll be able to put some data in our local env
//TODO: seeds script should come here, so we'll be able to put some data in our local env
require("dotenv").config();

require("../models/User");
require("../models/Item");
require("../models/Comment");
var mongoose = require("mongoose"),
User = mongoose.model("User"),
Item = mongoose.model("Item"),
Comment = mongoose.model("Comment");

mongoose.connect(process.env.MONGODB_URI);


var func1 = async () => {
    let res = await User.deleteMany();
    //.log(`Users deleted. Count: ${res.deletedCount}`);
    res = await Item.deleteMany();
    //.log(`Items deleted. Count: ${res.deletedCount}`);
    res = await Comment.deleteMany();
    //.log(`Comments deleted. Count: ${res.deletedCount}`);

    for(let i = 0; i<100; i++) {
        let username = `Username${i}`,
        email = `${username}@${username}.com`,
        bio = `Bio of ${username}`;
    
        let user = new User();
        user.username = username;
        user.email = email;
        user.bio = bio;
        //.log(user);
        await user.save();

        let slug = `slug${i}`,
        title = `Item${i}`,
        description = `Description${i}`,
        seller = user;
        
        let item = new Item();
        item.slug = slug;
        item.title = title;
        item.description = description;
        item.seller = seller;
        //.log(item);
        await item.save();
    
        let comment = new Comment();
        comment.seller = seller;
        comment.item = item;
        //.log(comment);
        await comment.save();

        //.log(`User, Item and Comment ${i} saved`);
        //.log(user);
    }

    mongoose.connection.close(() => console.log("DB connection closed"));
}

func1();
