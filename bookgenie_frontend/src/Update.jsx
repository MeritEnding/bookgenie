import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./BookInputForm.css";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");  // 숫자형 authorId로 변경
  const [publisher, setPublisher] = useState("");
  const [publishedDate, setPublishedDate] = useState("");  // "YYYY-MM-DD" 형식 문자열
  const [price, setPrice] = useState("");  // 숫자형 가격
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5001/books/${id}`)
      .then((res) => {
        const book = res.data;
        setTitle(book.title || "");
        setAuthorId(book.authorId || "");
        setPublisher(book.publisher || "");
        setPublishedDate(book.publishedDate ? book.publishedDate.substring(0,10) : "");
        setPrice(book.price || "");
      })
      .catch((err) => {
        console.error("도서 정보 불러오기 실패:", err);
        alert("도서 정보를 불러오는데 실패했습니다.");
      });
  }, [id]);

  const save = () => {
    // 유효성 검사: authorId, price 숫자 변환 및 범위 체크
    const parsedAuthorId = parseInt(authorId, 10);
    const parsedPrice = parseInt(price, 10);

    if (isNaN(parsedAuthorId) || parsedAuthorId <= 0) {
      alert("작가 ID는 0보다 큰 숫자여야 합니다.");
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      alert("가격은 0 이상의 숫자여야 합니다.");
      return;
    }
    if (!publishedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      alert("출판일은 YYYY-MM-DD 형식이어야 합니다.");
      return;
    }

    const updatedBook = {
      title,
      authorId: parsedAuthorId,
      publisher,
      publishedDate,
      price: parsedPrice,
    };

    axios.put(`http://localhost:8080/books/${id}`, updatedBook)
      .then(() => {
        setSaved(true);
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        alert("수정에 실패했습니다.");
      });
  };

  const confirmAndGoHome = () => {
    alert("도서 내용이 수정되었습니다.");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="form-box">
        <div className="form-title">도서 내용 수정</div>

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
            min="1"
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
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="button-wrapper" style={{ display: "flex", gap: "1rem" }}>
          <button className="button" onClick={save}>저장</button>
          {saved && (
            <button className="button confirm" onClick={confirmAndGoHome}>확인</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Update;
