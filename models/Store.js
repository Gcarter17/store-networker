const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    users: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    posts: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            likes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "users"
                    }
                }
            ],
            comments: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "users"
                    },
                    text: {
                        type: String,
                        required: true
                    },
                    name: {
                        type: String
                    },
                    avatar: {
                        type: String
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    }
                }
            ],
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = Store = mongoose.model("store", StoreSchema);