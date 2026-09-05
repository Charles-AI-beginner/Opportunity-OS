const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    opportunityStatus: { type: String, enum: ['Applied', 'Interviewing', 'Offer', 'Rejected'], default: 'Applied' },
    dateApplied: { type: Date, default: Date.now },
    deadlineDate: { type: Date },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
}
})

module.exports = mongoose.models.Opportunity || mongoose.model('Opportunity', OpportunitySchema);

