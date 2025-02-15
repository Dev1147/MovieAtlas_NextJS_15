import mongoose, {Schema, HydratedDocument, Model } from "mongoose";


//인터페이스 정의
export interface IFavorite extends Document {
  movieId: number,
  movieTitle: string,
  moviePoster: string,
  userForm: Schema.Types.ObjectId
}

//스키마 정의
const FavoriteSchema: Schema<IFavorite> = new Schema<IFavorite>(
  {
    movieId: {
      type: Number,
      required: true,
      unique: true,
    },
    movieTitle: {
      type: String,
      required: true, 
    },
    moviePoster: {
      type: String,
      required: true, 

    },
    userForm:{
      type: Schema.Types.ObjectId,
      ref: 'User' //User에 모든 정보를 가져온다
    }
  },
  {timestamps:true}
)


const Favorite: Model<IFavorite> = mongoose.models.Favorite || mongoose.model<IFavorite>('Favorite', FavoriteSchema);

export default Favorite;