import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const PinBuilder = () => {
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [uploadedfile, setUploadedfile] = useState(null);

  const fileChangeHandler = (e) => {
    const files = e.target.files;
    console.log(files);
    setUploadedfile(files);
  };

  // //핀만들기(사진올리기)
  // const savePins = (e) => {
  //   const formData = new FormData();
  //   formData.append("UploadImages", setUploadedfile);
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };
  //   axios.post("#APIURL", formData, config);
  // };

  //핀만들기(사진올리기)-테스트용
  const savePins = (e) => {
    const formData = new FormData(document.getElementById("ImageUploader"));
    formData.append("UploadImages", setUploadedfile);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post("#APIURL", formData, config);
  };

  //업로드한 사진 미리 보여주는 함수
  const handleChangeFile = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
  };
  //TextArea 글자 수에 따라 입력창이 늘어나는 함수
  const Resizing = (e) => {
    e.style.height = "auto";
    e.style.height = e.scrollHeight + "px";
  };

  return (
    <>
      <Background>
        <MainWrapper>
          {/* 정엽님 컴포넌트 자리 */}
          <Bottom>
            <LeftSide>
              <UploaderWrapper
                onChange={handleChangeFile}
                name="uploadedImg"
                id="uploadedImg"
                type="file"
                accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp"
              >
                {imgBase64 ? (
                  <Preview>
                    <img
                      src={imgBase64}
                      alt="imagepreview"
                      // onClick={setImgBase64(null)}
                    />
                  </Preview>
                ) : null}
                <InsideUploader>
                  <IconWrap>
                    <svg>
                      <path d="M24 12c0-6.627-5.372-12-12-12C5.373 0 0 5.373 0 12s5.373 12 12 12c6.628 0 12-5.373 12-12zm-10.767 3.75a1.25 1.25 0 0 1-2.5 0v-3.948l-1.031 1.031a1.25 1.25 0 0 1-1.768-1.768L12 7l4.066 4.065a1.25 1.25 0 0 1-1.768 1.768l-1.065-1.065v3.982z"></path>
                    </svg>
                  </IconWrap>
                  <Advice>드래그하거나 클릭하여 업로드</Advice>
                  <Suggestion>권장사항 : 32MB 이하 고화질 .jpg파일</Suggestion>
                  <Uploader
                    id="ImageUploader"
                    onChange={fileChangeHandler}
                    type="file"
                    accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp"
                  ></Uploader>
                </InsideUploader>
              </UploaderWrapper>
              <ByOtherSite>사이트에서 저장</ByOtherSite>
            </LeftSide>
            <RightSide>
              <TempBt onClick={savePins}>저장</TempBt>
              <Editor>
                <MakeTitle
                  type="text"
                  placeholder="제목 추가"
                  maxlength="100"
                  rows="1"
                  onKeyDown={(e) => Resizing(e.target)}
                />
                <div>
                  <UserinfoWrap>
                    <img
                      alt="profile"
                      src="https://i.pinimg.com/75x75_RS/60/73/cc/6073cc1fe89cde1dfe95702611fc48ae.jpg"
                    ></img>
                  </UserinfoWrap>
                  <strong>Jia K</strong>
                </div>
                <Description
                  type="text"
                  placeholder="사람들에게 회원님의 핀에 대해 설명해보세요"
                  maxlength="500"
                  rows="1"
                  onKeyDown={(e) => Resizing(e.target)}
                />
              </Editor>
              <AddLink
                type="text"
                placeholder="랜딩 페이지 링크 추가"
                rows="1"
              />
            </RightSide>
          </Bottom>
        </MainWrapper>
      </Background>
    </>
  );
};

export default PinBuilder;

const Background = styled.div`
  position: relative;
  height: 100vh;
  background-color: #efefef;
`;

const MainWrapper = styled.div`
  width: 880px;
  padding-top: 20px;
  position: absolute;
  background-color: #fff;
  top: 20px;
  left: 50%;
  height: auto;
  transform: translate(-50%, 10%);
  border-radius: 16px;
`;

const Bottom = styled.div`
  display: flex;
`;

const LeftSide = styled.div`
  margin: 10px 30px 20px;
  width: 100%;
`;

const Uploader = styled.input`
  height: 100%;
  opacity: 0;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 0px;
  font-size: 0px;
  height: 100%;
`;

const Preview = styled.div`
  top: 0;
  left: 0;
  z-index: 700;
  position: absolute;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  /* background-image: ${(props) =>
    `url(${props.imgBase64}) no-repeat center cover`}; */
  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`;

const UploaderWrapper = styled.div`
  background-color: rgb(239, 239, 239);
  box-shadow: none;
  width: 100%;
  border-radius: 8px;
  padding: 15px;
  height: 510px;
  cursor: pointer;
  position: relative;
`;

const InsideUploader = styled.div`
  position: relative;
  border: 2px dashed rgb(218, 218, 218);
  border-radius: 6px;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

const IconWrap = styled.div`
  position: absolute;
  top : 50%;
  left : 50%;
  transition : (-50%, -40%)
  display: block;
  padding: 1px;
  svg {
    color: #767676;
    width: 48px;
    height: 48px;

    path {
      fill: currentColor;
    }
  }
`;

const ByOtherSite = styled.button`
  min-width: 60px;
  width: 100%;
  min-height: 48px;
  cursor: pointer;
  padding: 12px;
  background-color: #efefef;
  border-radius: 24px;
  border: 0;
  font-size: 16px;
  text-align: center;
  font-weight: 700;
  color: #111;
  margin-top: 10px;
`;

const Advice = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  padding: auto 48px;
  position: absolute;
  top: 60%;
`;

const Suggestion = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: #767676;
  margin: auto;
  position: absolute;
  bottom: 15px;
  width: 100%;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 30px 0 10px;
  position: relative;
`;
const Editor = styled.div`
  div {
    display: flex;
    margin: 20px 0;
  }

  strong {
    display: flex;
    font-size: 16px;
    font-weight: 600;
    padding: auto;
    height: 100%;
    margin: auto 0;
  }
`;

const MakeTitle = styled.textarea`
  border: none;
  border-bottom: 1px solid rgba(142, 142, 142, 0.5);
  padding: 10px;
  margin-top: 40px;
  font-size: 36px;
  font-weight: 700;
  color: #dadada;
  caret-color: #333;
  width: 100%;
  overflow: auto;
  outline: 0px none transparent;
  overflow: auto;
  resize: none;
  &:focus {
    border-bottom: 1.5px solid rgb(0, 116, 232);
  }
`;

const UserinfoWrap = styled.div`
  border-radius: 50%;
  position: relative;
  width: 32px;
  height: 32px;
  color: transparent;
  background-color: #969696;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
  }
`;

const Description = styled.textarea`
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(142, 142, 142, 0.5);
  white-space: pre-wrap;
  font-size: 18px;
  color: #dadada;
  outline: 0px none transparent;
  overflow: auto;
  resize: none;
  padding: 10px;
  &:focus {
    border-bottom: 1.5px solid rgb(0, 116, 232);
  }
`;

const AddLink = styled(Description.withComponent("textarea"))`
  position: absolute;
  bottom: 7%;
`;

const TempBt = styled.button``;
