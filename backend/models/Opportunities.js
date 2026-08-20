const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    status: { type: String, enum: ['Applied', 'Interviewing', 'Offer', 'Rejected'], default: 'Applied' },
    dateApplied: { type: Date, default: Date.now },
    deadlineDate: { typr: Date }
})

module.exports = mongoose.models.Opportunity || mongoose.model('Opportunity', OpportunitySchema);

