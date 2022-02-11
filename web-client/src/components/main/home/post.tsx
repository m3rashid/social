import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentMedical } from "@fortawesome/free-solid-svg-icons";
import { UserType } from "./index";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

export interface CommentType {
  username: string;
  comment: string;
}
export interface PostType {
  _id: string;
  __v: number;
  photo: string;
  username: string;
  caption: string;
  likes: string[];
  comments: CommentType[];
  user: UserType;
  createdAt: string;
  updatedAt: string;
}

const CommentsList = ({ post }: { post: PostType }) => {
  return (
    <div className="max-h-52 overflow-auto no-scrollbar">
      {post.comments?.map((comment, index) => (
        <div key={index} className="p-2 flex">
          {/* add user profile dynamic link in href */}
          <div className="ml-2">
            {/* add user profile dynamic link in href */}
            <Link to={`/user/${comment.username}`}>
              <p className="font-medium text-gray-300 hover:text-gray-300">
                {comment.username}
              </p>
            </Link>
            <p className="text-sm text-gray-300">{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Post = ({ post }: { post: PostType }) => {
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleComment = (e: any) => {
    e.preventDefault();
  };
  const handleLike = (e: any) => {
    setLike(!like);
  };

  const user: UserType = useSelector((state: any) => state.auth.user);
  const theme = useSelector((state: any) => state.ui.theme);

  if (!post) return null;

  return (
    <div className={`${theme.theme} rounded-md flex flex-col mb-4`}>
      <div className="flex items-center justify-between px-2 pt-3">
        <div className="flex items-center">
          {user.avatar && (
            <img
              className="rounded-full h-14 w-14 mr-2"
              src={user.avatar}
              alt={user.name}
            />
          )}
          <div className="">
            <Link to={`/user/${post.username}`}>
              <p className="font-medium">{post.username}</p>
            </Link>
            <p className="text-gray-500">
              On {moment(user.createdAt).format("MMM Do YYYY")}
            </p>
          </div>
        </div>
      </div>
      <p className="p-2">{post.caption}</p>
      <img className="w-full" src={post.photo} alt="" />

      <p
        className="p-2 cursor-pointer select-none"
        onClick={() => setShowComments(!showComments)}
        style={{ color: "#6FCE42" }}
      >
        Show Comments
      </p>

      <div
        className={`bg-gray-500 flex flex-row gap-2 p-1 ${
          !showComments || post.comments.length === 0 ? "rounded-b-md" : ""
        }`}
      >
        <button className="ml-2" onClick={handleLike}>
          <FontAwesomeIcon
            icon={faHeart}
            size="2x"
            color={like ? "#6FCE42" : "#374151"}
          />
        </button>
        <input
          type="text"
          className="bg-gray-500 p-2 outline-none min-w-0 flex-grow"
          placeholder="Post a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button className="mr-2" onClick={handleComment}>
          <FontAwesomeIcon
            icon={faCommentMedical}
            size="2x"
            color={comment ? "#6FCE42" : "#374151"}
          />
        </button>
      </div>
      {showComments ? <CommentsList post={post} /> : ""}
    </div>
  );
};

export default Post;
