import { model, Schema, Document } from "mongoose";

interface IRegisteredEvent {
  id: string;
  name: string;
  date: Date;
}

interface ISettings {
  email: string;
  isNotificationOn: boolean;
}

interface IUser extends Document {
  username: string;
  password: string;
  acessToken: string;
  refreshToken: string;
  registeredEvents: IRegisteredEvent[];
  settings: ISettings;
}

const RegisteredEventSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
});

const SettingsSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  isNotificationOn: {
    type: Boolean,
    require: true,
  },
});

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  acessToken:{
    type: String,
    required: false,
  },
  refreshToken:{
    type: String,
    required: false,
  },
  registeredEvents: {
    type: [RegisteredEventSchema],
    default: [],
  },
  settings: {
    type: SettingsSchema,
    default: {email: "", isNotificationOn: false},
  } 
});

const UserModel = model<IUser>("User", UserSchema);

export { UserModel, IUser, IRegisteredEvent, ISettings };
