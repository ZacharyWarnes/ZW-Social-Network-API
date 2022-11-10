const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
            
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter: 
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', postSchema);

module.exports = Thought;

