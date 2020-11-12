import * as mongoose from 'mongoose';

const DrawingSchema = new mongoose.Schema({
  name: String,
  outerHtml: String,
  tags: String,
  elementTab: String,
});

// Creating our model
export const Drawing = mongoose.model('Drawing', DrawingSchema);
