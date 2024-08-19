import mongoose, { Schema } from 'mongoose';

const COLLECTION_NAME = 'gr.coding_record';

const categorySchema = new Schema({
  decimal: { type: String },
  digital: { type: String },
  hours: { type: Number },
  minutes: { type: Number },
  name: { type: String },
  percent: { type: Number },
  text: { type: String },
  total_seconds: { type: Number }
});

const codingRecordSchema = new Schema({
  // activity: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  data: {
    categories: [categorySchema],
    daily_average: { type: Number },
    daily_average_including_other_language: { type: Number },
    days_including_holidays: { type: Number },
    days_minus_holidays: { type: Number },
    editors: [categorySchema],
    holidays: { type: Number },
    human_readable_daily_average: { type: String },
    human_readable_daily_average_including_other_language: { type: String },
    human_readable_range: { type: String },
    human_readable_total: { type: String },
    human_readable_total_including_other_language: { type: String },
    id: { type: String },
    is_already_updating: { type: Boolean },
    is_cached: { type: Boolean },
    is_coding_activity_visible: { type: Boolean },
    is_including_today: { type: Boolean },
    is_other_usage_visible: { type: Boolean },
    is_stuck: { type: Boolean },
    is_up_to_date: { type: Boolean },
    is_up_to_date_pending_future: { type: Boolean },
    languages: [categorySchema],
    operating_systems: [categorySchema],
    percent_calculated: { type: Number },
    range: { type: String },
    status: { type: String },
    timeout: { type: Number },
    total_seconds: { type: Number },
    total_seconds_including_other_language: { type: Number },
    user_id: { type: String },
    username: { type: String },
    writes_only: { type: Boolean }
  }
});

const CodingRecord = mongoose.model(
  'CodingRecord',
  codingRecordSchema,
  COLLECTION_NAME
);

export default CodingRecord;
