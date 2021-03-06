import React, { useState } from "react";
import styled from "styled-components";
import url from "../../config";

const CommentBox = ({
  user_name,
  content,
  id,
  commentArr,
  setCommentArr,
  number,
  setNumber,
  comment_total,
  paramsId,
}) => {
  const [like, setLike] = useState(false);

  const handleComment = () => {
    console.log("Delete 실행");
    const token = localStorage.getItem("Authorization");
    fetch(`${url}/pin/${paramsId}/comment`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        comment_id: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setCommentArr(res.comment);
        setNumber(res.comment_total);
      });
  };

  return (
    <CommentBodyContainer>
      <MyProfile>
        <MyProfileSvg>
          <path d="M12 12c5.523 0 10 4.477 10 10v2H2v-2c0-5.523 4.477-10 10-10zm0-1a5.5 5.5 0 1 1 0-11 5.5 5.5 0 1 1 0 11z"></path>
        </MyProfileSvg>
      </MyProfile>

      <CommentBodyWrap>
        <CommentTextWrap>
          <CommentInfo>
            <CommentId>{user_name}</CommentId>
          </CommentInfo>
          <CommentContentWrap>
            <CommentContent>{content}</CommentContent>
          </CommentContentWrap>
        </CommentTextWrap>

        <CommentIconWrap>
          <CommentIconHeart onClick={() => setLike(!like)}>
            <Heart like={like}></Heart>
          </CommentIconHeart>
          <CommentIconComment>
            <Comment></Comment>
          </CommentIconComment>
          <CommentIconDelete onClick={handleComment}>
            <Delete></Delete>
          </CommentIconDelete>
        </CommentIconWrap>
      </CommentBodyWrap>
    </CommentBodyContainer>
  );
};

export default CommentBox;

const CommentBodyContainer = styled.div`
  padding: 10px 0;
  display: flex;
`;

const MyProfile = styled.div``;

const MyProfileSvg = styled.svg.attrs({ viewBox: "-3 -7 30 30" })`
  border-radius: 50%;
  background-color: #efefef;
  width: 48px;
  height: 48px;
`;

const CommentBodyWrap = styled.div`
  margin-left: 8px;
  flex: 1;
`;

const CommentTextWrap = styled.div`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 16px;
`;

const CommentInfo = styled.div`
  display: flex;
`;

const CommentId = styled.div`
  padding-left: 2px;
  padding-right: 4px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

const CommentContentWrap = styled.div`
  white-space: pre-wrap;
  padding: 2px;
`;

const CommentContent = styled.span`
  font-size: 12px;
  font-weight: 400;
`;

const CommentIconWrap = styled.div`
  display: flex;
  padding: 4px;
`;

const CommentIconHeart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 4px;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: #dfe4ea;
  }
`;

const Heart = styled.i.attrs({ className: "fas fa-heart" })`
  font-size: 16px;
  color: ${(props) => (props.like ? "#e60023" : "#636e72")};
`;

const CommentIconComment = styled(CommentIconHeart)``;

const Comment = styled.i.attrs({ className: "fas fa-comment" })`
  font-size: 16px;
  color: #636e72;
`;

const CommentIconDelete = styled(CommentIconHeart)``;

const Delete = styled.i.attrs({ className: "fas fa-times" })`
  font-size: 16px;
  color: #636e72;
`;
