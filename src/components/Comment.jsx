import { Input } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import btnFather from "./btnFather";

const Comment = ({ comment }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState(comment?.body ?? "");
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const { fetcher: patchComment } = useAxios(
    apiBaseUrl + "comments/" + comment?.id,
    "patch"
  );
  const { fetcher: deleteComment } = useAxios(
    apiBaseUrl + "comments/" + comment?.id,
    "delete"
  );
  const handleClickDelete = () => {
    deleteComment();
  };
  const handleClickEdit = () => {
    setIsEdit(true);
  };
  const handleClickConfirm = () => {
    patchComment({ id: comment?.id, body: editComment });
  };

  return (
    <div>
      {!isEdit ? (
        <div>{comment?.body ?? ""}</div>
      ) : (
        <input value={editComment} />
      )}
      <div>
        <btnFather.Delete onClick={handleClickDelete} />
        {!isEdit ? (
          <btnFather.Edit onClick={handleClickEdit} />
        ) : (
          <button onClick={handleClickConfirm}>확인</button>
        )}
      </div>
    </div>
  );
};

export default Comment;
