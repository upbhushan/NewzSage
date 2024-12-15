"use strict";
// controllers/voteController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleVote = void 0;
const Vote_1 = __importDefault(require("../models/Vote"));
const News_1 = __importDefault(require("../models/News"));
const mongoose_1 = __importDefault(require("mongoose"));
const handleVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { news_id, user_id, vote_type } = req.body;
    // Validate ObjectIds
    if (!mongoose_1.default.Types.ObjectId.isValid(news_id) ||
        !mongoose_1.default.Types.ObjectId.isValid(user_id)) {
        res.status(400).json({ message: 'Invalid news_id or user_id' });
        return;
    }
    try {
        // Find existing vote by user on the news item
        const existingVote = yield Vote_1.default.findOne({ news_id, user_id });
        if (existingVote) {
            if (existingVote.vote_type === vote_type) {
                // // User is attempting to remove their vote (unvote)
                // await Vote.deleteOne({ _id: existingVote._id });
                // // Decrement the appropriate vote count
                // const decrementField = vote_type === 'upvote' ? 'upvote_count' : 'downvote_count';
                // await News.findByIdAndUpdate(news_id, { $inc: { [decrementField]: -1 } });
                res.status(200).json({ message: "no chnage in vote" });
                return;
            }
            else {
                // User is changing their vote type
                const oldVoteType = existingVote.vote_type;
                existingVote.vote_type = vote_type;
                yield existingVote.save();
                // Increment the new vote type count and decrement the old vote type count
                const incrementField = vote_type === 'upvote' ? 'upvote_count' : 'downvote_count';
                const decrementField = oldVoteType === 'upvote' ? 'upvote_count' : 'downvote_count';
                yield News_1.default.findByIdAndUpdate(news_id, {
                    $inc: {
                        [incrementField]: 1,
                        [decrementField]: -1,
                    },
                });
                // Retrieve updated vote counts
                const upvote_count = yield Vote_1.default.countDocuments({ news_id, vote_type: 'upvote' });
                const downvote_count = yield Vote_1.default.countDocuments({ news_id, vote_type: 'downvote' });
                res.status(200).json({ message: `Vote updated to ${vote_type}`, votes: { upvote_count, downvote_count } });
                return;
            }
        }
        // Create new vote if no existing vote
        const newVote = new Vote_1.default({ news_id, user_id, vote_type });
        yield newVote.save();
        // Increment the appropriate vote count
        const incrementField = vote_type === 'upvote' ? 'upvote_count' : 'downvote_count';
        yield News_1.default.findByIdAndUpdate(news_id, { $inc: { [incrementField]: 1 } });
        // Retrieve updated vote counts
        const upvote_count = yield Vote_1.default.countDocuments({ news_id, vote_type: 'upvote' });
        const downvote_count = yield Vote_1.default.countDocuments({ news_id, vote_type: 'downvote' });
        res.status(200).json({ message: `${vote_type} added`, votes: { upvote_count, downvote_count } });
    }
    catch (error) {
        console.error('Error processing vote:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.handleVote = handleVote;
