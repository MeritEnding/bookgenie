import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BookInputForm.css";

const Register = () => {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");  // 숫자로 변경 예정
  const [publisher, setPublisher] = useState("");
  const [publishedDate, setPublishedDate] = useState(""); // "YYYY-MM-DD"
  const [price, setPrice] = useState(""); // 숫자
  const navigate = useNavigate();

  const save = () => {
    // 유효성 검사
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!authorId || isNaN(Number(authorId))) {
      alert("작가 ID는 숫자로 입력해주세요.");
      return;
    }
    if (!publisher.trim()) {
      alert("출판사를 입력해주세요.");
      return;
    }
    if (!publishedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      alert("출판일은 YYYY-MM-DD 형식이어야 합니다.");
      return;
    }
    if (!price || isNaN(Number(price))) {
      alert("가격은 숫자로 입력해주세요.");
      return;
    }

    const newBook = {
      title: title.trim(),
      authorId: Number(authorId),
      publisher: publisher.trim(),
      publishedDate: publishedDate,
      price: Number(price),
    };

    axios
      .post("http://localhost:8080/books", newBook)
      .then((res) => {
        console.log("등록 완료:", res.data);
        alert("도서 내용이 등록되었습니다.");
        // 초기화
        setTitle("");
        setAuthorId("");
        setPublisher("");
        setPublishedDate("");
        setPrice("");
      })
      .catch((err) => {
        console.error("등록 실패:", err);
        alert("등록에 실패했습니다.");
      });
  };

  const confirmAndGoHome = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="form-box">
        <div className="form-title">도서 내용 등록</div>

        <div className="form-field">
          <label>제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>작가 ID:</label>
          <input
            type="number"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>출판사:</label>
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>출판일 (YYYY-MM-DD):</label>
          <input
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>가격:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="button-wrapper">
          <button className="button" onClick={save}>
            저장
          </button>
          <button
            className="button confirm"
            onClick={confirmAndGoHome}
            style={{ marginLeft: "10px" }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
