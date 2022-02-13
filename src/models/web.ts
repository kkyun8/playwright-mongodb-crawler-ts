import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWeb {
  name: string;
  nameJp: string;
  url: string;
  isDelete?: boolean;
  articleListClass: string;
  articleTitleClass: string;
}

interface IWebDocument extends IWeb, Document {}

interface IWebModel extends Model<IWebDocument> {
  findAll: () => Promise<IWeb[]>;
  updateByName: (name: string, body: IWeb) => Promise<IWebDocument>;
  deleteByName: (name: string) => Promise<void>;
  findOneByName: (name: string) => Promise<IWebDocument>;
}

const WebSchema: Schema<IWebDocument> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    nameJp: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    isDelete: { type: Boolean, default: true, required: true },
    articleListClass: { type: String, required: true },
    articleTitleClass: { type: String, required: true },
  },
  { timestamps: true }
);

WebSchema.statics.findAll = function () {
  return this.find({});
};

WebSchema.statics.findOneByName = function (name) {
  return this.findOne({ name });
};

WebSchema.statics.create = (payload: IWeb) => {
  const web = new Web(payload);
  return web.save();
};

WebSchema.statics.updateByName = function (name, payload: IWeb) {
  return this.findOneAndUpdate({ name }, payload, { new: true });
};

WebSchema.statics.deleteByName = function (name) {
  return this.remove({ name });
};

const Web = mongoose.model<IWebDocument, IWebModel>("Web", WebSchema);
export default Web;
